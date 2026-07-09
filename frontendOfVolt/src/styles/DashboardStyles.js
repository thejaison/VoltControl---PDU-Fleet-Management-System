export const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    background: 'radial-gradient(circle at 16% 8%, rgba(255, 112, 67, 0.12), transparent 30%), linear-gradient(135deg, #f7f7f5 0%, #eeeeec 100%)',
    minHeight: '100vh',
    padding: '24px 40px',
    color: '#181816',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 22px',
    border: '1px solid rgba(24, 24, 22, 0.06)',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.92)',
    boxShadow: '0 24px 56px rgba(24, 24, 22, 0.08)',
    marginBottom: '30px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoBox: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  metaText: {
    fontSize: '13px',
    color: '#70737b',
  },
  navSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  navButtonActive: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#181816',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f0f0f0',
    }
  },
  navButtonAction: {
    padding: '8px 20px',
    backgroundColor: '#181816',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#333',
    }
  },
  mainContent: {
    maxWidth: '1320px',
    margin: '0 auto',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
    gap: '16px',
  },
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#181816',
    marginBottom: '10px',
  },
  subTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  subTitle: {
    fontSize: '16px',
    color: '#70737b',
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: '#181816',
    color: 'white',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  searchInput: {
    padding: '8px 16px',
    borderRadius: '999px',
    border: '1px solid #e3e3df',
    fontSize: '14px',
    minWidth: '200px',
    width: '220px',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
    borderColor: '#ff7043',
      boxShadow: '0 0 0 3px rgba(255,112,67,0.14)',
    }
  },
  iconButton: {
    padding: '8px 12px',
    backgroundColor: '#181816',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#2a2a27',
      transform: 'scale(1.05)',
    }
  },
  actionButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#1a1a1a',
    border: '1px solid #e3e3df',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f0f0f0',
      borderColor: '#ff7043',
    }
  },
  deviceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  deviceCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 18px 44px rgba(24, 24, 22, 0.08)',
    border: '1px solid rgba(24, 24, 22, 0.06)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  deviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    transition: 'background-color 0.2s',
  },
  deviceHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#1a1a1a',
  },
  deviceNumber: {
    fontWeight: '600',
    color: '#70737b',
    fontSize: '14px',
    minWidth: '30px',
  },
  deviceName: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#181816',
  },
  assetIdBadge: {
    backgroundColor: 'rgba(255, 112, 67, 0.10)',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#f4511e',
    fontWeight: '500',
  },
  deviceHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  expandIcon: {
    fontSize: '14px',
    color: '#70737b',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '14px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f2f2ef',
    }
  },
  deviceDetails: {
    padding: '20px',
    borderTop: '1px solid #e8e8e8',
    backgroundColor: '#fbfbfa',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e9e9e5',
  },
  detailsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#181816',
  },
  detailsActions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '6px 16px',
    backgroundColor: '#181816',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#2a2a27',
      transform: 'scale(1.05)',
    }
  },
  saveButton: {
    padding: '6px 16px',
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f4511e',
      transform: 'scale(1.05)',
    }
  },
  cancelButton: {
    padding: '6px 16px',
    backgroundColor: '#c62828',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#b71c1c',
      transform: 'scale(1.05)',
    }
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#70737b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '14px',
    color: '#181816',
    wordBreak: 'break-word',
    fontWeight: '500',
  },
  editInput: {
    padding: '6px 8px',
    borderRadius: '14px',
    border: '1px solid #e3e3df',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#181816',
    ':focus': {
      boxShadow: '0 0 0 3px rgba(255,112,67,0.14)',
    }
  },
  selectDropdown: {
    padding: '6px 10px',
    borderRadius: '14px',
    border: '1px solid #e3e3df',
    backgroundColor: 'white',
    fontSize: '13px',
    cursor: 'pointer',
    width: '140px',       // fixed width — add this
    minWidth: '140px',    // keep this too
    maxWidth: '140px',    // add this
    color: '#181816',
    fontWeight: '500',
    transition: 'border-color 0.2s',
  },
  badge: (status) => {
    const colors = {
        Online:   { bg: 'rgba(255, 112, 67, 0.11)', color: '#f4511e' },
        Warning:  { bg: '#fff0e9', color: '#f4511e' },
        Error:    { bg: 'rgba(24, 24, 22, 0.08)', color: '#181816' },
        Offline:  { bg: 'rgba(24, 24, 22, 0.08)', color: '#181816' },
        Enabled:  { bg: 'rgba(255, 112, 67, 0.11)', color: '#f4511e' },
        Disabled: { bg: '#f2f2ef', color: '#70737b' },
        Unknown:  { bg: '#f3f4f6', color: '#6b7280' },
    };
    const selected = colors[status] || { bg: '#f3f4f6', color: '#6b7280' }; // safe fallback, no more colors.Fine
    return {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        backgroundColor: selected.bg,
        color: selected.color,
        fontSize: '12px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
    };
  },

  statusSelectBorder: (status) => {
    const colors = {
      Fine: '#ff7043',
      Warning: '#f4511e',
      Error: '#181816',
      Maintainance: '#70737b',
    };
    return { borderColor: colors[status] || colors.Fine, borderWidth: '1.5px' };
  },
  enabledSelectBorder: (status) => ({
    borderColor: status === 'Enabled' ? '#ff7043' : '#9e9e9e',
    borderWidth: '1.5px',
  }),

  customCheckbox: {
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    fontSize: '22px',
    userSelect: 'none',
    width: '20px',
    height: '20px',
    '& input': {
      position: 'absolute',
      opacity: '0',
      cursor: 'pointer',
      height: '0',
      width: '0',
    },
    '& input:checked ~ span': {
      backgroundColor: '#ff7043',
      borderColor: '#ff7043',
    },
    '& input:checked ~ span:after': {
      display: 'block',
    },
  },
  checkmark: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '18px',
    width: '18px',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    border: '2px solid #999',
    transition: 'all 0.2s',
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'none',
      left: '4px',
      top: '0px',
      width: '6px',
      height: '11px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '30px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 28px 70px rgba(24,24,22,0.18)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#181816',
    margin: 0,
  },
  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    padding: '5px',
    ':hover': {
      color: '#181816',
    }
  },
  modalBody: {
    marginBottom: '20px',
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  modalField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  modalLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  modalInput: {
    padding: '8px 12px',
    borderRadius: '14px',
    border: '1px solid #d0d0d0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#ff7043',
    }
  },
  modalSelect: {
    padding: '8px 12px',
    borderRadius: '14px',
    border: '1px solid #d0d0d0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    ':focus': {
      borderColor: '#ff7043',
    }
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '2px solid #f0f0f0',
  },
  modalCancel: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: '#555',
    border: '1px solid #d0d0d0',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f5f5f5',
    }
  },
  modalCreate: {
    padding: '10px 24px',
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f4511e',
    }
  },

  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#c62828',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#ffebee',
    }
  },

  deleteSelectedBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    borderRadius: '999px',
    padding: '8px 16px',
    fontSize: '14px',
    marginLeft: '5px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  paginationBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    marginTop: '10px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  paginationInfo: {
    fontSize: '13px',
    color: '#70737b',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  pageNavButton: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'transparent',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: '13px',
  },
  pageNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent',
    color: '#9aa0aa',
    cursor: 'pointer',
    fontSize: '13px',
  },
  pageNumberActive: {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    border: '1px solid #6366f1',
    background: '#ff7043',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
  },
  logoutButtonStyle: {
    marginLeft: '10px', 
    cursor: 'pointer',
    color: '#f4511e'
  },
  selectALLButton: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    marginLeft: '10px',
    cursor: 'pointer'
  }
};
