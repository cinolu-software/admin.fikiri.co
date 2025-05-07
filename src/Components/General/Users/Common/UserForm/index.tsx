import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Container, Row, Col, CardHeader } from "reactstrap";
import Body from "@/Components/General/Users/Common/UserForm/Body";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {createUser, updateUser, setFormValue, resetFormValue} from "@/Redux/Reducers/UserSlice";
import { toast, ToastContainer, Flip } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserFormProps {
    mode: "create" | "edit";
    initialData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ mode, initialData }) => {

    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { formValue } = useAppSelector((state) => state.user);

    const handleSubmit = () => {
        if (isFormValid && formValue) {
            try {
                if (mode === "create") {
                    dispatch(createUser(formValue));
                    toast.success("Utilisateur créé avec succès", { autoClose: 5000, transition: Flip, theme: "colored" });
                } else {
                    
                    dispatch(updateUser({ id: initialData.id, ...formValue }));
                    toast.success("Utilisateur modifié avec succès", { autoClose: 5000, transition: Flip, theme: "colored" });
                }
                router.push('/general/users');
            } catch (error) {
                toast.error("Erreur lors de l'opération", { autoClose: 5000, transition: Flip, theme: "colored" });
            }
        }
    };

    useEffect(() => {
        if(mode === "create") {
            dispatch(resetFormValue());
        }
        else if (initialData) {
            Object.keys(initialData).forEach((key) => {
                if (key === "roles" && Array.isArray(initialData.roles)) {
                    const roleIds = initialData.roles.map((role: any) => role.id);
                    dispatch(setFormValue({ name: key, value: roleIds }));
                } else if (Object.keys(formValue).includes(key)) {

                    dispatch(setFormValue({ name: key, value: initialData[key] }));
                }
            });
        }
    }, [initialData, dispatch]);

    useEffect(() => {
        const validateForm = () => {
            const isValid =
                formValue?.email &&
                formValue?.name &&
                formValue?.phone_number &&
                formValue?.address &&
                formValue?.roles?.length > 0;
            setIsFormValid(Boolean(isValid));
        };
        validateForm();
    }, [formValue]);


    return (

        <Container fluid>
            <Row className="mt-5">
                {
                    mode === "create" ? (
                        <div>
                            <div>
                                <Body mode={mode} selectedUser={initialData}/>
                            </div>
                            <div>
                                <Row className='mt-3'>
                                    <Col className={'d-flex justify-content-end'}>
                                        <button
                                            className={'btn btn-outline-primary'}
                                            onClick={handleSubmit}
                                            disabled={!isFormValid}
                                        >
                                            <i className="bi bi-save"></i>
                                            {"Créer l'utilisateur"}
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ) : (
                        <Card>
                            <CardBody>
                                <Body mode={mode} selectedUser={initialData}/>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col className={'d-flex justify-content-end'}>
                                        <button
                                            className={'btn btn-outline-primary'}
                                            onClick={handleSubmit}
                                            // disabled={!isFormValid}
                                        >
                                            <i className="bi bi-save"></i>
                                            {"Modifier l'utilisateur"}
                                        </button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    ) 
                }
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default UserForm;
