import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

const DriveHeader = ({ path, onNavigate, onUpload, onCreateFolder, uploading }) => {
    const [folderName, setFolderName] = useState('');
    const {authUser} = useAuthContext();

    const isUserAuthorized = authUser?.userID ? true : false;

    const handleCreate = () => {
        console.log("HEY");
        if (!folderName.trim()) return;
        onCreateFolder(folderName);
        setFolderName('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-6">
            <h1 className="text-2xl font-bold text-base-content text-primary">Classroom Drive</h1>
            
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs p-2 rounded-lg shadow-sm border border-base-300">
                <ul>
                    <li onClick={() => onNavigate(null)}>
                        <a className="cursor-pointer">My Drive</a>
                    </li>
                    {path.map((folder, index) => (
                        <li key={folder._id} onClick={() => onNavigate(folder)}>
                            <a className="cursor-pointer">{folder.name}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="New folder name..." 
                        className="input input-sm input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    />
                    <button 
                        className="btn btn-sm btn-primary gap-2"
                        onClick={handleCreate}
                        disabled={!isUserAuthorized}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="file" 
                        id="fileUpload" 
                        className="hidden" 
                        onChange={handleFileChange}
                        disabled={uploading || !isUserAuthorized}
                    />
                    <label 
                        htmlFor="fileUpload"
                        className={`btn btn-sm bg-white border-dotted border-[#570DF8] font-medium text-black btn-secondary gap-2 ${uploading ? 'btn-disabled opacity-50' : ''} cursor-pointer`}
                    >
                        {uploading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        )}
                        {uploading ? 'Uploading...' : 'Upload'}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DriveHeader;