export const styles = {
    importContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        color: '#e0e7ff',
        fontFamily: "'Montserrat', sans-serif"
    },

    importHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #1a2a4a'
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
    },

    importInstructions: {
        backgroundColor: '#090b11',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #141921',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
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
        color: '#fff',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '500',
        padding: '10px 22px',
        backgroundColor: '#111',
        borderRadius: '10px',
        border: '1px solid #333',
        transition: 'all 0.2s ease',
    },

    importDropZone: {
        border: '1px dashed #333',
        borderRadius: '16px',
        padding: '44px 22px',
        textAlign: 'center',
        backgroundColor: '#07070f',
        transition: 'all 0.3s ease',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },

    importDropZoneDragging: {
        border: '1px solid #fff',
        backgroundColor: '#111',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
    },

    importDropZoneFileLoaded: {
        borderColor: '#444',
        borderStyle: 'solid',
        backgroundColor: '#08090f',
    },

    importDropIcon: {
        fontSize: '40px',
        marginBottom: '8px',
        opacity: 0.8,
    },

    importDropIconCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#111',
        border: '1px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
    },

    importDropText: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#fff',
        margin: '0',
    },

    importDropSubtext: {
        color: '#7d8899',
        margin: '4px 0',
        fontSize: '13px',
    },

    importBrowseButton: {
        display: 'inline-block',
        padding: '10px 28px',
        backgroundColor: '#fff',
        color: '#000',
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
        backgroundColor: '#111',
        borderRadius: '14px',
        width: '100%',
        maxWidth: '520px',
        border: '1px dashed #333',
    },

    importFileIcon: {
        fontSize: '28px',
        flexShrink: 0,
    },

    importFileIconBox: {
        width: '44px',
        height: '52px',
        backgroundColor: '#0d0d0d',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '1px solid #333',
    },

    importFileName: {
        fontWeight: '600',
        color: '#fff',
        margin: 0,
        fontSize: '15px',
    },

    importFileSize: {
        color: '#7d8899',
        fontSize: '12px',
        margin: '2px 0 0 0',
    },

    importFileCheckmark: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: '#111',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '700',
        flexShrink: 0,
        border: '1px solid #444',
    },

    importRemoveFile: {
        background: 'transparent',
        border: 'none',
        color: '#9ca3af',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: 'auto',
        padding: '4px 6px',
        borderRadius: '4px',
        flexShrink: 0,
    },

    importError: {
        backgroundColor: '#09090d',
        border: '1px solid #3b3131',
        color: '#ff8b8b',
        padding: '14px 16px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
    },

    importPreview: {
        backgroundColor: '#07080e',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #16181f',
    },

    importPreviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '1px solid #16181f',
    },

    importPreviewTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#f8fafc',
    },

    importPreviewCount: {
        color: '#7d8899',
        fontSize: '13px',
    },

    importTableWrapper: {
        overflowX: 'auto',
        marginBottom: '20px',
        borderRadius: '12px',
        border: '1px solid #16181f',
    },

    importTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
    },

    importTableHeader: {
        backgroundColor: '#07080e',
        padding: '12px 14px',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '11px',
        color: '#7d8899',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderBottom: '1px solid #16181f',
        whiteSpace: 'nowrap',
    },

    importTableCell: {
        padding: '12px 14px',
        borderBottom: '1px solid #14161c',
        color: '#d1d5db',
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
        backgroundColor: '#fff',
        color: '#000',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
    },

    importClearButton: {
        padding: '10px 26px',
        backgroundColor: 'transparent',
        color: '#9ca3af',
        border: '1px solid #262a34',
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
        backgroundColor: '#111',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        borderRadius: '10px',
        border: '1px solid #333',
        flexShrink: 0,
        letterSpacing: '0.05em',
    },

    importInstructionsTitle: {
        margin: '0 0 4px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: '#fff',
    },

    importInstructionsSubtitle: {
        margin: 0,
        fontSize: '13px',
        color: '#666',
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
        padding: '12px 14px',
        backgroundColor: '#111',
        border: '1px solid #222',
        borderRadius: '8px',
        position: 'relative',
        cursor: 'default',
    },

    importFieldCardRequired: {
        borderColor: '#444',
        backgroundColor: '#161616',
    },

    importFieldIconCircle: {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    importFieldLabel: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#ccc',
        letterSpacing: '0.05em',
        flex: 1,
    },

    importFieldNum: {
        fontSize: '11px',
        color: '#444',
        fontWeight: '500',
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