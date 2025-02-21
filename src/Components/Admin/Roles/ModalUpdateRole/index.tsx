import React, {useState, useEffect, useRef} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {updateRole, setModalEditRole} from "@/Redux/Reducers/RoleSlice";
import {Flip, toast} from "react-toastify";
import {UpdateRoleType} from "@/Types/Role/RoleType";

const UpdateRoleModal = () => {
    const dispatch = useAppDispatch();
    const {selectedRole, isOpenModalEditRole} = useAppSelector(state => state.role);
    const isEditingRef = useRef<boolean>(false);
    const [role, setRole] = useState<UpdateRoleType>({name: '', id: ''});


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setRole((prev)=>({...prev, name: newName}));
        isEditingRef.current = true;
    }

    useEffect(() => {
        if (!isEditingRef.current) {
            setRole({
                id: selectedRole?.id || '',
                name: selectedRole?.name || '',
            })
        }else{
            isEditingRef.current = false;
        }
    }, [isEditingRef.current, selectedRole]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateRole(role)).unwrap()
            dispatch(setModalEditRole({isOpen: false, role: null}))
            toast.success(
                <p className="text-white tx-16 mb-0">{"Rôle mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du Rôle"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    }


    return (
        <Col xs={'12'}>
            <Modal
                isOpen={isOpenModalEditRole}
                toggle={() => dispatch(setModalEditRole({isOpen: false, role: null}))}
                size={'lg'}
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de projet"}</h1>
                    <Button close
                            onClick={() => dispatch(setModalEditRole({isOpen: false, role: null}))}
                    />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom du type de projet <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={role.name || ""}
                            onChange={handleNameChange}
                            required
                        />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditRole({isOpen: false, role: null}))}
                    >
                        {"Annuler"}
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>
                        {"Mettre à jour"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    )
}

export default UpdateRoleModal;