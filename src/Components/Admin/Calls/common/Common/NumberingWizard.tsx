import React, { useEffect } from "react";
import { Button, CardBody, Form, Card } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import {createCall, updateCall, handleBackButton, handleNextButton, setAddFormValue, resetFormValue} from "@/Redux/Reducers/CallSlice";
import { toast } from "react-toastify";
import FinishForm from "@/CommonComponent/FinishForm";
import StepOne from "@/Components/Admin/Calls/common/Common/StepOne";
import StepTwo from "@/Components/Admin/Calls/common/Common/StepTwo";
import StepThree from "@/Components/Admin/Calls/common/Common/StepThree";
import StepFour from "@/Components/Admin/Calls/common/Common/StepFour";
import StepperHorizontal from "@/Components/Admin/Calls/common/Common/StepperHorizontal";
import { buttonFinish, buttonNext, buttonPrevious } from "@/Constant";
import StepFive from "@/Components/Admin/Calls/common/Common/StepFive";


const NumberingWizard = ({ mode = "add", initialValues }: { mode: "add" | "edit"; initialValues?: any }) => {

    const { numberLevel, AddFormValue, showFinish } = useAppSelector(state => state.call);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (mode === "edit" && initialValues) {
            Object.keys(initialValues).forEach(key => {
                const field = key as keyof typeof AddFormValue;
                dispatch(setAddFormValue({ field, value: initialValues[field] }));
            });
        } else if (mode === "add") {
            dispatch(resetFormValue());
        }
    }, [mode, initialValues, dispatch]);


    const handleSubmit = async () => {
        try {
            if (mode === "add") {
                await dispatch(createCall(AddFormValue)).unwrap();
                toast.success("Appel créé avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                await dispatch(updateCall({ id: initialValues.id, ...AddFormValue })).unwrap(); 
                toast.success("Appel modifié avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            router.push("/admin/call");
        } catch (error) {
            toast.error("Erreur lors de la soumission de l'appel", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };


    const renderStep = () => {
        switch (numberLevel) {
            case 1:
                return <StepOne data={AddFormValue} />;
            case 2:
                return <StepTwo data={AddFormValue} />;
            case 3:
                return <StepThree data={AddFormValue} />;

            case 4: 
                return <StepFive data={AddFormValue} />;
            
            case 5:
                return <StepFour data={AddFormValue} />;
            case 6:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleSubmit}
                            textButton={mode === "add" ? 'Créer l\'appel' : "Modifier l'appel"}
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={"mt-2"}>
                <div className="height-equal">
                    <CardBody className="basic-wizard important-validation">
                        <StepperHorizontal level={numberLevel} />
                        <div id="msform">{renderStep()}</div>
                        <div className="wizard-footer d-flex gap-2 justify-content-end mt-4 me-5 mb-4">
                            {numberLevel > 1 && (
                                <Button
                                    className="alert-light-primary"
                                    color="transparent"
                                    onClick={() => dispatch(handleBackButton())}
                                >
                                    {buttonPrevious}
                                </Button>
                            )}
                            <Button
                                disabled={!!showFinish}
                                color="primary"
                                onClick={() => dispatch(handleNextButton())}
                            >
                                {showFinish ? buttonFinish : buttonNext}
                            </Button>
                        </div>
                    </CardBody>
                </div>
            </div>
        </>
    );
};

export default NumberingWizard;
