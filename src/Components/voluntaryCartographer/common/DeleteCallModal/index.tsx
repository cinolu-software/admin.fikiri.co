import React, { useState } from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col, Spinner } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalDeleteCall, deleteCall} from "@/Redux/Reducers/CallSlice";
import { toast, ToastContainer, Flip } from "react-toastify";
import {callSuccessMessageDelete, callErrorMessageDelete, callWarningDeleteMessage, deleteBtnModal, closeModal, callTitleDeleteModal} from "@/Constant";

const DeleteCallModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalDeleteCall, selectedCall, callData} = useAppSelector(state => state.call);
    const selectedCallData = callData?.find((item: { id: any; }) => item.id === selectedCall?.id);

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (selectedCallData && selectedCallData.id !== null ) {
            setIsLoading(true);
            try {
                await dispatch(deleteCall(selectedCallData.id)).unwrap();
                dispatch(setModalDeleteCall({ isOpen: false, call: null }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{callSuccessMessageDelete}</p>,
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
                    <p className="text-white tx-16 mb-0">{callErrorMessageDelete}</p>,
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
                    isOpen={isOpenModalDeleteCall}
                    toggle={() => dispatch(setModalDeleteCall({ isOpen: false, call: null }))}
                    title={callTitleDeleteModal}
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            {callWarningDeleteMessage}
                        </h4>
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteCall({ isOpen: false, call: null }))}
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

export default DeleteCallModal;




