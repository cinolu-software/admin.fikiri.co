import React, { useState, useRef } from "react";
import { Container, Label, InputGroup, InputGroupText, Input, Form, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProfile } from "@/Redux/Reducers/AuthenticationSlice";
import { Flip, toast } from "react-toastify";
import { UpdateProfilePayload } from "@/Types/Authentication/AuthenticationType";
import VulgarisationCard from "@/Components/Common/Profile/common/VulgarisationCard";



const UserDetail = () => {


    const { userData } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const completePayload: UpdateProfilePayload = {
            name: nameRef.current?.value || userData?.name || "",
            email: emailRef.current?.value || userData?.email || "",
            phone_number: phoneRef.current?.value || userData?.phone_number || "",
            address: addressRef.current?.value || userData?.address || "",
        };

        try {
            await dispatch(updateProfile(completePayload));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Profile mise à jour avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
        catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur lors de la mise à jour du profil"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="mt-5">
            <div>
                {
                    //@ts-ignore
                    userData && <VulgarisationCard userData={userData} />
                }
                <h5 className="mb-3">{'Informations personnelles'}</h5>
                <Form onSubmit={handleProfileUpdate}>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Nom'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-id-card"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={'Nom'}
                                innerRef={nameRef}
                                defaultValue={userData?.name}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Email'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-email"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={'Email'}
                                innerRef={emailRef}
                                defaultValue={userData?.email}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Téléphone'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-call"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={'Téléphone'}
                                innerRef={phoneRef}
                                defaultValue={userData?.phone_number}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Adresse'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-location-pin"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={'Adresse'}
                                innerRef={addressRef}
                                defaultValue={userData?.address}
                            />
                        </InputGroup>
                    </div>
                    <Button color="primary" type="submit" disabled={loading} className={'mb-5 mt-5'} outline >
                        {loading ? 'Chargement...' : 'Mettre à jour'}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default UserDetail;