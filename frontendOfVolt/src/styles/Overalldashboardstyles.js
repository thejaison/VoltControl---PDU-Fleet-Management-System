export const colors = {
  primary: '#12241b',
  secondary: '#ffffff',
  tertiary: '#ebefe8',
  quaternary: '#e4e9e1',

  green: '#22865d',
  greenLight: 'rgba(34, 134, 93, 0.12)',
  greenDark: '#0c3427',
  greenPale: 'rgba(34, 134, 93, 0.05)',
  greenText: '#0c3427',

  blue: '#0c3427',
  blueLight: 'rgba(12, 52, 39, 0.08)',
  blueText: '#0c3427',

  orange: '#ebc351',
  orangeLight: 'rgba(235, 195, 81, 0.15)',
  orangeText: '#b3861b',

  red: '#dc2626',
  redLight: 'rgba(220, 38, 38, 0.1)',
  redText: '#dc2626',

  purple: '#144837',
  purpleLight: 'rgba(20, 72, 55, 0.1)',
  purpleText: '#144837',

  yellow: '#ebc351',
  yellowLight: 'rgba(235, 195, 81, 0.15)',
  yellowText: '#b3861b',

  textPrimary: '#12241b',
  textSecondary: '#697a70',
  textMuted: '#8e9e94',
  borderLight: '#e4e9e1',
  borderMedium: '#d8e0d5',
  background: '#f3f5f0',
  cardBg: '#ffffff',
  shadow: 'rgba(12, 52, 39, 0.03)',
  shadowStrong: 'rgba(12, 52, 39, 0.08)',
};

export const styles = {
  appShell: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f3f5f0',
    fontFamily: 'Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    color: '#12241b',
  },

  mainContent: (isCollapsed) => ({
    flex: 1,
    marginLeft: isCollapsed ? '80px' : '260px',
    padding: '28px 32px',
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100vh',
    background: '#f3f5f0',
  }),

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
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
    background: '#ebefe8',
    borderRadius: '999px',
    padding: '8px 16px',
    border: '1px solid #e4e9e1',
    transition: 'all 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },

  searchIcon: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#8e9e94',
  },

  searchBar: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#12241b',
    width: '180px',
    fontFamily: 'inherit',
    fontWeight: '500',
  },

  timeDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #e4e9e1',
    fontSize: '13px',
    fontWeight: '600',
    color: '#12241b',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },

  dropdownContainer: {
    position: 'relative',
  },

  reportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: '#ffffff',
    color: '#12241b',
    border: '1px solid #e4e9e1',
    borderRadius: '14px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    fontFamily: 'inherit',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 16px 40px rgba(12, 52, 39, 0.1)',
    border: '1px solid #e4e9e1',
    minWidth: '220px',
    padding: '8px',
    zIndex: 100,
    animation: 'slideDown 0.2s ease-out',
  },

  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: 'transparent',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#12241b',
    cursor: 'pointer',
    transition: 'all 0.15s',
    width: '100%',
    fontFamily: 'inherit',
    textAlign: 'left',
  },

  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    borderRadius: '14px',
    border: '1px solid #e4e9e1',
    background: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    color: '#0c3427',
  },

  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '58% 42%',
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
    background: 'linear-gradient(135deg, #0c3427 0%, #062118 100%)',
    backgroundImage: 'radial-gradient(circle at 90% 70%, rgba(235, 195, 81, 0.22) 0%, transparent 60%), linear-gradient(135deg, #0c3427 0%, #062118 100%)',
    borderRadius: '24px',
    padding: '28px 32px',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    boxShadow: '0 16px 40px rgba(12, 52, 39, 0.25)',
  },

  fleetCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },

  fleetCardLogo: {
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: '#ebc351',
  },

  fleetCardChip: {
    width: '40px',
    height: '30px',
    background: 'linear-gradient(135deg, #ebc351, #d4a328)',
    borderRadius: '6px',
    opacity: 0.9,
  },

  fleetCardNumber: {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '24px',
    fontFamily: 'monospace',
    color: '#ffffff',
  },

  fleetCardFooter: {
    display: 'flex',
    gap: '32px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
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
    color: '#9db3a6',
  },

  fleetCardVal: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ffffff',
  },

  balanceSection: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px 28px',
    boxShadow: '0 4px 20px rgba(12, 52, 39, 0.03)',
    border: '1px solid #e4e9e1',
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
    fontWeight: '700',
    color: '#697a70',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  balanceValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#12241b',
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
    color: '#12241b',
  },

  addScanBtn: {
    background: '#f8faf6',
    color: '#0c3427',
    border: '1.5px dashed #c0cbbd',
    padding: '14px 24px',
    borderRadius: '18px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },

  panel: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px 28px',
    boxShadow: '0 4px 20px rgba(12, 52, 39, 0.03)',
    border: '1px solid #e4e9e1',
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
    color: '#12241b',
    margin: 0,
  },

  viewAllLink: (color) => ({
    fontSize: '13px',
    fontWeight: '700',
    color: '#0c3427',
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
    color: '#697a70',
    borderBottom: '1px solid #e4e9e1',
  },

  td: {
    padding: '16px 12px',
    fontSize: '13.5px',
    color: '#12241b',
    borderBottom: '1px solid #e4e9e1',
  },

  statusBadge: (status) => {
    const statusMap = {
      'completed': { bg: 'rgba(34, 134, 93, 0.12)', color: '#0c3427', border: '#22865d' },
      'running': { bg: 'rgba(235, 195, 81, 0.15)', color: '#b3861b', border: '#ebc351' },
      'pending': { bg: '#ebefe8', color: '#697a70', border: '#d5ded1' },
      'failed': { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', border: '#dc2626' },
      'cancelled': { bg: '#ebefe8', color: '#8e9e94', border: '#e4e9e1' },
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
      online: '#0c3427',
      offline: '#ebc351',
      disabled: '#8e9e94',
      active: '#22865d',
    };
    return {
      background: '#ffffff',
      borderRadius: '20px',
      padding: '20px 22px',
      border: '1px solid #e4e9e1',
      borderLeft: `4px solid ${borderColors[type] || '#0c3427'}`,
      boxShadow: '0 4px 16px rgba(12, 52, 39, 0.03)',
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
    fontWeight: '700',
    color: '#697a70',
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
    background: bg || '#ebefe8',
    color: color || '#0c3427',
  }),

  metricCardValue: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#12241b',
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
    color: '#12241b',
    lineHeight: 1.2,
  },

  donutInnerSubtext: {
    display: 'block',
    fontSize: '10px',
    fontWeight: '600',
    color: '#697a70',
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
    color: '#697a70',
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
    color: '#12241b',
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
    background: '#f8faf6',
    borderRadius: '14px',
    border: '1px solid #e4e9e1',
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
    background: '#ebefe8',
    color: '#0c3427',
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
    color: '#12241b',
  },

  alertMsg: {
    fontSize: '12px',
    color: '#697a70',
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
    color: '#8e9e94',
  },

  alertBadge: (tag) => {
    const badgeStyles = {
      critical: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
      warning: { bg: 'rgba(235, 195, 81, 0.15)', color: '#b3861b' },
      info: { bg: '#ebefe8', color: '#0c3427' },
    };
    const style = badgeStyles[tag] || badgeStyles.info;
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
    background: '#ffffff',
    borderRadius: '20px',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e4e9e1',
    boxShadow: '0 4px 16px rgba(12, 52, 39, 0.03)',
  }),

  bottomMiniMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  bottomMiniLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#697a70',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  bottomMiniVal: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#12241b',
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
    borderRadius: '14px',
    background: bg || '#ebefe8',
    color: color || '#0c3427',
    fontSize: '20px',
  }),

  footerNote: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    fontSize: '12px',
    color: '#8e9e94',
    fontWeight: '500',
    borderTop: '1px solid #e4e9e1',
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
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
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
    box-shadow: 0 12px 30px rgba(12, 52, 39, 0.08);
    border-color: #0c3427;
  }

  .premium-metric-card {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .premium-metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(12, 52, 39, 0.06);
  }

  .premium-table tbody tr {
    transition: all 0.15s;
  }

  .premium-table tbody tr:hover {
    background: rgba(12, 52, 39, 0.02) !important;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0px);
  }
`;