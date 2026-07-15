const colors = {
  white: "#FFFFFF",
  bgPage: "#F7F7F8",
  textPrimary: "#171717",
  textSecondary: "#8B8B90",
  textMuted: "#B0B0B5",
  border: "#EFEFF0",
  orange: "#FF5A1F",
  orangeLight: "#FFEDE3",
  green: "#1FAA59",
  greenLight: "#E7F8EE",
  red: "#E5484D",
  redLight: "#FDEAEA",
  gray: "#9CA3AF",
  grayLight: "#F1F1F2",
};

const statusColors = {
  Running: { bg: colors.orangeLight, text: colors.orange, dot: colors.orange },
  Completed: { bg: colors.greenLight, text: colors.green, dot: colors.green },
  Failed: { bg: colors.redLight, text: colors.red, dot: colors.red },
  Cancelled: { bg: colors.grayLight, text: colors.gray, dot: colors.gray },
  "In Progress": { bg: colors.orangeLight, text: colors.orange, dot: colors.orange },
};

export const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: colors.bgPage,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px 32px 48px",
    boxSizing: "border-box",
  },

  // ---------- Header ----------
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: "16px",
    padding: "14px 20px",
    marginBottom: "20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
    backgroundColor: colors.orange,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
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
    backgroundColor: colors.bgPage,
    borderRadius: "999px",
    padding: "4px",
  },

  navPill: (isActive) => ({
    border: "none",
    cursor: "pointer",
    padding: "9px 18px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 500,
    backgroundColor: isActive ? colors.textPrimary : "transparent",
    color: isActive ? colors.white : colors.textSecondary,
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
    backgroundColor: colors.white,
  },

  notificationDot: {
    position: "absolute",
    top: "8px",
    right: "9px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: colors.orange,
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
    backgroundColor: colors.grayLight,
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

  // ---------- Greeting row ----------
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
    backgroundColor: colors.orangeLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.orange,
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
    backgroundColor: colors.orange,
    color: colors.white,
    fontSize: "14px",
    fontWeight: 600,
    padding: "13px 20px",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(255,90,31,0.28)",
  },

  // ---------- Stat cards ----------
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
    backgroundColor: isHighlighted ? colors.orange : colors.white,
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
    color: isHighlighted ? colors.white : colors.orange,
  }),

  statLabel: (isHighlighted) => ({
    fontSize: "13px",
    fontWeight: 500,
    color: isHighlighted ? "rgba(255,255,255,0.85)" : colors.textSecondary,
  }),

  statValue: (isHighlighted) => ({
    fontSize: "22px",
    fontWeight: 700,
    color: isHighlighted ? colors.white : colors.textPrimary,
    marginTop: "2px",
  }),

  statTrend: (isHighlighted, isPositive) => ({
    fontSize: "12px",
    fontWeight: 600,
    marginLeft: "8px",
    color: isHighlighted
      ? "rgba(255,255,255,0.9)"
      : isPositive
      ? colors.green
      : colors.red,
  }),

  statTrendLabel: (isHighlighted) => ({
    fontSize: "12px",
    fontWeight: 400,
    color: isHighlighted ? "rgba(255,255,255,0.75)" : colors.textMuted,
  }),

  // ---------- Panel shell (shared by all card-like sections) ----------
  panel: {
    backgroundColor: colors.white,
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
    color: colors.textPrimary,
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  // ---------- Two-column grid rows ----------
  gridTwoUneven: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },

  // ---------- Current Scan Progress ----------
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
    backgroundColor: colors.grayLight,
    overflow: "hidden",
    marginBottom: "16px",
  },

  progressFill: (percent) => ({
    width: `${percent}%`,
    height: "100%",
    borderRadius: "999px",
    background: `linear-gradient(90deg, ${colors.orange}, #FF7A47)`,
    transition: "width 0.4s ease",
  }),

  currentDeviceCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.bgPage,
    borderRadius: "12px",
    padding: "14px 16px",
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
    backgroundColor: colors.white,
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
      padding: "5px 12px",
      borderRadius: "999px",
    };
  },

  // ---------- Donut chart ----------
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

  // ---------- Tables ----------
  tableGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.7fr 1.3fr 0.9fr 1.1fr 0.7fr",
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
    padding: "12px 0",
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
    backgroundColor: colors.grayLight,
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
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    cursor: "pointer",
  },

  // ---------- Recent scan results ----------
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