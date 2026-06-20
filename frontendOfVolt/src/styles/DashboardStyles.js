export const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    padding: '20px 40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0',
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
    color: '#8c8c8c',
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
    color: '#1a1a1a',
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
    backgroundColor: '#1a1a1a',
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
    maxWidth: '1400px',
    margin: '0 auto',
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '10px',
  },
  subTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  subTitle: {
    fontSize: '16px',
    color: '#555',
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: '#1a1a1a',
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
    flexWrap: 'nowrap',
    marginLeft: 'auto',
  },
  searchInput: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #d0d0d0',
    fontSize: '14px',
    minWidth: '200px',
    width: '200px', // Add fixed width
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#1a1a1a',
      boxShadow: '0 0 0 2px rgba(26,26,26,0.1)',
    }
  },
  iconButton: {
    padding: '8px 12px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
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
      backgroundColor: '#333',
      transform: 'scale(1.05)',
    }
  },
  actionButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#1a1a1a',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f0f0f0',
      borderColor: '#1a1a1a',
    }
  },
  deviceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  deviceCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  deviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
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
    color: '#8c8c8c',
    fontSize: '14px',
    minWidth: '30px',
  },
  deviceName: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#1a1a1a',
  },
  assetIdBadge: {
    backgroundColor: '#f0f0f0',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#555',
    fontWeight: '500',
  },
  deviceHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  expandIcon: {
    fontSize: '14px',
    color: '#8c8c8c',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f0f0f0',
    }
  },
  deviceDetails: {
    padding: '20px',
    borderTop: '1px solid #e8e8e8',
    backgroundColor: '#fafbfc',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e8e8e8',
  },
  detailsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  detailsActions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '6px 16px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#333',
      transform: 'scale(1.05)',
    }
  },
  saveButton: {
    padding: '6px 16px',
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#1b5e20',
      transform: 'scale(1.05)',
    }
  },
  cancelButton: {
    padding: '6px 16px',
    backgroundColor: '#c62828',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
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
    color: '#8c8c8c',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '14px',
    color: '#000000',
    wordBreak: 'break-word',
    fontWeight: '500',
  },
  editInput: {
    padding: '6px 8px',
    borderRadius: '4px',
    border: '1px solid #1a1a1a',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#1a1a1a',
    ':focus': {
      boxShadow: '0 0 0 2px rgba(26,26,26,0.1)',
    }
  },
  selectDropdown: {
    padding: '6px 10px',
    borderRadius: '4px',
    border: '1px solid #d0d0d0',
    backgroundColor: 'white',
    fontSize: '13px',
    cursor: 'pointer',
    minWidth: '140px',
    color: '#1a1a1a',
    fontWeight: '500',
    transition: 'border-color 0.2s',
    ':hover': {
      borderColor: '#1a1a1a',
    },
    ':focus': {
      outline: 'none',
      borderColor: '#1a1a1a',
      boxShadow: '0 0 0 2px rgba(26,26,26,0.1)',
    }
  },
  badge: (status) => {
    const colors = {
      Online: { bg: '#e8f5e9', color: '#2e7d32' },
      Warning: { bg: '#fff3e0', color: '#e65100' },
      Error: { bg: '#ffebee', color: '#c62828' },
      Offline: { bg: '#e3f2fd', color: '#000000' },
      Enabled: { bg: '#e8f5e9', color: '#2e7d32' },
      Disabled: { bg: '#f5f5f5', color: '#ff0000' },
    };
    const selected = colors[status] || colors.Fine;
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
      Fine: '#2e7d32',
      Warning: '#e65100',
      Error: '#c62828',
      Maintainance: '#0d47a1',
    };
    return { borderColor: colors[status] || colors.Fine, borderWidth: '1.5px' };
  },
  enabledSelectBorder: (status) => ({
    borderColor: status === 'Enabled' ? '#2e7d32' : '#9e9e9e',
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
      backgroundColor: '#1a1a1a',
      borderColor: '#1a1a1a',
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
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
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
    color: '#1a1a1a',
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
      color: '#1a1a1a',
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
    borderRadius: '6px',
    border: '1px solid #d0d0d0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#1a1a1a',
    }
  },
  modalSelect: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d0d0d0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    ':focus': {
      borderColor: '#1a1a1a',
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
    borderRadius: '6px',
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
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#333',
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
};