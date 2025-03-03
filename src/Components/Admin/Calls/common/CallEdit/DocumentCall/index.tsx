import React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { addDocumentCall } from '@/Redux/Reducers/CallSlice';
import { showToast } from '@/utils';
import { useRouter } from 'next/navigation';


interface FileWithPreview extends File {
    preview?: string;
}

const DocumentCall = () => {
    const [file, setFile] = useState<FileWithPreview | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const { selectedCall } = useAppSelector((state) => state.call);
    const router = useRouter()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setFile(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            showToast("Veuillez sélectionner un fichier", "error");
            return;
        }
        
        if(selectedCall) { 
            try {
                const response = await dispatch(addDocumentCall({ callId: selectedCall?.id, document: file }));
                if (addDocumentCall.fulfilled.match(response)) {
                    showToast("Document ajouté avec succès", "success");
                    setFile(null);
                    setPreview(null);
                    router.push("/admin/call");
                } else {
                    showToast(response.payload.message, "error");
                }
            } catch (error) {
                showToast("Une erreur est survenue lors de l'ajout du document", "error");
            }
        }

        else {
            showToast("Veuillez sélectionner un appel", "error");
        }


    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center justify-content-center p-4">
                                    <div className="mb-4 text-center">
                                        <i className="fa fa-file-text-o fa-3x text-primary"></i>
                                        <h4 className="mt-3">Ajouter un document à l'appel</h4>
                                        <p className="text-muted">Formats acceptés: PDF, DOC, DOCX (Max 10MB)</p>
                                    </div>

                                    <div className="upload-zone w-100" style={{maxWidth: '500px'}}>
                                        <div className="border rounded-3 p-4 text-center bg-light">
                                            <input 
                                                type="file" 
                                                className="d-none" 
                                                id="documentInput"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                            <label 
                                                htmlFor="documentInput" 
                                                className="mb-0 cursor-pointer"
                                                style={{cursor: 'pointer'}}
                                            >
                                                <div className="d-flex flex-column align-items-center">
                                                    <i className="fa fa-cloud-upload fa-2x mb-2 text-primary"></i>
                                                    <span>Glissez et déposez votre fichier ici</span>
                                                    <span className="text-muted">ou</span>
                                                    <button 
                                                        type="button"
                                                        className="btn btn-primary mt-2"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Parcourir les fichiers
                                                    </button>
                                                </div>
                                            </label>
                                        </div>
                                        {file && (
                                            <div className="mt-3 text-center">
                                                <p className="mb-0">Fichier sélectionné: {file.name}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 w-100" style={{maxWidth: '500px'}}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                className="btn btn-primary w-100"
                                                onClick={handleUpload}
                                                disabled={!file}
                                            >
                                                Envoyer le document
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentCall;