export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '42px 42px 38px',
    borderRadius: '32px',
    boxShadow: '0 28px 80px rgba(15, 23, 42, 0.08)',
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  rowGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '18px'
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
    fontSize: '32px',
    lineHeight: '1.05',
    fontWeight: '800',
    color: '#111827'
  },
  subtitle: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#475569'
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
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#0f172a',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '15px',
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    padding: '16px 24px',
    borderRadius: '999px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '15px',
    letterSpacing: '0.08em',
    marginTop: '16px',
    alignSelf: 'stretch',
    textAlign: 'center',
    transition: 'transform 0.2s ease, background-color 0.2s ease'
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: '15px',
    color: '#0f172a',
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
    color: '#6b7280',
    fontSize: '14px'
  },
  toggleButton: {
    backgroundColor: 'transparent',
    color: '#111827',
    border: '1px solid #d1d5db',
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
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Matching your shadow tone with a soft dim
    backdropFilter: 'blur(4px)',               // Smooth background blur
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
    fontSize: '14px'
  },
  smallButtonCancel: {
    backgroundColor: '#64748b', // Slate gray finish matching your screenshot
    color: '#ffffff',
    width: 'auto',
    padding: '12px 28px',
    marginTop: 0,
    fontSize: '14px'
  }
};