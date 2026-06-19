import React, {useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { styles } from "../../styles/Importcsv";

const ImportingCsvData = () => {
    const navigate = useNavigate();
    const [csvFile, setCsvFile] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [importStatus, setImportStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const expectedHeaders = [
        'deviceName',
        'assetId', 
        'site',
        'location',
        'ipAddress',
        'hostname',
        'model',
        'serialNumber',
        'adapterType',
        'enabledStatus',
        'operationalStatus'
    ];

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if(files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if(file) {
            handleFile(file);
        }
    };

    const handleFile = (file) => {
        if(!file.name.endsWith('.csv')) {
            setErrorMessage('Please upload a CSV file');
            setImportStatus('error');
            return;
        }

        if(file.size > 5 * 1024 * 1024) {
            setErrorMessage('File size must be less than 5MB');
            setImportStatus('error');
            return;
        }

        setCsvFile(file);
        setErrorMessage('');
        setImportStatus('idle');
        parseCSVFile(file);
    };

    const parseCSVFile = (file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').filter(line => line.trim() !== '');

                if(lines.length < 2) {
                    setErrorMessage('CSV file must contain headers and at least one data row');
                    setImportStatus('error');
                    return;
                }

                const headers = lines[0].split(',').map(header => header.trim().replace(/["']/g, ''));

                const missingHeaders = expectedHeaders.filter(header => 
                    !headers.some(h => h.toLowerCase() === header.toLowerCase())
                );

                if(missingHeaders.length > 0) {
                    setErrorMessage(`Missing required columns: ${missingHeaders.join(', ')}`);
                    setImportStatus('error');
                    return;
                }

                const parsedData = [];
                for(let i=1; i<lines.length; i++) {
                    const values = lines[i].split(',').map(value => value.trim().replace(/["']/g, ''));
                    const row = {};

                    headers.forEach((header, index) => {
                        const cleanHeader = header.toLowerCase();
                        const expectedHeader = expectedHeaders.find(h => h.toLowerCase() === cleanHeader);
                        if (expectedHeader) {
                            row[expectedHeader] = values[index] || '';
                        }
                    });

                    if(!row.deviceName || !row.assetId || !row.site) {
                        setErrorMessage(`Row ${i} is missing required fields (deviceName, assetId, site)`);
                        setImportStatus('error');
                        return;
                    }

                    parsedData.push(row);
                }

                setCsvData(parsedData);
                setPreviewData(parsedData.slice(0, 5));
                setImportStatus('success');
            } catch(error) {
                setErrorMessage('Error parsing CSV file: ' + error.message);
                setImportStatus('error');
            }
        };

        reader.onerror = () => {
            setErrorMessage('Error reading file');
            setImportStatus('error');
        };

        reader.readAsText(file);
    };

    const handleImportData = () => {
        if(csvData.length === 0) {
            setErrorMessage('No data to import');
            setImportStatus('error');
            return;
        }

        setImportStatus('loading');

        try {

            const newDevices = csvData.map((row, index) => ({
                uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, () => 
                    (Math.random() * 16 | 0).toString(16)
                ),
                deviceName: row.deviceName || '',
                assetId: row.assetId || '',
                site: row.site || '',
                location: row.location || '',
                ipAddress: row.ipAddress || '',
                hostname: row.hostname || '',
                model: row.model || '',
                serialNumber: row.serialNumber || '',
                adapterType: row.adapterType || '',
                enabledStatus: row.enabledStatus || 'Enabled',
                operationalStatus: row.operationalStatus || 'Online',
                operationalDetails: 'Imported from CSV',
                lastSeen: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
                createdTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
                updatedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
            }));

            setImportStatus('success');

            setTimeout(() => {
                navigate('/admin/dashboard', {
                    state: {
                        importSuccess: true, 
                        importedCount: newDevices.length,
                        importedDevices: newDevices
                    }
                });
            }, 1500);

        } catch (error) {
            setErrorMessage('Error importing data: ' + error.message);
            setImportStatus('error');
        }
    };

    const handleCancel = () => {
        navigate('/admin/dashboard'); // chance for error
    };

    return (
        <div style={{ ...styles.importContent, padding: '30px', backgroundColor: '#05070f', borderRadius: '24px', boxShadow: '0 30px 80px rgba(0,0,0,0.24)' }}>
            <div style={styles.importInstructions}>
                <div style={styles.importInstructionsHeader}>
                    <span style={styles.importCsvBadge}>CSV</span>
                    <div>
                        <h3 style={styles.importInstructionsTitle}>CSV Format Requirements</h3>
                        <p style={styles.importInstructionsSubtitle}>Your CSV file must include the following columns</p>
                    </div>
                </div>

                <div style={styles.importFieldsGrid}>
                    {[
                        { icon: '🖥️', label: 'DEVICENAME', num: '01', required: true },
                        { icon: '🏷️', label: 'ASSET ID', num: '02', required: true },
                        { icon: '🏢', label: 'SITE', num: '03', required: true },
                        { icon: '📍', label: 'LOCATION', num: '04' },
                        { icon: '🌐', label: 'IP ADDRESS', num: '05' },
                        { icon: '🖧', label: 'HOSTNAME', num: '06' },
                        { icon: '📦', label: 'MODEL', num: '07' },
                        { icon: '🔢', label: 'SERIAL NUM', num: '08' },
                        { icon: '🔌', label: 'ADAPTER', num: '09' },
                        { icon: '✅', label: 'ENABLED STAT', num: '10' },
                        { icon: '📡', label: 'OPERATION STAT', num: '11' },
                    ].map((field) => (
                        <div key={field.num} style={{
                            ...styles.importFieldCard,
                            ...(field.required ? styles.importFieldCardRequired : {})
                        }}>
                            <div style={styles.importFieldIconCircle}>
                                <span style={{ fontSize: '16px' }}>{field.icon}</span>
                            </div>
                            <span style={styles.importFieldLabel}>{field.label}</span>
                            <span style={styles.importFieldNum}>{field.num}</span>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            const sampleHeaders = expectedHeaders.join(',');
                            const sampleData = 'PDU-B-04-D,AST-009415,Site-A (Frankfurt, Germany),Row 9, Rack 5, U 10,10.40.24.47,pdu-b04d.datacenter.local,Raritan PX3-5490R,C8174T00933,XeroX Expansion Module,Enabled,Online';
                            const csvContent = `${sampleHeaders}\n${sampleData}`;
                            const blob = new Blob([csvContent], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'sample_devices.csv';
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }}
                        style={styles.importSampleLink}
                    >
                        📥 Download Sample CSV
                    </a>
                </div>
            </div>

            <div
                style={{
                    ...styles.importDropZone,
                    ...(isDragging ? styles.importDropZoneDragging : {}),
                    ...(csvFile ? styles.importDropZoneFileLoaded : {})
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {csvFile ? (
                    <div style={styles.importFileInfo}>
                        <div style={styles.importFileIconBox}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>CSV</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={styles.importFileName}>{csvFile.name}</p>
                            <p style={styles.importFileSize}>
                                {(csvFile.size / 1024).toFixed(2)} KB
                                {csvData.length > 0 && <span> • {expectedHeaders.length} columns • {csvData.length} rows</span>}
                            </p>
                        </div>
                        <div style={styles.importFileCheckmark}>✓</div>
                        <button
                            onClick={() => { setCsvFile(null); setCsvData([]); setPreviewData([]); setImportStatus('idle'); }}
                            style={styles.importRemoveFile}
                        >✕</button>
                    </div>
                ) : (
                    <>
                        <div style={styles.importDropIconCircle}>
                            <span style={{ fontSize: '28px' }}>☁️</span>
                        </div>
                        <p style={styles.importDropText}>Drag & drop your CSV file here</p>
                        <p style={styles.importDropSubtext}>or click to browse files</p>
                        <label style={styles.importBrowseButton}>
                            Browse Files
                            <input type="file" accept=".csv" onChange={handleFileSelect} style={styles.importFileInput} />
                        </label>
                        <div style={styles.importDropHints}>
                            <span>🔒 Secure upload</span>
                            <span style={styles.importDropHintDot}>•</span>
                            <span>CSV only</span>
                            <span style={styles.importDropHintDot}>•</span>
                            <span>Max 5MB</span>
                        </div>
                    </>
                )}
            </div>

            {errorMessage && (
                <div style={styles.importError}>
                    <span>⚠️</span> {errorMessage}
                </div>
            )}

            {importStatus === 'success' && csvData.length > 0 && (
                <div style={styles.importPreview}>
                    <div style={styles.importPreviewHeader}>
                        <h4 style={styles.importPreviewTitle}>Preview Data ({csvData.length} rows)</h4>
                        <span style={styles.importPreviewCount}>
                            Showing first {Math.min(5, csvData.length)} rows
                        </span>
                    </div>

                    <div style={styles.importTableWrapper}>
                        <table style={styles.importTable}>
                            <thead>
                                <tr>
                                    {expectedHeaders.map((header, index) => (
                                        <th key={index} style={styles.importTableHeader}>
                                            {header}
                                            {['deviceName', 'assetId', 'site'].includes(header) && ' *'}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                    {expectedHeaders.map((header, colIndex) => (
                                        <td key={colIndex} style={styles.importTableCell}>
                                        {row[header] || '-'}
                                        </td>
                                    ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={styles.importPreviewActions}>
                        <button
                            onClick={handleImportData}
                            style={styles.importConfirmButton}
                            disabled={importStatus === 'loading'}
                        >
                            {importStatus === 'loading' ? 'Importing...' : `Import ${csvData.length} Devices`}
                        </button>

                        <button
                            onClick={() => {
                                setCsvFile(null);
                                setCsvData([]);
                                setPreviewData([]);
                                setImportStatus('idle');
                            }}
                            style={styles.importClearButton}
                        >
                            Clear Data
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImportingCsvData;