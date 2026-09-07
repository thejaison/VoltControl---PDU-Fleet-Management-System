export const styles = {
    importContainer: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        background: '#f3f5f0',
        color: '#12241b',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },

    importHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e4e9e1'
    },

    importTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#12241b',
        margin: 0
    },

    importCloseButton: {
        background: 'transparent',
        border: 'none',
        color: '#697a70',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'all 0.2s',
    },

    importContent: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 4px 20px rgba(12, 52, 39, 0.04)',
        border: '1px solid #e4e9e1',
        animation: 'fadeInScale 0.6s ease-out forwards',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    },

    importInstructions: {
        backgroundColor: '#f8faf6',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid #e4e9e1',
        boxShadow: 'none',
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
        color: '#0c3427',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '600',
        padding: '10px 18px',
        backgroundColor: '#ebefe8',
        borderRadius: '16px',
        border: '1px solid #dbe2d8',
        transition: 'all 0.2s ease',
        color: '#0c3427',
    },

    importDropZone: {
        border: '2px dashed #c0cbbd',
        borderRadius: '24px',
        padding: '40px 24px',
        textAlign: 'center',
        backgroundColor: '#f8faf6',
        transition: 'all 0.3s ease',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'none',
    },

    importDropZoneDragging: {
        borderColor: '#0c3427',
        backgroundColor: 'rgba(12, 52, 39, 0.04)',
        transform: 'translateY(-1px)',
    },

    importDropZoneFileLoaded: {
        borderColor: '#22865d',
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
        backgroundColor: '#ebefe8',
        border: '1px solid #dbe2d8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
        color: '#0c3427',
    },

    importDropText: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#12241b',
        margin: '0',
    },

    importDropSubtext: {
        color: '#697a70',
        margin: '4px 0',
        fontSize: '13px',
    },

    importBrowseButton: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 24px',
        backgroundColor: '#0c3427',
        color: '#ffffff',
        borderRadius: '16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '12px',
        border: 'none',
        boxShadow: '0 4px 14px rgba(12, 52, 39, 0.2)',
    },

    importFileInput: {
        display: 'none'
    },

    importFileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '18px 20px',
        backgroundColor: '#f8faf6',
        borderRadius: '18px',
        width: '100%',
        maxWidth: '560px',
        border: '1px solid #e4e9e1',
        boxShadow: '0 2px 8px rgba(12, 52, 39, 0.04)',
    },

    importFileIcon: {
        fontSize: '28px',
        flexShrink: 0,
    },

    importFileIconBox: {
        width: '44px',
        height: '52px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '1px solid #e5e7eb',
    
  },

    importFileName: {
        fontWeight: '600',
        color: '#12241b',
        margin: 0,
        fontSize: '15px',
    },

    importFileSize: {
        color: '#697a70',
        fontSize: '12px',
        margin: '2px 0 0 0',
    },

    importFileCheckmark: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: '#22865d',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '700',
        flexShrink: 0,
        border: '1px solid #22865d',
    },

    importRemoveFile: {
        background: '#ebefe8',
        border: '1px solid #dbe2d8',
        color: '#697a70',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: 'auto',
        padding: '6px 8px',
        borderRadius: '12px',
        flexShrink: 0,
        transition: 'all 0.2s ease',
    },

    importError: {
        backgroundColor: 'rgba(217, 83, 79, 0.08)',
        border: '1px solid rgba(217, 83, 79, 0.18)',
        color: '#c9302c',
        padding: '14px 16px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
    },

    importPreview: {
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid #e4e9e1',
        boxShadow: '0 4px 20px rgba(12, 52, 39, 0.04)',
    },

    importPreviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '1px solid #e4e9e1',
    },

    importPreviewTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#12241b',
    },

    importPreviewCount: {
        color: '#697a70',
        fontSize: '13px',
    },

    importTableWrapper: {
        overflowX: 'auto',
        marginBottom: '20px',
        borderRadius: '16px',
        border: '1px solid #e4e9e1',
    },

    importTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
    },

    importTableHeader: {
        backgroundColor: '#f8faf6',
        padding: '12px 14px',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: '11px',
        color: '#697a70',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderBottom: '1px solid #e4e9e1',
        whiteSpace: 'nowrap',
    },

    importTableCell: {
        padding: '12px 14px',
        borderBottom: '1px solid #e4e9e1',
        color: '#12241b',
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
        padding: '10px 24px',
        backgroundColor: '#0c3427',
        color: '#ffffff',
        border: 'none',
        borderRadius: '16px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(12, 52, 39, 0.2)',
    },

    importClearButton: {
        padding: '10px 24px',
        backgroundColor: '#ebefe8',
        color: '#12241b',
        border: '1px solid #dbe2d8',
        borderRadius: '16px',
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
        backgroundColor: '#ebefe8',
        color: '#0c3427',
        fontWeight: '700',
        fontSize: '13px',
        borderRadius: '16px',
        border: '1px solid #dbe2d8',
        flexShrink: 0,
        letterSpacing: '0.05em',
        boxShadow: '0 2px 8px rgba(12, 52, 39, 0.04)',
    },

    importInstructionsTitle: {
        margin: '0 0 4px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: '#12241b',
    },

    importInstructionsSubtitle: {
        margin: 0,
        fontSize: '13px',
        color: '#697a70',
    },

    importFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '10px',
    },

    importFieldCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 18px',
        backgroundColor: '#ffffff',
        border: '1px solid #e4e9e1',
        borderRadius: '18px',
        position: 'relative',
        cursor: 'default',
        boxShadow: '0 2px 8px rgba(12, 52, 39, 0.04)',
    },

    importFieldCardRequired: {
        borderColor: '#dbe2d8',
        backgroundColor: '#f8faf6',
    },

    importFieldIconCircle: {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        backgroundColor: '#ebefe8',
        border: '1px solid #dbe2d8',
        color: '#0c3427',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    importFieldLabel: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#12241b',
        letterSpacing: '0.08em',
        flex: 1,
    },

    importFieldNum: {
        fontSize: '11px',
        color: '#22865d',
        fontWeight: '600',
    },

    importDropHints: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        fontSize: '12px',
        color: '#697a70',
        backgroundColor: '#ebefe8',
        padding: '6px 16px',
        borderRadius: '20px',
        border: '1px solid #dbe2d8',
    },

    importDropHintDot: {
        color: '#22865d',
    },
};