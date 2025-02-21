import React, {useState} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {Flip, toast} from "react-toastify";
import {createRole, setModalCreateRole} from "@/Redux/Reducers/RoleSlice";
import {CreateRoleType} from "@/Types/Role/RoleType";


const CreateRoleModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateRole} = useAppSelector(state => state.role);
    const [role, setRole] = useState({name: ''});

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setRole({name: e.target.value});};

    const handleCreateRole = async () => {
        await dispatch(createRole(role)).unwrap()
            .then(() => {
                dispatch(setModalCreateRole({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Role Utilisateur Créé Avec Succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du role utilisateur"}</p>,
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
            <Modal isOpen={isOpenModalCreateRole} toggle={() => dispatch(setModalCreateRole({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter Un Rôle Utilisateur"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateRole({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="roleName" check>
                            Nom du Rôle Utilisateur <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="roleName"
                            type="text"
                            value={role.name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateRole({ isOpen: false }))}>
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

export default CreateRoleModal;