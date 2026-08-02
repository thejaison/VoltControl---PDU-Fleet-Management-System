const colors = {
  white: "#FFFFFF",
  bgSidebar: "#110f17", // Obsidian dark gray/purple from reference image
  bgActive: "#FFFFFF", // White capsule background for active state
  border: "rgba(255, 255, 255, 0.03)",
  textPrimary: "#8f8d99", // Inactive item silver/gray
  textSecondary: "#5e5c65",
  textOnActive: "#110f17", // Dark text on active white capsule
  overlay: "rgba(0, 0, 0, 0.4)",
};

export const styles = {
  sidebar: (isCollapsed) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "280px",
    background: colors.bgSidebar,
    borderRight: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "32px 20px 24px",
    boxSizing: "border-box",
    zIndex: 1000,
    boxShadow: "4px 0 30px rgba(0, 0, 0, 0.2)",
    transform: isCollapsed ? "translateX(-280px)" : "translateX(0)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  }),

  sidebarProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    margin: "0 8px 24px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  sidebarProfileAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)", // Emerald green theme gradient
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "13px",
    boxShadow: "0 4px 10px rgba(16, 185, 129, 0.15)",
  },

  sidebarProfileMeta: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    overflow: "hidden",
  },

  sidebarProfileName: {
    fontSize: "13.5px",
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: "1.3",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  sidebarProfileRole: {
    fontSize: "11px",
    color: "#8f8d99",
    fontWeight: "500",
  },


  collapseBtn: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "none",
    borderRadius: "10px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9e9ca7",
    cursor: "pointer",
    marginLeft: "auto",
    padding: 0,
    transition: "all 0.2s ease",
  },

  floatingOpenBtn: {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#18171c",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 999,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  dismissUpgradeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255, 255, 255, 0.15)",
    border: "none",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    zIndex: 3,
    padding: 0,
    transition: "background 0.2s ease",
  },

  sidebarLogoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 8px",
    marginBottom: "36px",
  },

  sidebarLogoBadge: {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #34d399, #10b981)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontWeight: 800,
    fontSize: "18px",
    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
  },

  sidebarLogoText: {
    fontSize: "20px",
    fontWeight: 800,
    color: colors.white,
    letterSpacing: "-0.02em",
  },

  sectionHeader: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#54535b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "16px 14px 8px",
    margin: 0,
  },

  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  navItemButton: (isActive, isLocked) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    padding: "12px 16px",
    borderRadius: "16px",
    border: "none",
    cursor: isLocked ? "not-allowed" : "pointer",
    textAlign: "left",
    background: isActive ? colors.bgActive : "transparent",
    opacity: isLocked ? 0.35 : 1,
    color: isActive ? colors.textOnActive : colors.textPrimary,
    fontWeight: isActive ? 700 : 600,
    fontSize: "14.5px",
    boxShadow: isActive ? "0 8px 20px rgba(0, 0, 0, 0.15)" : "none",
  }),

  navIcon: (isActive, isLocked) => ({
    width: "18px",
    height: "18px",
    objectFit: "contain",
    filter: isActive ? "brightness(0)" : "brightness(0) invert(1)",
    opacity: isActive ? 1 : 0.5,
  }),

  // Upgrade banner card at the bottom
  upgradeCard: {
    background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
    borderRadius: "24px",
    padding: "24px 20px 20px",
    color: colors.white,
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 12px 28px rgba(79, 70, 229, 0.25)",
  },

  upgradeTitle: {
    fontSize: "16px",
    fontWeight: 800,
    margin: 0,
    zIndex: 2,
    letterSpacing: "-0.01em",
  },

  upgradeSubtitle: {
    fontSize: "12px",
    opacity: 0.85,
    lineHeight: "1.45",
    margin: 0,
    zIndex: 2,
    fontWeight: 500,
  },

  upgradeButton: {
    background: colors.white,
    color: "#4f46e5",
    border: "none",
    borderRadius: "999px",
    padding: "11px 18px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s ease",
    zIndex: 2,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },

  sidebarFooter: {
    marginTop: "16px",
    paddingTop: "14px",
    borderTop: `1px solid ${colors.border}`,
    fontSize: "11px",
    color: colors.textSecondary,
    textAlign: "center",
  },
};