package com.voltcontrol.ibm.aspect;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Set;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.voltcontrol.ibm.annotation.Audited;
import com.voltcontrol.ibm.repository.UserRepository;
import com.voltcontrol.ibm.service.AuditLogService;

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class AuditLoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(AuditLoggingAspect.class);

    private static final Set<String> SENSITIVE_KEYS = Set.of("password", "pass", "pwd", "token", "secret",
            "authorization", "otp");

    private final AuditLogService auditLogService;
    private final UserRepository userRepository;

    public AuditLoggingAspect(AuditLogService auditLogService, UserRepository userRepository) {
        this.auditLogService = auditLogService;
        this.userRepository = userRepository;
    }

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *) "
            + "|| within(@org.springframework.stereotype.Controller *)")
    public void controllers() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping) "
            + "|| @annotation(org.springframework.web.bind.annotation.PutMapping) "
            + "|| @annotation(org.springframework.web.bind.annotation.PatchMapping) "
            + "|| @annotation(org.springframework.web.bind.annotation.DeleteMapping) "
            + "|| @annotation(com.voltcontrol.ibm.annotation.Audited)")
    public void auditableMethods() {
    }

    @AfterReturning("controllers() && auditableMethods()")
    public void logSuccess(JoinPoint jp) {
        record(jp, "SUCCESS", null);
    }

    @AfterThrowing(pointcut = "controllers() && auditableMethods()", throwing = "ex")
    public void logFailure(JoinPoint jp, Throwable ex) {
        record(jp, "FAILURE", ex);
    }

    private void record(JoinPoint jp, String status, Throwable ex) {
        try {
            MethodSignature sig = (MethodSignature) jp.getSignature();
            Method method = sig.getMethod();
            Audited audited = method.getAnnotation(Audited.class);

            String action = (audited != null && !audited.action().isBlank())
                    ? audited.action()
                    : toUpperSnake(method.getName());

            String entityType = (audited != null && !audited.entityType().isBlank())
                    ? audited.entityType()
                    : sig.getDeclaringType().getSimpleName().replace("Controller", "");

            StringBuilder details = new StringBuilder();
            HttpServletRequest request = currentRequest();
            if (request != null) {
                details.append(request.getMethod()).append(' ').append(request.getRequestURI());
            }

            String entityId = appendArguments(jp, sig, method, details);

            if (ex != null) {
                details.append(" | error=").append(ex.getClass().getSimpleName());
                if (ex.getMessage() != null) {
                    details.append(": ").append(ex.getMessage());
                }
            }

            String username = currentUsername();
            String empId = resolveEmpId(username);

            auditLogService.record(action, entityType, entityId, username, empId,
                    status, details.toString());
        } catch (Exception e) {
            // Auditing must never break the request
            log.warn("Audit aspect failed: {}", e.getMessage());
        }
    }

    /**
     * Appends small, safe args (path variables / request params) and returns first
     * path variable as entityId.
     */
    private String appendArguments(JoinPoint jp, MethodSignature sig, Method method, StringBuilder details) {
        Object[] args = jp.getArgs();
        String[] names = sig.getParameterNames();
        Annotation[][] paramAnnotations = method.getParameterAnnotations();
        String entityId = null;

        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            if (arg == null || !isSimple(arg)) {
                continue; // skip bodies, files, request/response objects
            }
            boolean isPath = false;
            boolean isParam = false;
            for (Annotation a : paramAnnotations[i]) {
                if (a instanceof PathVariable)
                    isPath = true;
                if (a instanceof RequestParam)
                    isParam = true;
            }
            if (!isPath && !isParam) {
                continue;
            }
            String name = (names != null && i < names.length) ? names[i] : "arg" + i;
            String value = SENSITIVE_KEYS.contains(name.toLowerCase()) ? "***" : String.valueOf(arg);
            details.append(" | ").append(name).append('=').append(value);
            if (isPath && entityId == null) {
                entityId = value;
            }
        }
        return entityId;
    }

    private String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return "anonymous";
        }
        return auth.getName();
    }

    // TODO: replace with the empId from the principal / JWT claim once I see
    // CustomUserDetails + JwtUtil
    private String resolveEmpId(String username) {
        if (username == null || "anonymous".equals(username)) {
            return null;
        }
        return userRepository.findByUsername(username)
                .map(u -> u.getId().getEmpId())
                .orElse(null);
    }

    private HttpServletRequest currentRequest() {
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
        return (attrs instanceof ServletRequestAttributes sra) ? sra.getRequest() : null;
    }

    private boolean isSimple(Object o) {
        return o instanceof CharSequence || o instanceof Number
                || o instanceof Boolean || o instanceof Enum<?> || o instanceof java.util.UUID;
    }

    private String toUpperSnake(String camel) {
        return camel.replaceAll("([a-z0-9])([A-Z])", "$1_$2").toUpperCase();
    }
}