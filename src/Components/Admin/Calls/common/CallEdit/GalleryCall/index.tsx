import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {fetchCallById, deleteImageGallery, addCallGallery, updateGalleryPreview, removeGalleryPreview} from "@/Redux/Reducers/CallSlice";
import {Container, Row, Col, Card, Button, Spinner, Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { imageBaseUrl } from "@/Services/axios";
import {FiTrash2, FiZoomIn, FiUploadCloud, FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import { useSwipeable } from 'react-swipeable';
import './GalleryCallStyle.scss';
import { GalleryType } from '@/Types/Call/CallType';
import type { FilePond as FilePondInstance, FilePondInitialFile } from 'filepond';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation
);

const GalleryCall: React.FC = () => {

    const dispatch = useAppDispatch();
    const { selectedCall, statusCall, error } = useAppSelector((state) => state.call);
    // const [files, setFiles] = useState<(FilePondInitialFile | Blob | File | string)[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryType | null>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<GalleryType | null>(null);
    const uploadButtonRef = useRef<HTMLButtonElement | null>(null);
    const filePondRef = useRef<FilePondInstance | null>(null);

    useEffect(() => {
        if (selectedCall?.id) {
            dispatch(fetchCallById(selectedCall.id));
        }
    }, [dispatch, selectedCall?.id]);

    // const handleUpload = async () => {
    //     if (!selectedCall?.id) return;
    //
    //     const newImagesPreview = files.map((file) => ({
    //         //@ts-ignore
    //         id: `temp-${file.filename}`,
    //         // @ts-ignore
    //         image: URL.createObjectURL(file.file as Blob),
    //         createdAt: new Date().toISOString(),
    //     }));
    //
    //     dispatch(
    //         updateGalleryPreview({
    //             callId: selectedCall.id,
    //             //@ts-ignore
    //             images: newImagesPreview,
    //         })
    //     );
    //
    //     try {
    //         await dispatch(
    //             addCallGallery({
    //                 id: selectedCall.id,
    //                 // @ts-ignore
    //                 imageFiles: files.map((f) => f.file as File),
    //             })
    //         ).unwrap();
    //         setFiles([]);
    //     } catch (error) {
    //         dispatch(
    //             removeGalleryPreview({
    //                 callId: selectedCall.id,
    //                 tempIds: newImagesPreview.map((img) => img.id),
    //             })
    //         );
    //     }
    // };

    const handleUpload = async () => {
        if (!selectedCall?.id) return;

        const newImagesPreview = files.map((file) => ({
            // id: `temp-${file.name}`,
            // image: URL.createObjectURL(file),
            id: `temp-${file.name}`,
            image: URL.createObjectURL(file),
            createdAt: new Date().toISOString(),
        }));

        dispatch(
            updateGalleryPreview({
                callId: selectedCall.id,
                //@ts-ignore
                images: newImagesPreview,
            })
        );

        try {
            await dispatch(
                addCallGallery({
                    id: selectedCall.id,
                    imageFiles: files,
                })
            ).unwrap();

            await dispatch(fetchCallById(selectedCall.id));

            setFiles([]);
        } catch (error) {
            dispatch(
                removeGalleryPreview({
                    callId: selectedCall.id,
                    tempIds: newImagesPreview.map((img) => img.id),
                })
            );
        }
    };

    const handleSlide = (direction: 'prev' | 'next') => {
        if (isTransitioning || !selectedCall?.galery?.length) return;
        setIsTransitioning(true);
        const total = selectedCall.galery.length;
        const newIndex =
            direction === 'prev'
                ? (currentImageIndex - 1 + total) % total
                : (currentImageIndex + 1) % total;
        setCurrentImageIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSlide('next'),
        onSwipedRight: () => handleSlide('prev'),
        trackMouse: true,
    });

    const handleAddPhotoClick = () => {
        filePondRef.current?.browse();
    };

    const handleDeleteConfirm = () => {
        if (imageToDelete?.id) {
            dispatch(deleteImageGallery({ imageId: imageToDelete.id }));
            setDeleteModal(false);
            setImageToDelete(null);
            setSelectedImage(null);
        }
    };


    return (
        <Container fluid className="gallery-container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="mb-1">{selectedCall?.name}</h2>
                    <p className="text-muted">Gestion de la galerie d'appel</p>
                </div>
                <Button color="primary" onClick={handleAddPhotoClick} className="d-flex align-items-center">
                    <FiUploadCloud className="me-2" /> Ajouter des photos
                </Button>
            </div>


            <Card className="upload-card shadow-sm mb-5">
                <div className="p-4">
                    <FilePond
                        files={files}
                        onupdatefiles={(fileItems) => {
                            // @ts-ignore
                            setFiles(fileItems.map(fileItem => fileItem.file));
                        }}
                        allowMultiple={true}
                        maxFiles={10}
                        maxFileSize="5MB"
                        acceptedFileTypes={['image/*']}
                        labelIdle='
                                    <div class="custom-label-idle">
                                      <svg class="upload-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                      <div class="instruction-text">Glissez vos fichiers ici ou <span class="browse-text">parcourir</span></div>
                                      <div class="file-info">Formats supportés : JPEG, PNG<br/>Taille max : 5MB</div>
                                    </div>
                                  '
                        stylePanelAspectRatio={"0.5"}
                        imagePreviewHeight={200}
                        className="custom-filepond"
                        //@ts-ignore
                        ref={filePondRef}
                    />

                    {files.length > 0 && (
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                                {files.length} fichier{files.length > 1 ? 's' : ''} sélectionné{files.length > 1 ? 's' : ''}
                            </div>
                            <Button
                                color="primary"
                                onClick={handleUpload}
                                disabled={statusCall === 'loading'}
                            >
                                {statusCall === 'loading' ? <Spinner size="sm" className="me-2" /> : <FiUploadCloud className="me-2" />}
                                Téléverser
                            </Button>
                        </div>
                    )}
                </div>
            </Card>


            <h4 className="mb-4">Galerie ({selectedCall?.galery?.length || 0})</h4>
            {error && <Alert color="danger" className="mb-4">{error.message}</Alert>}
            {
                selectedCall?.galery?.length ? (
                    <Row className="gallery-grid">
                    {selectedCall.galery.map((image, index) => (
                        <Col xl={2} lg={3} md={4} sm={6} className="mb-4" key={image.id}>
                            <div className="gallery-item">
                                <img
                                    src={`${imageBaseUrl}/calls/${image.image}`}
                                    alt={`Image ${image.id}`}
                                    data-filename={image.image}
                                    className="gallery-image"
                                    loading="lazy"
                                    onClick={() => {
                                        setCurrentImageIndex(index);
                                        setSelectedImage(image);
                                    }}
                                />
                                <div className="gallery-overlay">
                                    <Button
                                    color="danger"
                                    className="overlay-btn"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        setImageToDelete(image);
                                        setDeleteModal(true);
                                    }}
                                    >
                                        <FiTrash2 />
                                    </Button>
                                    <Button
                                        color="info"
                                        className="overlay-btn"
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            setSelectedImage(image);
                                        }}
                                    >
                                        <FiZoomIn />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                    <div color="info" className="text-center py-5 rounded bg-light txt-dark">
                        Aucune image dans la galerie. Commencez par en ajouter !
                    </div>
            )}


            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                <ModalHeader toggle={() => setDeleteModal(false)}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir supprimer définitivement cette image ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setDeleteModal(false)}>Annuler</Button>
                    <Button color="danger" onClick={handleDeleteConfirm}>Supprimer</Button>
                </ModalFooter>
            </Modal>


            <
                //@ts-ignore
                Modal
                isOpen={!!selectedImage}
                toggle={() => {
                    setSelectedImage(null);
                    setCurrentImageIndex(0);
                }}
                size="xl"
                className="image-preview-modal"
                {...swipeHandlers}
            >
                <ModalBody
                    className="text-center position-relative p-0"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') handleSlide('prev');
                        if (e.key === 'ArrowRight') handleSlide('next');
                    }}
                    tabIndex={0}
                >
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <Button
                            color="light"
                            className="position-absolute start-0 top-50 translate-middle-y ms-3 slider-btn"
                            onClick={() => handleSlide('prev')}
                        >
                            <FiChevronLeft size={32} />
                        </Button>

                        <div className="image-slide-container">
                            <img
                                src={
                                    selectedCall?.galery?.[currentImageIndex]
                                        ? `${imageBaseUrl}/calls/${selectedCall.galery[currentImageIndex].image}`
                                        : ''
                                }
                                alt="Preview"
                                className={`img-fluid slide-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
                                style={{ maxHeight: '80vh' }}
                            />
                        </div>

                        <Button
                            color="light"
                            className="position-absolute end-0 top-50 translate-middle-y me-3 slider-btn"
                            onClick={() => handleSlide('next')}
                        >
                            <FiChevronRight size={32} />
                        </Button>
                    </div>

                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                        <div className="badge bg-dark opacity-75">
                            {currentImageIndex + 1} / {selectedCall?.galery?.length}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default GalleryCall;