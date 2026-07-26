const colors = {
  white: "#FFFFFF",
  bgSidebar: "rgba(10, 10, 15, 0.6)",
  bgActive: "linear-gradient(135deg, #6366f1, #a855f7)",
  border: "rgba(255, 255, 255, 0.06)",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textOnActive: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const styles = {
  // Thin invisible strip pinned to the left edge of the screen.
  // Hovering over this is what triggers the sidebar to slide in.
  hoverTrigger: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "16px",
    height: "100vh",
    zIndex: 998,
  },

  // Dims the page content once the sidebar is open (click to close)
  overlay: (isOpen) => ({
    position: "fixed",
    inset: 0,
    backgroundColor: colors.overlay,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    transition: "opacity 0.25s ease",
    zIndex: 999,
  }),

  sidebar: (isOpen) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "260px",
    background: colors.bgSidebar,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    boxSizing: "border-box",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1000,
    boxShadow: isOpen ? "4px 0 30px rgba(0,0,0,0.5)" : "none",
  }),

  sidebarLogoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 8px",
    marginBottom: "32px",
  },

  sidebarLogoBadge: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: colors.bgActive,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontWeight: 700,
    fontSize: "16px",
  },

  sidebarLogoText: {
    fontSize: "18px",
    fontWeight: 700,
    color: colors.textPrimary,
    letterSpacing: "-0.01em",
  },

  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },

  navItemButton: (isActive, isLocked) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: isLocked ? "not-allowed" : "pointer",
    textAlign: "left",
    background: isActive ? colors.bgActive : "transparent",
    transition: "all 0.2s ease-in-out",
    opacity: isLocked ? 0.4 : 1,
  }),

  navIcon: (isActive, isLocked) => ({
    width: "20px",
    height: "20px",
    objectFit: "contain",
    filter: (isActive || isLocked) ? "brightness(0) invert(1)" : "none",
    opacity: isActive ? 1 : 0.6,
  }),

  navLabel: (isActive, isLocked) => ({
    fontSize: "14px",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? colors.textOnActive : colors.textPrimary,
  }),

  sidebarFooter: {
    marginTop: "12px",
    paddingTop: "16px",
    borderTop: `1px solid ${colors.border}`,
    fontSize: "12px",
    color: colors.textSecondary,
    padding: "16px 14px 0",
  },
};