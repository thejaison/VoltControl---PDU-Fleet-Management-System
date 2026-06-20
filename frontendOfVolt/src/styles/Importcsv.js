export const styles = {
    importContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        color: '#111827',
        fontFamily: "'Montserrat', sans-serif"
    },

    importHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #d1d5db'
    },

    importTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#e0e7ff',
        margin: 0
    },

    importCloseButton: {
        background: 'transparent',
        border: 'none',
        color: '#a0b4d0',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'all 0.2s',
        ':hover': {
            backgroundColor: '#1a2a4a',
            color: '#ffffff'
        }
    },

    importContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
    },

    importInstructions: {
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #000000',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
    },

    importList: {
        listStyleType: 'none',
        padding: 0,
        margin: '12px 0 20px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px',
    },

    importSampleLink: {
        color: '#111827',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '500',
        padding: '10px 22px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #000000',
        transition: 'all 0.2s ease',
    },

    importDropZone: {
        border: '1px dashed #000000',
        borderRadius: '16px',
        padding: '44px 22px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
    },

    importDropZoneDragging: {
        border: '1px solid #000000',
        backgroundColor: '#f3f4f6',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
    },

    importDropZoneFileLoaded: {
        borderColor: '#000000',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
    },

    importDropIcon: {
        fontSize: '40px',
        marginBottom: '8px',
        opacity: 0.85,
    },

    importDropIconCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#000000',
        border: '1px solid #111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
    },

    importDropText: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827',
        margin: '0',
    },

    importDropSubtext: {
        color: '#6b7280',
        margin: '4px 0',
        fontSize: '13px',
    },

    importBrowseButton: {
        display: 'inline-block',
        padding: '10px 28px',
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '12px',
        border: 'none',
        boxShadow: '0 12px 24px rgba(0,0,0,0.14)',
    },

    importFileInput: {
        display: 'none'
    },

    importFileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '18px 20px',
        backgroundColor: '#000000',
        borderRadius: '14px',
        width: '100%',
        maxWidth: '520px',
        border: '1px solid #111111',
    },

    importFileIcon: {
        fontSize: '28px',
        flexShrink: 0,
    },

    importFileIconBox: {
        width: '44px',
        height: '52px',
        backgroundColor: '#000000',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '1px solid #111111',
    },

    importFileName: {
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        fontSize: '15px',
    },

    importFileSize: {
        color: '#9ca3af',
        fontSize: '12px',
        margin: '2px 0 0 0',
    },

    importFileCheckmark: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '700',
        flexShrink: 0,
        border: '1px solid #111111',
    },

    importRemoveFile: {
        background: '#ffffff',
        border: '1px solid #d1d5db',
        color: '#111827',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: 'auto',
        padding: '6px 8px',
        borderRadius: '6px',
        flexShrink: 0,
    },

    importError: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#991b1b',
        padding: '14px 16px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
    },

    importPreview: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #d1d5db',
    },

    importPreviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '1px solid #e5e7eb',
    },

    importPreviewTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#111827',
    },

    importPreviewCount: {
        color: '#6b7280',
        fontSize: '13px',
    },

    importTableWrapper: {
        overflowX: 'auto',
        marginBottom: '20px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
    },

    importTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
    },

    importTableHeader: {
        backgroundColor: '#f8fafc',
        padding: '12px 14px',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '11px',
        color: '#6b7280',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderBottom: '1px solid #e5e7eb',
        whiteSpace: 'nowrap',
    },

    importTableCell: {
        padding: '12px 14px',
        borderBottom: '1px solid #f3f4f6',
        color: '#111827',
        fontSize: '13px',
    },

    importPreviewActions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'flex-end',
        paddingTop: '4px',
    },

    importConfirmButton: {
        padding: '10px 26px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
    },

    importClearButton: {
        padding: '10px 26px',
        backgroundColor: '#ffffff',
        color: '#111827',
        border: '1px solid #000000',
        borderRadius: '10px',
        fontSize: '13px',
        cursor: 'pointer',
    },

    importInstructionsHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '28px',
    },

    importCsvBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontWeight: '700',
        fontSize: '13px',
        borderRadius: '10px',
        border: '1px solid #000000',
        flexShrink: 0,
        letterSpacing: '0.05em',
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
    },

    importInstructionsTitle: {
        margin: '0 0 4px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: '#111827',
    },

    importInstructionsSubtitle: {
        margin: 0,
        fontSize: '13px',
        color: '#6b7280',
    },

    importFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
    },

    importFieldCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 18px',
        backgroundColor: '#ffffff',
        border: '1px solid #000000',
        borderRadius: '14px',
        position: 'relative',
        cursor: 'default',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)',
    },

    importFieldCardRequired: {
        borderColor: '#000000',
        backgroundColor: '#ffffff',
    },

    importFieldIconCircle: {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        backgroundColor: '#111827',
        border: '1px solid #000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    importFieldLabel: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#111827',
        letterSpacing: '0.08em',
        flex: 1,
    },

    importFieldNum: {
        fontSize: '11px',
        color: '#6b7280',
        fontWeight: '600',
    },

    importDropHints: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        fontSize: '12px',
        color: '#555',
        backgroundColor: '#111',
        padding: '6px 16px',
        borderRadius: '20px',
        border: '1px solid #222',
    },

    importDropHintDot: {
        color: '#333',
    },
};