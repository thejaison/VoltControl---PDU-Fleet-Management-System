const colors = {
  white: "#121215",
  bgPage: "transparent",
  textPrimary: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  border: "#1f1f24",
  orange: "#ffffff", 
  orangeLight: "rgba(255, 255, 255, 0.08)",
  green: "#10b981",
  greenLight: "rgba(16, 185, 129, 0.08)",
  red: "#71717a",
  redLight: "rgba(255, 255, 255, 0.08)",
  gray: "#71717a",
  grayLight: "rgba(255, 255, 255, 0.08)",
};

const statusColors = {
  Queued: { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  QUEUED: { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  Running: { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  RUNNING: { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  "In Progress": { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  Completed: { bg: colors.greenLight, text: colors.green, dot: colors.green },
  COMPLETED: { bg: colors.greenLight, text: colors.green, dot: colors.green },
  Succeeded: { bg: colors.greenLight, text: colors.green, dot: colors.green },
  SUCCEEDED: { bg: colors.greenLight, text: colors.green, dot: colors.green },
  "Completed with errors": { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  "COMPLETED WITH ERRORS": { bg: colors.grayLight, text: colors.textSecondary, dot: colors.textSecondary },
  Failed: { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
  FAILED: { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
  "Timed out": { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
  "TIMED OUT": { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
  Cancelled: { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
  CANCELLED: { bg: colors.grayLight, text: colors.textMuted, dot: colors.textMuted },
};

export const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: colors.bgPage,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px 32px 48px 300px", 
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: "24px",
    padding: "14px 20px",
    marginBottom: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)", 
    border: `1px solid ${colors.border}`,
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoBadge: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    boxShadow: "0 8px 16px rgba(16, 185, 129, 0.25)",
  },

  logoText: {
    fontSize: "19px",
    fontWeight: 700,
    color: colors.textPrimary,
  },

  navPills: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#18181c",
    borderRadius: "999px",
    padding: "4px",
    border: "1px solid #27272a",
  },

  navPill: (isActive) => ({
    border: "none",
    cursor: "pointer",
    padding: "9px 18px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 500,
    background: isActive ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
    color: isActive ? "#ffffff" : colors.textSecondary,
    transition: "all 0.15s ease",
  }),

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  iconCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: `1px solid ${colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textPrimary,
    cursor: "pointer",
    position: "relative",
    backgroundColor: "#18181c",
  },

  notificationDot: {
    position: "absolute",
    top: "8px",
    right: "9px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#10b981",
  },

  profilePill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 12px 5px 5px",
    borderRadius: "999px",
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    backgroundColor: colors.white,
  },

  avatarCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#18181c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    color: colors.textPrimary,
  },

  profileName: {
    fontSize: "14px",
    fontWeight: 600,
    color: colors.textPrimary,
  },

  greetingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "16px",
  },

  greetingLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  sunBadge: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    flexShrink: 0,
  },

  greetingTitle: {
    fontSize: "26px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  greetingSubtitle: {
    fontSize: "14px",
    color: colors.textSecondary,
    marginTop: "4px",
  },

  createButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    padding: "13px 20px",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(16, 185, 129, 0.25)",
  },

  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },

  statCard: (isHighlighted) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: isHighlighted ? "linear-gradient(135deg, #10b981, #059669)" : colors.white,
    borderRadius: "16px",
    padding: "18px",
    boxShadow: isHighlighted ? "0 12px 28px rgba(16, 185, 129, 0.25)" : "0 8px 30px rgba(0, 0, 0, 0.3)",
    border: `1px solid ${colors.border}`,
  }),

  statIconWrap: (isHighlighted, tint) => ({
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isHighlighted ? "rgba(255,255,255,0.2)" : tint,
    color: "#ffffff",
  }),

  statLabel: (isHighlighted) => ({
    fontSize: "13px",
    fontWeight: 500,
    color: isHighlighted ? "rgba(255,255,255,0.85)" : colors.textSecondary,
    textAlign: "left",
  }),

  statValue: (isHighlighted) => ({
    fontSize: "22px",
    fontWeight: 700,
    color: isHighlighted ? "#ffffff" : colors.textPrimary,
    marginTop: "2px",
    textAlign: "left",
  }),

  statTrend: (isHighlighted, isPositive) => ({
    fontSize: "12px",
    fontWeight: 600,
    marginLeft: "8px",
    color: isHighlighted
      ? "rgba(255,255,255,0.9)"
      : isPositive
      ? colors.green
      : colors.textSecondary,
  }),

  statTrendLabel: (isHighlighted) => ({
    fontSize: "12px",
    fontWeight: 400,
    color: isHighlighted ? "rgba(255,255,255,0.75)" : colors.textMuted,
  }),

  panel: {
    backgroundColor: colors.white,
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    border: `1px solid ${colors.border}`,
  },

  panelHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },

  panelTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: colors.green,
    backgroundColor: colors.greenLight,
    padding: "5px 10px",
    borderRadius: "999px",
  },

  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: colors.green,
  },

  viewAllLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    fontWeight: 600,
    color: colors.green,
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  gridTwoUneven: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },

  progressJobRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  progressJobId: {
    fontSize: "15px",
    color: colors.textPrimary,
  },

  progressPercentRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  progressPercent: {
    fontSize: "30px",
    fontWeight: 700,
    color: colors.textPrimary,
  },

  progressDeviceCount: {
    fontSize: "13px",
    color: colors.textSecondary,
  },

  progressTrack: {
    width: "100%",
    height: "10px",
    borderRadius: "999px",
    backgroundColor: "#18181c",
    overflow: "hidden",
    marginBottom: "16px",
  },

  progressFill: (percent) => ({
    width: `${percent}%`,
    height: "100%",
    borderRadius: "999px",
    background: `linear-gradient(90deg, #71717a, #059669)`,
    transition: "width 0.4s ease",
  }),

  currentDeviceCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#18181c",
    borderRadius: "12px",
    padding: "14px 16px",
    border: `1px solid ${colors.border}`,
  },

  currentDeviceLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  currentDeviceIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#121215",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
  },

  currentDeviceName: {
    fontSize: "14px",
    fontWeight: 600,
    color: colors.textPrimary,
  },

  currentDeviceStatus: {
    fontSize: "12px",
    color: colors.textSecondary,
    marginTop: "2px",
  },

  currentDeviceMeta: {
    fontSize: "12px",
    color: colors.textMuted,
    textAlign: "right",
  },

  statusPill: (status) => {
    const c = statusColors[status] || statusColors.Cancelled;
    return {
      fontSize: "12px",
      fontWeight: 600,
      color: c.text,
      backgroundColor: c.bg,
      border: `1px solid ${c.text}`,
      padding: "5px 12px",
      borderRadius: "999px",
    };
  },

  donutWrap: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  donutChart: (gradient) => ({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),

  donutCenter: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  donutCenterValue: {
    fontSize: "24px",
    fontWeight: 700,
    color: colors.textPrimary,
  },

  donutCenterLabel: {
    fontSize: "11px",
    color: colors.textSecondary,
  },

  legendList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
  },

  legendRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
  },

  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: colors.textPrimary,
  },

  legendDot: (color) => ({
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    backgroundColor: color,
  }),

  legendValue: {
    color: colors.textSecondary,
    fontWeight: 600,
  },

  tableGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.6fr 1.1fr 0.8fr 1fr 0.7fr 1.3fr",
    alignItems: "center",
    gap: "8px",
  },

  tableHeaderRow: {
    fontSize: "12px",
    fontWeight: 600,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    paddingBottom: "10px",
    borderBottom: `1px solid ${colors.border}`,
  },

  tableRow: {
    fontSize: "13px",
    color: colors.textPrimary,
    padding: "16px 0",
    borderBottom: `1px solid ${colors.border}`,
  },

  jobIdCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 600,
  },

  statusDotSmall: (color) => ({
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: color,
    flexShrink: 0,
  }),

  miniProgressTrack: {
    width: "100%",
    height: "6px",
    borderRadius: "999px",
    backgroundColor: "#18181c",
    overflow: "hidden",
  },

  miniProgressFill: (percent, color) => ({
    width: `${percent}%`,
    height: "100%",
    borderRadius: "999px",
    backgroundColor: color,
  }),

  progressPercentText: {
    fontSize: "12px",
    color: colors.textSecondary,
    marginTop: "3px",
  },

  actionIcons: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  actionIconBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    backgroundColor: "#18181c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    cursor: "pointer",
  },

  actionBtn: (type, isDisabled) => {
    let bg = "rgba(255, 255, 255, 0.08)";
    let text = colors.textSecondary;
    let border = colors.border;
    if (!isDisabled) {
      if (type === "cancel") {
        bg = "rgba(255, 255, 255, 0.08)";
        text = colors.textSecondary;
        border = colors.border;
      } else if (type === "continue") {
        bg = "rgba(255, 255, 255, 0.08)";
        text = colors.textSecondary;
        border = colors.border;
      } else if (type === "again") {
        bg = colors.greenLight;
        text = colors.green;
        border = colors.green;
      }
    }
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      padding: "6px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 600,
      cursor: isDisabled ? "not-allowed" : "pointer",
      backgroundColor: bg,
      color: text,
      border: `1px solid ${border}`,
      transition: "all 0.15s ease",
      opacity: isDisabled ? 0.6 : 1,
    };
  },

  resultRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: `1px solid ${colors.border}`,
  },

  resultLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  resultStatusIcon: (status) => {
    const c = statusColors[status] || statusColors.Cancelled;
    return {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: c.bg,
      color: c.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    };
  },

  resultDeviceName: {
    fontSize: "14px",
    fontWeight: 600,
    color: colors.textPrimary,
  },

  resultDeviceIp: {
    fontSize: "12px",
    color: colors.textMuted,
    marginTop: "1px",
  },

  resultRight: {
    textAlign: "right",
  },

  resultModel: {
    fontSize: "13px",
    color: colors.textPrimary,
  },

  resultFirmware: {
    fontSize: "12px",
    color: colors.textMuted,
    marginTop: "1px",
  },

  resultTimestamp: {
    fontSize: "12px",
    color: colors.textMuted,
    marginLeft: "16px",
    whiteSpace: "nowrap",
  },
};

export { colors, statusColors };