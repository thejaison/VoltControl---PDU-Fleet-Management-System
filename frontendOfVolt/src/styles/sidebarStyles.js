const colors = {
  white: "#FFFFFF",
  bgSidebar: "#FFFFFF",
  bgActive: "#FF5A1F",
  border: "#EFEFF0",
  textPrimary: "#171717",
  textSecondary: "#8B8B90",
  textOnActive: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.15)",
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
    backgroundColor: colors.bgSidebar,
    borderRight: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    boxSizing: "border-box",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1000,
    boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.08)" : "none",
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
};