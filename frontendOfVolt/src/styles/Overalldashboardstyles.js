// ../styles/Overalldashboardstyles.js
export const colors = {
  // Primary palette - White & Pale Green theme
  primary: '#ffffff',
  secondary: '#f0fdf4', // pale green
  tertiary: '#dcfce7', // light green
  quaternary: '#bbf7d0', // soft green

  // Green variants
  green: '#22c55e',
  greenLight: '#86efac',
  greenDark: '#15803d',
  greenPale: '#f0fdf4',
  greenText: '#166534',

  // Accent colors (muted)
  blue: '#60a5fa',
  blueLight: '#dbeafe',
  blueText: '#1e40af',

  orange: '#fb923c',
  orangeLight: '#ffedd5',
  orangeText: '#9a3412',

  red: '#f87171',
  redLight: '#fee2e2',
  redText: '#991b1b',

  purple: '#a78bfa',
  purpleLight: '#ede9fe',
  purpleText: '#5b21b6',

  yellow: '#fbbf24',
  yellowLight: '#fef3c7',
  yellowText: '#92400e',

  // Neutrals
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  borderLight: '#f1f5f9',
  borderMedium: '#e2e8f0',
  background: '#f8fafc',
  cardBg: '#ffffff',
  shadow: 'rgba(34, 197, 94, 0.08)',
  shadowStrong: 'rgba(34, 197, 94, 0.15)',
};

export const styles = {
  // App Shell
  appShell: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },

  // Main Content
  mainContent: (isCollapsed) => ({
    flex: 1,
    marginLeft: isCollapsed ? '80px' : '260px',
    padding: '28px 32px',
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100vh',
    background: '#f8fafc',
  }),

  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },

  // Search Bar
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '8px 14px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },

  searchIcon: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#94a3b8',
  },

  searchBar: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#1e293b',
    width: '180px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
  },

  // Time Display
  timeDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },

  // Report Dropdown
  dropdownContainer: {
    position: 'relative',
  },

  reportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
    fontFamily: 'Inter, sans-serif',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: '1px solid #f1f5f9',
    minWidth: '220px',
    padding: '6px',
    zIndex: 100,
    animation: 'slideDown 0.2s ease-out',
  },

  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e293b',
    cursor: 'pointer',
    transition: 'all 0.15s',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },

  // Refresh Button
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    color: '#64748b',
  },

  // Dashboard Grid
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    gap: '24px',
    marginBottom: '24px',
  },

  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  // Premium Fleet Card
  fleetCard: {
    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
    borderRadius: '20px',
    padding: '28px 32px',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },

  fleetCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },

  fleetCardLogo: {
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    opacity: 0.9,
  },

  fleetCardChip: {
    width: '40px',
    height: '30px',
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    borderRadius: '6px',
    opacity: 0.8,
  },

  fleetCardNumber: {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '24px',
    fontFamily: 'monospace',
    opacity: 0.9,
  },

  fleetCardFooter: {
    display: 'flex',
    gap: '32px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },

  fleetCardMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  fleetCardLabel: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.5,
  },

  fleetCardVal: {
    fontSize: '14px',
    fontWeight: '600',
  },

  // Balance Section
  balanceSection: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '24px 28px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
  },

  balanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },

  balanceMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  balanceLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  balanceValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
  },

  balanceStats: {
    display: 'flex',
    gap: '20px',
  },

  balanceStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '600',
  },

  addScanBtn: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
    fontFamily: 'Inter, sans-serif',
    width: '100%',
  },

  // Panel
  panel: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '24px 28px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
  },

  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  panelIcon: (color) => ({
    fontSize: '18px',
  }),

  panelTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },

  viewAllLink: (color) => ({
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.2s',
    textDecoration: 'none',
  }),

  // Table
  tableWrapper: {
    overflowX: 'auto',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  th: {
    textAlign: 'left',
    padding: '12px 12px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#94a3b8',
    borderBottom: '2px solid #f1f5f9',
  },

  td: {
    padding: '12px 12px',
    fontSize: '13px',
    color: '#1e293b',
    borderBottom: '1px solid #f8fafc',
  },

  statusBadge: (status) => {
    const statusMap = {
      'completed': { bg: '#dcfce7', color: '#166534' },
      'running': { bg: '#dbeafe', color: '#1e40af' },
      'pending': { bg: '#fef3c7', color: '#92400e' },
      'failed': { bg: '#fee2e2', color: '#991b1b' },
      'cancelled': { bg: '#f1f5f9', color: '#64748b' },
    };
    const lowerStatus = status?.toLowerCase() || 'pending';
    const style = statusMap[lowerStatus] || statusMap.pending;
    return {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '700',
      backgroundColor: style.bg,
      color: style.color,
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
    };
  },

  // Right Column Metrics Grid
  rightMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },

  metricCard: (type) => {
    const borderColors = {
      online: '#22c55e',
      offline: '#fb923c',
      disabled: '#f87171',
      active: '#a78bfa',
    };
    return {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '18px 20px',
      border: '1px solid #f1f5f9',
      borderTop: `3px solid ${borderColors[type] || '#e2e8f0'}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    };
  },

  metricCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },

  metricCardLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  metricIconCircle: (bg, color) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    background: bg,
    color: color,
  }),

  metricCardValue: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '4px 0',
  },

  metricCardFooter: (color) => ({
    fontSize: '12px',
    fontWeight: '600',
    color: color,
  }),

  // Donut Chart
  donutContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    padding: '8px 0',
  },

  donutInnerLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },

  donutInnerText: {
    display: 'block',
    fontSize: '22px',
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 1.2,
  },

  donutInnerSubtext: {
    display: 'block',
    fontSize: '10px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  donutLegends: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },

  donutLegendItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
  },

  legendDotLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#64748b',
  },

  legendDot: (color) => ({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
  }),

  legendValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b',
  },

  // Alerts Stack
  alertsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  alertRow: (tag) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    background: '#fafafa',
    borderRadius: '12px',
    borderLeft: '4px solid #e2e8f0',
    transition: 'all 0.2s',
  }),

  alertLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },

  alertIcon: (color) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: color + '20',
    color: color,
    fontSize: '12px',
    fontWeight: '800',
  }),

  alertMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },

  alertDeviceName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1e293b',
  },

  alertMsg: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },

  alertRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  alertTime: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#94a3b8',
  },

  alertBadge: (tag) => {
    const styles = {
      critical: { bg: '#fee2e2', color: '#991b1b' },
      warning: { bg: '#ffedd5', color: '#9a3412' },
      info: { bg: '#dbeafe', color: '#1e40af' },
    };
    const style = styles[tag] || styles.info;
    return {
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      backgroundColor: style.bg,
      color: style.color,
    };
  },

  // Bottom Metrics Grid
  bottomMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '24px',
    marginBottom: '24px',
  },

  bottomMiniCard: (type) => ({
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #f1f5f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  }),

  bottomMiniMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  bottomMiniLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  bottomMiniVal: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
  },

  bottomMiniSub: (color) => ({
    fontSize: '12px',
    fontWeight: '600',
    color: color,
  }),

  bottomMiniIconCircle: (bg, color) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: bg,
    color: color,
    fontSize: '20px',
  }),

  // Footer
  footerNote: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
    borderTop: '1px solid #f1f5f9',
    marginTop: '8px',
  },
};

// Add CSS animations as a string to be injected
export const animations = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @keyframes pulse-red {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.95); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }

  .animate-slide-up {
    animation: fadeInUp 0.4s ease-out forwards;
  }

  .animate-pulse-green {
    animation: pulse-green 2s ease-in-out infinite;
  }

  .animate-pulse-red {
    animation: pulse-red 1.5s ease-in-out infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .premium-card {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .premium-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(34, 197, 94, 0.08);
  }

  .premium-metric-card {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .premium-metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  .premium-table tbody tr {
    transition: all 0.15s;
  }

  .premium-table tbody tr:hover {
    background: #f8fafc;
  }

  /* Hover states */
  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0px);
  }
`;