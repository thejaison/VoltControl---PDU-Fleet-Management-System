// overAllDashboardStyles.js
// Central style definitions for OverAllDashboard.jsx
// Theme: white background, black text, orange accent (reference: Finexy dashboard)

const colors = {
  white: "#FFFFFF",
  bgPage: "#F7F7F8",
  bgSidebar: "#FFFFFF",
  bgHover: "#F5F5F6",
  bgActive: "#FF5A1F",
  border: "#EFEFF0",
  textPrimary: "#171717",
  textSecondary: "#8B8B90",
  textOnActive: "#FFFFFF",
};

export const styles = {
  // Outer app shell
  appShell: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: colors.bgPage,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  // ---------- Sidebar ----------
  sidebar: {
    width: "260px",
    flexShrink: 0,
    backgroundColor: colors.bgSidebar,
    borderRight: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

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
    backgroundColor: colors.bgActive,
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

  navItemButton: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: isActive ? colors.bgActive : "transparent",
    transition: "background-color 0.15s ease",
  }),

  navIcon: (isActive) => ({
    width: "20px",
    height: "20px",
    objectFit: "contain",
    // icons are black PNGs; invert to white when the item is active
    filter: isActive ? "brightness(0) invert(1)" : "none",
    opacity: isActive ? 1 : 0.75,
  }),

  navLabel: (isActive) => ({
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

  // ---------- Main content area ----------
  mainContent: {
    flex: 1,
    padding: "32px 40px",
    boxSizing: "border-box",
  },

  pageHeading: {
    fontSize: "24px",
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  },

  pageSubheading: {
    fontSize: "14px",
    color: colors.textSecondary,
    marginTop: "6px",
  },
};