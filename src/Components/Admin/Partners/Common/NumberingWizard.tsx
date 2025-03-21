import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, Col, Form} from "reactstrap";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Admin/Partners/Common/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {Back} from '@/Constant';
import StepOne from "@/Components/Admin/Partners/Common/StepOne";
import StepThree from "@/Components/Admin/Partners/Common/StepThree";
import StepTwo from "@/Components/Admin/Partners/Common/StepTwo";
import {Flip, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {setFormValue, createPartner, updatePartner, handleNextButton, handleBackButton} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import {CreatePartner} from "@/Types/Partners/PartnerType";


const NumberingWizard = ({ mode = "add", initialValues }: { mode: "add" | "edit"; initialValues?: CreatePartner }) => {

    const { numberLevel, formValue, showFinish } = useAppSelector(state => state.partner);
    const dispatch = useAppDispatch();
    const router = useRouter();


    useEffect(() => {
        if (mode === "edit" && initialValues) {
            Object.keys(initialValues).forEach((key) => {
                dispatch(setFormValue({ field: key, value: initialValues[key] }));
            });
        }
    }, [mode, initialValues, dispatch]);

    const handleSubmit = () => {
        try {
            if (mode === "add") {
                dispatch(createPartner(formValue));
                toast.success("Partenaire créé avec succès", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
            } else {
                dispatch(updatePartner({ id: initialValues.id, ...formValue }));
                toast.success("Partenaire modifié avec succès", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
            }
            router.push("/partners");
        } catch (error) {
            toast.error("Une erreur est survenue", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
        }
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1:
                return <StepOne formValue={formValue} onChange={(name, value) => dispatch(setFormValue({ field: name, value }))} />;
            case 2:
                return <StepTwo formValue={formValue} onChange={(name, value) => dispatch(setFormValue({ field: name, value }))} />;
            case 3:
                return <StepThree formValue={formValue} onChange={(name, value) => dispatch(setFormValue({ field: name, value }))} />;
            case 4:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleSubmit}
                            textButton={mode === "add" ? "Créer le partenaire" : "Modifier le partenaire"}
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <Col>
            <Card className="height-equal">
                <CommonCardHeader title={mode === "add" ? "Ajout du partenaire" : "Modification du partenaire"} />
                <CardBody className="basic-wizard important-validation">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform" className="mx-5">
                        {renderStep()}
                    </div>
                    <div className="wizard-footer d-flex gap-2 justify-content-end mt-4 me-5">
                        {numberLevel > 1 && (
                            <Button className="alert-light-primary" color="transparent" onClick={() => dispatch(handleBackButton())}>
                                {Back}
                            </Button>
                        )}
                        <Button
                            disabled={!!showFinish}
                            color="primary"
                            onClick={() => dispatch(handleNextButton())}
                        >
                            {showFinish ? "Finish" : "Next"}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}
export default NumberingWizard
