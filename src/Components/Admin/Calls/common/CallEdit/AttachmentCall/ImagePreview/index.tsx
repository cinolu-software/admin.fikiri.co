import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast, Flip,  } from "react-toastify";
import {updatedCoverCall} from "@/Redux/Reducers/CallSlice";
import { CardBody, Col, Spinner } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import { useRouter } from "next/navigation";
import {showToast} from "@/utils";


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ImagePreview = () => {

    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedCall } = useAppSelector(state => state.call);
    const router = useRouter();

    const handleUpdateImage = () => {
        if (files.length === 0) {
            showToast("Veuillez sélectionner une image.", "error");
            return;
        }

        const imageFile = files[0].file as File;

        setIsLoading(true);
        if(selectedCall &&  selectedCall.id) {

            try {
                dispatch(updatedCoverCall({ id: selectedCall?.id, imageFile: imageFile }));
                showToast("Ajout de l'image de couverture effectué avec succès", "success");
                setIsLoading(false);
                router.push("/admin/call");
            }catch(err) {
                showToast("Erreur survenue lors de l'ajout de l'image de couverture");
                setIsLoading(false);
            }
        }
    };

    return (
        <Col lg="12">
            <CardBody>
                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={setFiles}
                    labelIdle='<span class="filepond--label-action text-danger text-decoration-none">Déposez le fichier ici</span>'
                />
                <button className="btn btn-outline-primary" onClick={handleUpdateImage} disabled={isLoading}>
                    {isLoading ?
                            (
                                <><span>Mise à jour en cour</span><Spinner size="sm" color="light" /></>
                            )
                        :
                        "Mettre à jour l'image de couverture"
                    }
                </button>
            </CardBody>
        </Col>
    );
};

export default ImagePreview;

