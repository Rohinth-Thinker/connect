import React, { useState, useEffect } from 'react';
import DriveHeader from './components/DriveHeader';
import DriveGrid from './components/DriveGrid';
import PreviewModal from './components/PreviewModal';

const ClassroomDrive = () => {
    const [currentFolder, setCurrentFolder] = useState(null);
    const [path, setPath] = useState([]);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);

    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || 'durdslrun';
    const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || 'connect_classroom_files';

    const fetchContent = async (folderId) => {
        setLoading(true);
        try {
            const id = folderId || 'root';
            const response = await fetch(`/api/drive?parentId=${id}`);
            if (!response.ok) throw new Error('Failed to fetch content');
            const data = await response.json();
            setFolders(data.folders);
            setFiles(data.files);
        } catch (error) {
            console.error('Error fetching drive content:', error);
            // Fallback for demo if backend not yet ready/connected
            if (process.env.NODE_ENV === 'development') {
                console.warn('Using empty fallback due to fetch error');
                setFolders([]);
                setFiles([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent(currentFolder?._id);
    }, [currentFolder]);

    const handleNavigate = (folder) => {
        if (folder === null) {
            setCurrentFolder(null);
            setPath([]);
        } else {
            setCurrentFolder(folder);
            // Update path: if folder already in path, truncate path to that folder
            const index = path.findIndex(p => p._id === folder._id);
            if (index !== -1) {
                setPath(path.slice(0, index + 1));
            } else {
                setPath([...path, folder]);
            }
        }
    };

    const handleCreateFolder = async (name) => {
        try {
            // Client-side duplicate check
            if (folders.some(f => f.name.toLowerCase() === name.toLowerCase())) {
                alert('A folder with this name already exists in this directory.');
                return;
            }

            const response = await fetch('/api/drive/folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    parentId: currentFolder?._id
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to create folder');
            }

            fetchContent(currentFolder?._id);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpload = async (file) => {
        if (uploading) return;

        // Client-side duplicate check
        if (files.some(f => f.name === file.name)) {
            alert(`A file named "${file.name}" already exists in this folder.`);
            return;
        }

        setUploading(true);
        try {
            // 1. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryRes.ok) throw new Error('Cloudinary upload failed');
            const cloudinaryData = await cloudinaryRes.json();

            // 2. Save metadata to Backend
            const backendRes = await fetch('/api/drive/file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: file.name,
                    url: cloudinaryData.secure_url,
                    public_id: cloudinaryData.public_id,
                    type: file.type,
                    parentId: currentFolder?._id
                })
            });

            if (!backendRes.ok) throw new Error('Failed to save file metadata');

            fetchContent(currentFolder?._id);
        } catch (error) {
            console.error('Upload error:', error);
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteFile = async (file) => {
        if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return;

        try {
            const response = await fetch(`/api/drive/file/${file._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete file');

            fetchContent(currentFolder?._id);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteFolder = async (folder) => {
        if (!confirm(`Are you sure you want to delete "${folder.name}" and all its contents?`)) return;

        try {
            const response = await fetch(`/api/drive/folder/${folder._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete folder');

            fetchContent(currentFolder?._id);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-base-200/30">
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
                <DriveHeader
                    path={path}
                    onNavigate={handleNavigate}
                    onUpload={handleUpload}
                    onCreateFolder={handleCreateFolder}
                    uploading={uploading}
                />

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <span className="loading loading-ring loading-lg text-primary"></span>
                        <p className="text-base-content/60 animate-pulse">Loading your drive...</p>
                    </div>
                ) : (
                    <DriveGrid
                        folders={folders}
                        files={files}
                        onOpenFolder={handleNavigate}
                        onOpenFile={(file) => setPreviewFile(file)}
                        onDeleteFolder={handleDeleteFolder}
                        onDeleteFile={handleDeleteFile}
                    />
                )}

                {previewFile && (
                    <PreviewModal
                        file={previewFile}
                        onClose={() => setPreviewFile(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default ClassroomDrive;