const colors = {
  white: "#ffffff",
  bgPage: "#f3f5f0",
  textPrimary: "#12241b",
  textSecondary: "#697a70",
  textMuted: "#8e9f95",
  border: "#e4e9e1",
  orange: "#0c3427", 
  orangeLight: "rgba(12, 52, 39, 0.08)",
  green: "#22865d",
  greenLight: "rgba(34, 134, 93, 0.12)",
  red: "#d9534f",
  redLight: "rgba(217, 83, 79, 0.12)",
  gray: "#8e9f95",
  grayLight: "rgba(142, 159, 149, 0.15)",
};

const statusColors = {
  Scheduled: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  SCHEDULED: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  Queued: { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
  QUEUED: { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
  Running: { bg: "rgba(235, 195, 81, 0.2)", text: "#a47e1b", dot: "#ebc351" },
  RUNNING: { bg: "rgba(235, 195, 81, 0.2)", text: "#a47e1b", dot: "#ebc351" },
  "In Progress": { bg: "rgba(235, 195, 81, 0.2)", text: "#a47e1b", dot: "#ebc351" },
  Completed: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  COMPLETED: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  Succeeded: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  SUCCEEDED: { bg: "rgba(34, 134, 93, 0.12)", text: "#22865d", dot: "#22865d" },
  "Completed with errors": { bg: "rgba(235, 195, 81, 0.2)", text: "#a47e1b", dot: "#ebc351" },
  "COMPLETED WITH ERRORS": { bg: "rgba(235, 195, 81, 0.2)", text: "#a47e1b", dot: "#ebc351" },
  Failed: { bg: "rgba(217, 83, 79, 0.12)", text: "#c9302c", dot: "#c9302c" },
  FAILED: { bg: "rgba(217, 83, 79, 0.12)", text: "#c9302c", dot: "#c9302c" },
  "Timed out": { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
  "TIMED OUT": { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
  Cancelled: { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
  CANCELLED: { bg: "rgba(142, 159, 149, 0.15)", text: "#697a70", dot: "#697a70" },
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
    boxShadow: "0 4px 20px rgba(12, 52, 39, 0.04)", 
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
    background: "linear-gradient(135deg, #0c3427, #1b4d3e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(12, 52, 39, 0.2)",
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
    backgroundColor: "#ebefe8",
    borderRadius: "999px",
    padding: "4px",
    border: "1px solid #dbe2d8",
  },

  navPill: (isActive) => ({
    border: "none",
    cursor: "pointer",
    padding: "9px 18px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 500,
    background: isActive ? "#0c3427" : "transparent",
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
    backgroundColor: "#ebefe8",
  },

  notificationDot: {
    position: "absolute",
    top: "8px",
    right: "9px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#22865d",
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
    backgroundColor: "#ebefe8",
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
    backgroundColor: "#ebefe8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0c3427",
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
    background: "#0c3427",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    padding: "13px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(12, 52, 39, 0.2)",
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
    background: isHighlighted ? "linear-gradient(135deg, #0c3427 0%, #154536 100%)" : colors.white,
    borderRadius: "20px",
    padding: "18px",
    boxShadow: isHighlighted ? "0 12px 28px rgba(12, 52, 39, 0.2)" : "0 4px 20px rgba(12, 52, 39, 0.04)",
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
    backgroundColor: isHighlighted ? "rgba(255,255,255,0.15)" : (tint || "#ebefe8"),
    color: isHighlighted ? "#ffffff" : "#0c3427",
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
    boxShadow: "0 4px 20px rgba(12, 52, 39, 0.04)",
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
    color: "#0c3427",
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
    backgroundColor: "#ebefe8",
    overflow: "hidden",
    marginBottom: "16px",
  },

  progressFill: (percent) => ({
    width: `${percent}%`,
    height: "100%",
    borderRadius: "999px",
    background: `linear-gradient(90deg, #ebc351, #22865d)`,
    transition: "width 0.4s ease",
  }),

  currentDeviceCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8faf6",
    borderRadius: "16px",
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
    backgroundColor: "#ebefe8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0c3427",
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
      border: `1px solid ${c.dot}`,
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
    backgroundColor: "#ebefe8",
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
    backgroundColor: "#ebefe8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    cursor: "pointer",
  },

  actionBtn: (type, isDisabled) => {
    let bg = "#ebefe8";
    let text = colors.textPrimary;
    let border = colors.border;
    if (!isDisabled) {
      if (type === "cancel") {
        bg = "#ebefe8";
        text = colors.textSecondary;
        border = colors.border;
      } else if (type === "continue") {
        bg = "#ebefe8";
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