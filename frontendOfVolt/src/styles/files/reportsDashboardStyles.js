export const colors = {
  white: "#121215",
  bgPage: "transparent",
  textPrimary: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  border: "#1f1f24",
  teal: "#10b981",
  tealLight: "rgba(16, 185, 129, 0.08)",
  green: "#10b981",
  greenLight: "rgba(16, 185, 129, 0.08)",
  indigo: "#71717a",
  indigoLight: "rgba(255, 255, 255, 0.08)",
  amber: "#71717a",
  amberLight: "rgba(255, 255, 255, 0.08)",
  red: "#71717a",
  redLight: "rgba(255, 255, 255, 0.08)",
  slate50: "#09090b",
  slate100: "#18181c",
};

export const styles = {
  page: (isCollapsed) => ({
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#09090b",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: `32px 32px 48px ${isCollapsed ? "100px" : "320px"}`,
    boxSizing: "border-box",
    transition: "padding-left 0.3s ease",
  }),

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: "24px",
    padding: "16px 28px",
    marginBottom: "24px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    border: `1px solid ${colors.border}`,
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  headerTitle: {
    fontSize: "24px",
    fontWeight: 800,
    color: colors.textPrimary,
    margin: 0,
    letterSpacing: "-0.02em",
  },

  headerSubtitle: {
    fontSize: "14px",
    color: colors.textSecondary,
    margin: 0,
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  profilePill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px 6px 6px",
    borderRadius: "999px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },

  avatarCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: colors.tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.teal,
    fontWeight: "700",
    fontSize: "12px",
  },

  profileName: {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.textPrimary,
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  metricCard: (colorLight) => ({
    backgroundColor: colors.white,
    borderRadius: "20px",
    padding: "20px 24px",
    border: `1px solid ${colors.border}`,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  }),

  metricIconCircle: (bgColor, textColor) => ({
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: `1px solid ${colors.border}`,
  }),

  metricMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  metricLabel: {
    fontSize: "13px",
    color: colors.textSecondary,
    fontWeight: 500,
  },

  metricValue: {
    fontSize: "22px",
    fontWeight: 800,
    color: colors.textPrimary,
    margin: 0,
    letterSpacing: "-0.01em",
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    alignItems: "start",
  },

  panel: {
    backgroundColor: colors.white,
    borderRadius: "24px",
    padding: "26px",
    border: `1px solid ${colors.border}`,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  panelFullWidth: {
    gridColumn: "1 / -1",
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: "16px",
  },

  panelTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  panelIcon: {
    color: colors.teal,
    display: "flex",
    alignItems: "center",
  },

  panelTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  panelSubtitle: {
    fontSize: "13px",
    color: colors.textSecondary,
    marginTop: "2px",
    marginBottom: 0,
  },

  exportsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  exportCard: (accentColor, isHovered) => ({
    backgroundColor: colors.slate100,
    border: `1px solid ${isHovered ? colors.teal : colors.border}`,
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered ? `0 12px 24px rgba(0,0,0,0.3)` : "none",
  }),

  exportIconCircle: (bgColor, textColor) => ({
    width: "50px",
    height: "50px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    border: `1px solid ${colors.border}`,
  }),

  exportMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
  },

  exportTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  exportDescription: {
    fontSize: "12px",
    color: colors.textSecondary,
    margin: 0,
    lineHeight: "1.5",
  },

  exportButton: (accentColor, isHovered) => ({
    border: "none",
    borderRadius: "999px",
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    background: isHovered 
      ? `linear-gradient(135deg, ${colors.teal}, ${colors.teal}dd)` 
      : `linear-gradient(135deg, ${colors.teal}, ${colors.teal}cc)`,
    cursor: "pointer",
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.25)`,
    width: "100%",
    textAlign: "center",
    transition: "all 0.2s ease",
  }),

  dropZone: (isDragging, hasFile) => ({
    border: `2px dashed ${isDragging ? colors.teal : colors.border}`,
    borderRadius: "20px",
    padding: "36px 20px",
    textAlign: "center",
    backgroundColor: isDragging ? colors.tealLight : colors.slate100,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "180px",
  }),

  dropIconCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: colors.tealLight,
    color: colors.teal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },

  dropText: {
    fontSize: "15px",
    fontWeight: "700",
    color: colors.textPrimary,
    margin: 0,
  },

  dropSubtext: {
    fontSize: "12px",
    color: colors.textSecondary,
    margin: "6px 0 0 0",
  },

  browseButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 20px",
    borderRadius: "999px",
    backgroundColor: colors.slate50,
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    marginTop: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },

  fileInput: {
    display: "none",
  },

  loadedFileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    backgroundColor: colors.slate100,
    borderRadius: "16px",
    width: "100%",
    border: `1px solid ${colors.border}`,
    boxSizing: "border-box",
  },

  loadedFileIconBox: (typeColorBg, typeColorText) => ({
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    border: `1px solid ${colors.border}`,
  }),

  loadedFileMeta: {
    flex: 1,
    textAlign: "left",
    overflow: "hidden",
  },

  loadedFileName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: colors.textPrimary,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  loadedFileSize: {
    fontSize: "11px",
    color: colors.textSecondary,
    margin: "2px 0 0 0",
  },

  loadedFileActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  removeFileBtn: {
    background: colors.slate50,
    border: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    cursor: "pointer",
    fontSize: "12px",
    padding: "6px 8px",
    borderRadius: "8px",
    transition: "all 0.15s ease",
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "20px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    textAlign: "left",
  },

  th: {
    backgroundColor: colors.slate100,
    padding: "14px 18px",
    fontWeight: "700",
    color: colors.textSecondary,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: `1px solid ${colors.border}`,
  },

  td: {
    padding: "14px 18px",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
    verticalAlign: "middle",
  },

  trHover: {
    transition: "background-color 0.15s ease",
    ":hover": {
      backgroundColor: colors.slate100,
    },
  },

  typeBadge: (type) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
    backgroundColor: type === "PDF" ? "rgba(255, 255, 255, 0.08)" : colors.greenLight,
    color: type === "PDF" ? colors.textSecondary : colors.green,
    border: `1px solid ${type === "PDF" ? colors.border : colors.green}`,
  }),

  actionBtnGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  iconActionBtn: (hoverBg, hoverColor) => ({
    border: "none",
    background: "transparent",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    cursor: "pointer",
    transition: "all 0.15s ease",
  }),

  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    boxSizing: "border-box",
    },

  modalContent: {
    backgroundColor: colors.white,
    borderRadius: "24px",
    width: "100%",
    maxWidth: "880px",
    maxHeight: "85vh",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
    border: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  modalHeader: {
    padding: "20px 24px",
    borderBottom: `1px solid ${colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalBody: {
    padding: "24px",
    overflowY: "auto",
    flex: 1,
  },

  modalFooter: {
    padding: "16px 24px",
    borderTop: `1px solid ${colors.border}`,
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    backgroundColor: colors.slate100,
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
    textAlign: "left",
  },

  inputLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.textPrimary,
  },

  textInput: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.slate100,
    fontSize: "14px",
    color: colors.textPrimary,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
  },
};
