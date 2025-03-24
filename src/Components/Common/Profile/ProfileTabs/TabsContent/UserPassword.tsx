import React, { useState } from "react";
import {Col, Input, Label, Form, Row, InputGroup, InputGroupText,} from "reactstrap";
import { UpdateProfilePassword } from "@/Types/Authentication/AuthenticationType";
import { Flip, toast } from "react-toastify";
import { updatePassword } from "@/Redux/Reducers/AuthenticationSlice";
import { useAppDispatch } from "@/Redux/Hooks";

const UserPassword = () => {

    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<UpdateProfilePassword>({
        old_password: "",
        password: "",
        password_confirm: "",
    });

    const [showPassword, setShowPassword] = useState({
        old_password: false,
        password: false,
        password_confirm: false,
    });

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handlePasswordUpdate = async () => {
        const { old_password, password, password_confirm } = formValues;

        if (old_password && password && password_confirm) {
            await dispatch(updatePassword(formValues))
                .unwrap()
                .then(() => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">
                            {"Mise à jour du mot de passe effectuée avec succès"}
                        </p>,
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
                        <p className="text-white tx-16 mb-0">{'Mise à jour du mot de passe echouée'}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                });
        } else {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez remplir tous les champs."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    return (
        <Col md="12">
            <Form className="mt-3">
                <Row className="g-3 ms-2">
                    {[
                        { label: "Ancien mot de passe", name: "old_password" },
                        { label: "Nouveau mot de passe", name: "password" },
                        { label: "Confirmer le mot de passe", name: "password_confirm" },
                    ].map(({ label, name }, index) => (
                        <Col md="12" key={index} className={'m-form__group'}>
                            <Label check>{label}</Label>
                            <InputGroup >
                                <InputGroupText className={'list-light-primary'}>
                                    <i className="fa fa-lock"></i>
                                </InputGroupText>

                                <Input
                                    type={showPassword[name as keyof typeof showPassword] ? "text" : "password"}
                                    placeholder={label}
                                    name={name}
                                    value={formValues[name as keyof UpdateProfilePassword]}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />

                                <InputGroupText
                                    onClick={() => togglePasswordVisibility(name as keyof typeof showPassword)}
                                    className="cursor-pointer position-absolute end-0 top-0 h-100"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        paddingRight: "10px",
                                    }}
                                >
                                    <i
                                        className={`fa ${
                                            showPassword[name as keyof typeof showPassword]
                                                ? "fa-eye-slash"
                                                : "fa-eye"
                                        }`}
                                    ></i>
                                </InputGroupText>
                            </InputGroup>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Col>
    );
};

export default UserPassword;
