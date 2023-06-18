import React, { useState } from 'react'
import { Document, Page } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { pdfjs } from "react-pdf";
import "./Help.scss";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

import manual from "./manual.pdf";
import { Breadcrumbs } from '@mui/material';

export default function Help() {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Ayuda" breadcrumbItem="Manual" />
                <div>
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <button
                        className="btn btn-light"
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(prev => prev - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-light"
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
                <div className="Example__container">
                    <div className='Example__container__document'>
                        <Document file={manual} onLoadSuccess={onDocumentLoadSuccess} >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    )
}
