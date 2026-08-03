export const colors = {
  primary: '#ffffff',
  secondary: '#121215',
  tertiary: '#1f1f24',
  quaternary: '#27272a',

  green: '#10b981',
  greenLight: 'rgba(16, 185, 129, 0.15)',
  greenDark: '#059669',
  greenPale: 'rgba(16, 185, 129, 0.05)',
  greenText: '#10b981',

  blue: '#ffffff',
  blueLight: 'rgba(255, 255, 255, 0.08)',
  blueText: '#a1a1aa',

  orange: '#ffffff',
  orangeLight: 'rgba(255, 255, 255, 0.08)',
  orangeText: '#a1a1aa',

  red: '#ffffff',
  redLight: 'rgba(255, 255, 255, 0.08)',
  redText: '#a1a1aa',

  purple: '#ffffff',
  purpleLight: 'rgba(255, 255, 255, 0.08)',
  purpleText: '#a1a1aa',

  yellow: '#ffffff',
  yellowLight: 'rgba(255, 255, 255, 0.08)',
  yellowText: '#a1a1aa',

  textPrimary: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  borderLight: '#1f1f24',
  borderMedium: '#27272a',
  background: '#09090b',
  cardBg: '#121215',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowStrong: 'rgba(0, 0, 0, 0.6)',
};

export const styles = {
  appShell: {
    display: 'flex',
    minHeight: '100vh',
    background: '#09090b',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },

  mainContent: (isCollapsed) => ({
    flex: 1,
    marginLeft: isCollapsed ? '80px' : '260px',
    padding: '28px 32px',
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100vh',
    background: '#09090b',
  }),

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

  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    background: '#18181c',
    borderRadius: '12px',
    padding: '8px 14px',
    border: '1px solid #27272a',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },

  searchIcon: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#71717a',
  },

  searchBar: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#ffffff',
    width: '180px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
  },

  timeDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#18181c',
    borderRadius: '12px',
    border: '1px solid #27272a',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },

  dropdownContainer: {
    position: 'relative',
  },

  reportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: '#121215',
    color: '#ffffff',
    border: '1px solid #27272a',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    fontFamily: 'Inter, sans-serif',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    background: '#121215',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    border: '1px solid #27272a',
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
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.15s',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'left',
  },

  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    border: '1px solid #27272a',
    background: '#18181c',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    color: '#ffffff',
  },

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

  fleetCard: {
    background: '#121215',
    borderRadius: '20px',
    padding: '28px 32px',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #1f1f24',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
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
    background: 'linear-gradient(135deg, #10b981, #059669)',
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
    borderTop: '1px solid #1f1f24',
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
    color: '#71717a',
  },

  fleetCardVal: {
    fontSize: '14px',
    fontWeight: '600',
  },

  balanceSection: {
    background: '#121215',
    borderRadius: '20px',
    padding: '24px 28px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    border: '1px solid #1f1f24',
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
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  balanceValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#ffffff',
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
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid #1f1f24',
    padding: '14px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: 'none',
    fontFamily: 'Inter, sans-serif',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },

  panel: {
    background: '#121215',
    borderRadius: '20px',
    padding: '24px 28px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    border: '1px solid #1f1f24',
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
    color: '#ffffff',
    margin: 0,
  },

  viewAllLink: (color) => ({
    fontSize: '13px',
    fontWeight: '600',
    color: '#10b981',
    cursor: 'pointer',
    transition: 'color 0.2s',
    textDecoration: 'none',
  }),

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
    color: '#71717a',
    borderBottom: '1px solid #1f1f24',
  },

  td: {
    padding: '16px 12px',
    fontSize: '13.5px',
    color: '#ffffff',
    borderBottom: '1px solid #1f1f24',
  },

  statusBadge: (status) => {
    const statusMap = {
      'completed': { bg: 'rgba(16, 185, 129, 0.08)', color: '#10b981', border: '#10b981' },
      'running': { bg: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', border: '#27272a' },
      'pending': { bg: 'rgba(255, 255, 255, 0.08)', color: '#a1a1aa', border: '#27272a' },
      'failed': { bg: 'rgba(255, 255, 255, 0.08)', color: '#a1a1aa', border: '#27272a' },
      'cancelled': { bg: 'rgba(255, 255, 255, 0.08)', color: '#71717a', border: '#1f1f24' },
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
      border: `1px solid ${style.border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
    };
  },

  rightMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },

  metricCard: (type) => {
    const borderColors = {
      online: '#10b981',
      offline: '#71717a',
      disabled: '#27272a',
      active: '#52525b',
    };
    return {
      background: '#121215',
      borderRadius: '16px',
      padding: '18px 20px',
      border: '1px solid #1f1f24',
      borderLeft: `4px solid ${borderColors[type] || '#27272a'}`,
      boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    };
  },

  metricCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 0,
    marginBottom: '8px',
  },

  metricCardLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#71717a',
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
    color: '#ffffff',
    margin: '4px 0',
  },

  metricCardFooter: (color) => ({
    fontSize: '12px',
    fontWeight: '600',
    color: color,
  }),

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
    color: '#ffffff',
    lineHeight: 1.2,
  },

  donutInnerSubtext: {
    display: 'block',
    fontSize: '10px',
    fontWeight: '600',
    color: '#71717a',
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
    color: '#a1a1aa',
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
    color: '#ffffff',
  },

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
    background: '#18181c',
    borderRadius: '12px',
    border: '1px solid #1f1f24',
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
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
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
    color: '#ffffff',
  },

  alertMsg: {
    fontSize: '12px',
    color: '#a1a1aa',
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
    color: '#71717a',
  },

  alertBadge: (tag) => {
    const styles = {
      critical: { bg: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' },
      warning: { bg: 'rgba(255, 255, 255, 0.08)', color: '#a1a1aa' },
      info: { bg: 'rgba(255, 255, 255, 0.08)', color: '#71717a' },
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
      border: `1px solid ${style.color}`,
    };
  },

  bottomMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '24px',
    marginBottom: '24px',
  },

  bottomMiniCard: (type) => ({
    background: '#121215',
    borderRadius: '16px',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #1f1f24',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
  }),

  bottomMiniMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  bottomMiniLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  bottomMiniVal: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
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

  footerNote: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    fontSize: '12px',
    color: '#71717a',
    fontWeight: '500',
    borderTop: '1px solid #1f1f24',
    marginTop: '8px',
  },
};

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
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    border-color: #10b981;
  }

  .premium-metric-card {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .premium-metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  }

  .premium-table tbody tr {
    transition: all 0.15s;
  }

  .premium-table tbody tr:hover {
    background: rgba(16, 185, 129, 0.02) !important;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0px);
  }
`;