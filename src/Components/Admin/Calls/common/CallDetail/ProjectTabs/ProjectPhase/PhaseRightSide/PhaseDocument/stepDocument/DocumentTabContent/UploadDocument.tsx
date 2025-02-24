import React, { useState } from 'react';

type UploadDocumentProps = {
    documentId: string;
    onUpload: (file: File) => void;
};

const UploadDocument: React.FC<UploadDocumentProps> = ({ documentId, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded"
            />
            <button
                onClick={handleUploadClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!selectedFile}
            >
                Charger
            </button>
        </div>
    );
};

export default UploadDocument;
