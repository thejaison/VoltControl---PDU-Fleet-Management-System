export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f5f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#12241b'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '42px 42px 38px',
    borderRadius: '28px',
    boxShadow: '0 8px 32px rgba(12, 52, 39, 0.06)',
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    border: '1px solid #e4e9e1'
  },
  rowGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '18px',
    alignItems: 'start'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '8px'
  },
  title: {
    margin: 0,
    fontSize: '28px',
    lineHeight: '1.2',
    fontWeight: '800',
    color: '#12241b',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#697a70'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    fontSize: '13px',
    color: '#12241b',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #dbe2d8',
    backgroundColor: '#ebefe8',
    fontSize: '14px',
    color: '#12241b',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#0c3427',
    color: '#ffffff',
    border: 'none',
    padding: '15px 24px',
    borderRadius: '999px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '15px',
    letterSpacing: '0.02em',
    marginTop: '16px',
    alignSelf: 'stretch',
    textAlign: 'center',
    boxShadow: '0 4px 14px rgba(12, 52, 39, 0.2)',
    transition: 'transform 0.2s ease, background-color 0.2s ease'
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #dbe2d8',
    backgroundColor: '#ebefe8',
    fontSize: '14px',
    color: '#12241b',
    outline: 'none',
    appearance: 'none',
    boxSizing: 'border-box'
  },
  toggleRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '10px'
  },
  toggleText: {
    margin: 0,
    color: '#697a70',
    fontSize: '14px'
  },
  toggleButton: {
    backgroundColor: '#ebefe8',
    color: '#12241b',
    border: '1px solid #dbe2d8',
    padding: '12px 24px',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(12, 52, 39, 0.4)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalButtonGroup: {
    display: 'flex',
    gap: '14px',
    marginTop: '12px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonPrimary: {
    width: 'auto',
    padding: '12px 28px',
    marginTop: 0,
    fontSize: '14px',
    fontWeight: '700',
    backgroundColor: '#0c3427',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    boxShadow: '0 4px 14px rgba(12, 52, 39, 0.2)',
    cursor: 'pointer'
  },
  smallButtonCancel: {
    backgroundColor: '#ebefe8',
    color: '#12241b',
    border: '1px solid #dbe2d8',
    borderRadius: '999px',
    width: 'auto',
    padding: '12px 28px',
    marginTop: 0,
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};