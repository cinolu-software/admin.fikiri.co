import React, {useState} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {Flip, toast} from "react-toastify";
import {createOrganization, setModalCreateOrganization} from "@/Redux/Reducers/OrganizationSlice";



const CreateOrganizationModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateOrganization} = useAppSelector(state => state.organization);
    const [organization, setOrganization] = useState({name: ''});

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setOrganization({name: e.target.value});};

    const handleCreateRole = async () => {
        await dispatch(createOrganization(organization)).unwrap()
            .then(() => {
                dispatch(setModalCreateOrganization({ isOpen: false }));
                setOrganization({name: ''});
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Organisation Créée Avec Succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
            .catch(() => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de l'organization"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
    }


    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateOrganization} toggle={() => dispatch(setModalCreateOrganization({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter Une Organisation"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateOrganization({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="roleName" check>
                            Nom de l'organisation <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="roleName"
                            type="text"
                            value={organization.name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateOrganization({ isOpen: false }))}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleCreateRole}>
                        {"Créer"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default CreateOrganizationModal;