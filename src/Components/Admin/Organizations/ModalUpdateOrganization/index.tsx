import React, {useState, useEffect, useRef} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {updateOrganization, setModalEditOrganization} from "@/Redux/Reducers/OrganizationSlice";
import {Flip, toast} from "react-toastify";
import {UpdateOrganizationType} from "@/Types/Organization/OrganizationType";

const UpdateOrganizationModal = () => {
    const dispatch = useAppDispatch();
    const {selectedOrganization, isOpenModalEditOrganization} = useAppSelector(state => state.organization);
    const isEditingRef = useRef<boolean>(false);
    const [organization, setOrganization] = useState<UpdateOrganizationType>({name: '', id: ''});


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setOrganization((prev)=>({...prev, name: newName}));
        isEditingRef.current = true;
    }

    useEffect(() => {
        if (!isEditingRef.current) {
            setOrganization({
                id: selectedOrganization?.id || '',
                name: selectedOrganization?.name || '',
            })
        }else{
            isEditingRef.current = false;
        }
    }, [isEditingRef.current, selectedOrganization]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateOrganization(organization)).unwrap()
            dispatch(setModalEditOrganization({isOpen: false, organization: null}))
            toast.success(
                <p className="text-white tx-16 mb-0">{"Organisation mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour de l'organisation"}</p>,
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
                isOpen={isOpenModalEditOrganization}
                toggle={() => dispatch(setModalEditOrganization({isOpen: false, organization: null}))}
                size={'lg'}
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour de l'organisation"}</h1>
                    <Button close
                            onClick={() => dispatch(setModalEditOrganization({isOpen: false, organization: null}))}
                    />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom de l'organisation <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={organization.name || ""}
                            onChange={handleNameChange}
                            required
                        />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditOrganization({isOpen: false, organization: null}))}
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

export default UpdateOrganizationModal;