import React, { useState } from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col, Spinner } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalDeleteProject, deleteProject } from "@/Redux/Reducers/projectSlice/projectSlice";
import { toast, ToastContainer, Flip } from "react-toastify";
import {activitySuccessMessageDelete, activityErrorMessageDelete, activityWarningDeleteMessage, deleteBtnModal, closeModal, activityTitleDeleteModal} from "@/Constant";

const DeleteProjectModal = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalDeleteProject, selectedProject, originalProjectData } = useAppSelector((state) => state.project);
    const selectedProjectData = originalProjectData?.find((item: { id: any; }) => item.id === selectedProject?.id);

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (selectedProjectData && selectedProjectData.id !== undefined) {
            setIsLoading(true);
            try {
                await dispatch(deleteProject(selectedProjectData.id)).unwrap();
                dispatch(setModalDeleteProject({ isOpen: false, project: null }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{activitySuccessMessageDelete}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } catch (error) {
                toast.error(
                    <p className="text-white tx-16 mb-0">{activityErrorMessageDelete}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalDeleteProject}
                    toggle={() => dispatch(setModalDeleteProject({ isOpen: false, project: null }))}
                    title={activityTitleDeleteModal}
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            {activityWarningDeleteMessage}
                        </h4>
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteProject({ isOpen: false, project: null }))}
                                disabled={isLoading}
                            >
                                {closeModal}
                            </Button>
                            <Button color="danger" onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? <> 'Suppression '<Spinner size="sm" color="light" /></> : deleteBtnModal}
                            </Button>
                        </div>
                    </div>
                </CommonModal>
                <ToastContainer />
            </CardBody>
        </Col>
    );
};

export default DeleteProjectModal;




