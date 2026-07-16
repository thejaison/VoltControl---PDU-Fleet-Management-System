const colors = {
  white: "#FFFFFF",
  bgPage: "#F7F7F8",
  textPrimary: "#171717",
  textSecondary: "#8B8B90",
  textMuted: "#B0B0B5",
  border: "#EFEFF0",
  orange: "#FF5A1F",
  green: "#1FAA59",
  greenLight: "#E7F8EE",
  red: "#E5484D",
  redLight: "#FDEAEA",
  gray: "#9CA3AF",
  grayLight: "#F1F1F2",
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

  titleSection: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  subtitle: {
    fontSize: "14px",
    color: colors.textSecondary,
    marginTop: "4px",
  },

  panel: {
    backgroundColor: colors.white,
    borderRadius: "16px",
    padding: "8px 20px 20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  toolbarRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
  },

  searchInput: {
    width: "260px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    fontSize: "13px",
    outline: "none",
    color: colors.textPrimary,
  },

  countBadge: {
    fontSize: "13px",
    color: colors.textSecondary,
    fontWeight: 500,
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
    backgroundColor: colors.grayLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    color: colors.textPrimary,
    flexShrink: 0,
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
    backgroundColor: enabled ? colors.orange : colors.grayLight,
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
    backgroundColor: colors.white,
    transition: "left 0.15s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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