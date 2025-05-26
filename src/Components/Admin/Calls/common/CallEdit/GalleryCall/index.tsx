import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchCallById, deleteImageGallery, addCallGallery } from "@/Redux/Reducers/CallSlice";
import {
    Container, Row, Col, Card, Button, Spinner, Alert, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { imageBaseUrl } from "@/Services/axios";
import { FiTrash2, FiZoomIn, FiUploadCloud, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSwipeable } from 'react-swipeable';
import './GalleryCallStyle.scss';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

const GalleryCall = () => {
    const dispatch = useAppDispatch();
    const { selectedCall, statusCall, error } = useAppSelector(state => state.call);
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const uploadButtonRef = useRef(null);

    useEffect(() => {
        if (selectedCall?.id) {
            dispatch(fetchCallById(selectedCall.id));
        }
    }, [dispatch, selectedCall?.id]);

    const handleDeleteImage = (imageId: string) => {
        dispatch(deleteImageGallery({ imageId }));
        setDeleteModal(false);
        setSelectedImage(null);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file.file);
        });
        if (selectedCall?.id) {
            await dispatch(addCallGallery({ id: selectedCall.id, imageFiles: formData }));
            setFiles([]);
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
        trackMouse: true
    });

    return (
        <Container fluid className="gallery-container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="mb-1">{selectedCall?.name}</h2>
                    <p className="text-muted">Gestion de la galerie d'appel</p>
                </div>
                <Button color="primary" onClick={() => uploadButtonRef.current?.click()}>
                    <FiUploadCloud className="me-2" /> Ajouter des photos
                </Button>
            </div>


            <Card className="upload-card shadow-sm mb-5">
                <div className="p-4">
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={10}
                        maxFileSize="5MB"
                        acceptedFileTypes={['image/*']}
                        labelIdle={
                            <div className="text-center">
                                <FiUploadCloud size="24" className="mb-2" />
                                <div>Glissez-déposez ou <span className="text-primary">parcourir</span></div>
                                <div className="text-muted small mt-1">Formats supportés : JPEG, PNG</div>
                            </div>
                        }

                        stylePanelAspectRatio={0.5}
                        imagePreviewHeight={200}
                        className="custom-filepond"
                        ref={uploadButtonRef}
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
            {error && <Alert color="danger" className="mb-4">{error}</Alert>}

            {selectedCall?.galery?.length ? (
                <Row className="gallery-grid">
                    {selectedCall.galery.map((image, index) => (
                        <Col xl={2} lg={3} md={4} sm={6} className="mb-4" key={image.id}>
                            <div className="gallery-item">
                                <img
                                    src={`${imageBaseUrl}/calls/${image.image}`}
                                    alt={`Image ${image.id}`}
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
                                        onClick={() => {
                                            setSelectedImage(image);
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
                <Alert color="info" className="text-center py-5">
                    Aucune image dans la galerie. Commencez par en ajouter !
                </Alert>
            )}

            {/* Modal de suppression */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                <ModalHeader toggle={() => setDeleteModal(false)}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir supprimer définitivement cette image ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setDeleteModal(false)}>Annuler</Button>
                    <Button color="danger" onClick={() => handleDeleteImage(selectedImage?.id)}>Supprimer</Button>
                </ModalFooter>
            </Modal>

            {/* Modal de preview */}
            <Modal
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
