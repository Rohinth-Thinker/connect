import React from 'react';

const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type === 'application/pdf') return '📕';
    if (type.includes('zip') || type.includes('rar')) return '🗜️';
    if (type.includes('word') || type.includes('text')) return '📄';
    return '📁';
};

const DriveGrid = ({ folders, files, onOpenFolder, onOpenFile, onDeleteFolder, onDeleteFile }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10">
            {/* Folders */}
            {folders.map((folder) => (
                <div 
                    key={folder._id} 
                    className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group relative"
                >
                    <div className="card-body p-4 flex flex-row items-center gap-3 cursor-pointer" onClick={() => onOpenFolder(folder)}>
                        <span className="text-3xl">📁</span>
                        <span className="font-medium truncate text-sm">{folder.name}</span>
                    </div>
                    
                    {/* Menu */}
                    <div className="dropdown dropdown-end absolute top-2 right-2">
                        <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V6m0 6V6m0 6V12m0 6V18"></path></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                            <li><a className="text-error text-xs" onClick={() => onDeleteFolder(folder)}>Delete</a></li>
                        </ul>
                    </div>
                </div>
            ))}

            {/* Files */}
            {files.map((file) => (
                <div 
                    key={file._id} 
                    className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group relative"
                >
                    <div className="card-body p-4 flex flex-col items-center gap-2 cursor-pointer" onClick={() => onOpenFile(file)}>
                        <div className="text-3xl h-12 flex items-center justify-center">
                            {getFileIcon(file.type)}
                        </div>
                        <span className="font-medium truncate text-sm w-full text-center">{file.name}</span>
                    </div>

                    {/* Menu */}
                    <div className="dropdown dropdown-end absolute top-2 right-2">
                        <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V6m0 6V6m0 6V12m0 6V18"></path></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                            <li><a className="text-error text-xs" onClick={() => onDeleteFile(file)}>Delete</a></li>
                        </ul>
                    </div>
                </div>
            ))}

            {folders.length === 0 && files.length === 0 && (
                <div className="col-span-full h-64 flex flex-col items-center justify-center text-base-content/50 opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <p>Folder is empty</p>
                </div>
            )}
        </div>
    );
};

export default DriveGrid;