import React, { useEffect } from "react";
import { Col, Input, Label } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchPartnerShip } from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";

interface StepProps {
    formValue: any;
    onChange: (name: string, value: any) => void;
}

const StepThree: React.FC<StepProps> = ({ formValue, onChange }) => {
    const dispatch = useAppDispatch();
    const { status, partnerShipData } = useAppSelector((state) => state.partnerShip);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPartnerShip());
        }
    }, [dispatch, status]);

    const handleCheckboxChange = (checked: boolean, partnership: any) => {
        const updatedPartnerships = checked
            ? [...formValue.partnerships, partnership]
            : formValue.partnerships.filter((p: { id: string }) => p.id !== partnership.id);

        onChange("partnerships", updatedPartnerships);
    };

    return (
        <Col xs="12">
            <section className="main-upgrade">
                <div className="variation-box">
                    {partnerShipData.map((partnership) => (
                        <div className="selection-box" key={partnership.id}>
                            <Input
                                id={`type${partnership.id}`}
                                type="checkbox"
                                checked={formValue.partnerships.some(
                                    (p: { id: string }) => p.id === partnership.id
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.checked, partnership)
                                }
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{partnership.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepThree;