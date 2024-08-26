import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Document, Page } from 'react-pdf';

const DocumentViewer = ({ open, onClose, file }) => {
    const isPdf = file.link.endsWith('.pdf');

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>{file.name}</DialogTitle>
            {console.log(file)}
            <DialogContent>
                {isPdf ? (
                    <Document file={file.link}>
                        <Page pageNumber={1} />
                    </Document>
                ) : (
                    
                    <img src={file.link} alt={file.name} style={{ width: '100%', height: 'auto' }} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DocumentViewer;
