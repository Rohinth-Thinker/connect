import React from 'react';

const PreviewModal = ({ file, onClose }) => {
    if (!file) return null;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-5xl max-h-[90vh] flex flex-col p-6 rounded-2xl bg-base-100 border border-base-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg truncate pr-8">{file.name}</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                <div className="flex-1 overflow-auto flex items-center justify-center bg-black/5 rounded-xl border border-base-200">
                    {isImage ? (
                        <img 
                            src={file.url} 
                            alt={file.name} 
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : isVideo ? (
                        <video 
                            src={file.url} 
                            controls 
                            className="max-h-full max-w-full"
                            style={{ maxHeight: 'calc(90vh - 150px)' }}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-20">
                            <div className="text-6xl text-base-content/20">
                                {file.type === 'application/pdf' ? '📕' : '📁'}
                            </div>
                            <p className="text-base-content/60 font-medium">Preview not available for this file type</p>
                            <a 
                                href={file.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                            >
                                Open File
                            </a>
                        </div>
                    )}
                </div>

                <div className="modal-action mt-4 border-t pt-4">
                    <a 
                        href={file.url} 
                        download={file.name}
                        className="btn btn-sm btn-outline gap-2"
                        onClick={(e) => {
                            // Some cloud storage might block direct download, so open in new tab as fallback
                            if (isVideo || isImage) {
                                window.open(file.url, '_blank');
                                e.preventDefault();
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0L8 8m4-4v12" />
                        </svg>
                        Download
                    </a>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
        </div>
    );
};

export default PreviewModal;