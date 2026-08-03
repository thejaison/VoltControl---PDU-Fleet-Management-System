const colors = {
  white: "#121215",
  bgPage: "transparent",
  textPrimary: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  border: "#1f1f24",
  orange: "#10b981",
  green: "#10b981",
  greenLight: "rgba(16, 185, 129, 0.08)",
  red: "#71717a",
  redLight: "rgba(255, 255, 255, 0.08)",
  gray: "#71717a",
  grayLight: "rgba(255, 255, 255, 0.08)",
};

export const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "transparent",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px 32px 48px 300px", 
    boxSizing: "border-box",
  },

  titleSection: {
    marginBottom: "20px",
    textAlign: "left",
  },

  title: {
    fontSize: "28px",
    fontWeight: 800,
    color: colors.textPrimary,
    margin: 0,
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "14px",
    color: colors.textSecondary,
    marginTop: "4px",
  },

  panel: {
    backgroundColor: colors.white,
    borderRadius: "24px",
    padding: "8px 20px 20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)", 
    border: `1px solid ${colors.border}`,
  },

  toolbarRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
  },

  searchInput: {
    width: "280px",
    padding: "12px 16px",
    borderRadius: "999px", 
    border: `1px solid #27272a`,
    fontSize: "13px",
    outline: "none",
    backgroundColor: "#18181c",
    color: colors.textPrimary,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },

  countBadge: {
    fontSize: "13px",
    color: colors.textSecondary,
    fontWeight: 600,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHeadRow: {
    textAlign: "left",
  },

  th: {
    fontSize: "12px",
    fontWeight: 600,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    padding: "0 12px 10px",
    borderBottom: `1px solid ${colors.border}`,
  },

  td: {
    fontSize: "14px",
    color: colors.textPrimary,
    padding: "14px 12px",
    borderBottom: `1px solid ${colors.border}`,
    textAlign: "left",
  },

  userNameCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 600,
  },

  avatarCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#18181c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    color: colors.textPrimary,
    flexShrink: 0,
    border: `1px solid ${colors.border}`,
  },

  mutedCell: {
    color: colors.textSecondary,
  },

  statusPill: (enabled) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: enabled ? colors.green : colors.red,
    backgroundColor: enabled ? colors.greenLight : colors.redLight,
    border: `1px solid ${enabled ? colors.green : colors.red}`,
    padding: "5px 12px",
    borderRadius: "999px",
  }),

  statusDot: (enabled) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: enabled ? colors.green : colors.red,
  }),

  toggleSwitch: (enabled) => ({
    width: "40px",
    height: "22px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    backgroundColor: enabled ? colors.orange : "#27272a",
    position: "relative",
    transition: "background-color 0.15s ease",
    padding: 0,
  }),

  toggleKnob: (enabled) => ({
    position: "absolute",
    top: "3px",
    left: enabled ? "21px" : "3px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    transition: "left 0.15s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
  }),

  actionsCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: colors.textSecondary,
    fontSize: "14px",
  },
};

export { colors };