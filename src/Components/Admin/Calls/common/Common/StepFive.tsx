import React, { useEffect } from 'react';
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setNewFormValue } from '@/Redux/Reducers/projectSlice/projectSlice';
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import {StepPropsType} from "@/Types/Projects/ProjectType";
import {activitySelect, activityStepFivePartners, activityStepFiveDescription} from "@/Constant";

const StepFive: React.FC<StepPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();
    const { partnerData, status } = useAppSelector((state) => state.partner);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPartner());
        }
    }, [dispatch, status]);

    const handlePartnerChange = (partnerId: string) => {
        if (!data) return;
        const updatedPartners = data.partners.includes(partnerId)
            ? data.partners.filter((id: string) => id !== partnerId)
            : [...data.partners, partnerId];

        dispatch(setNewFormValue({ field: 'partners', value: updatedPartners }));
    };


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {activitySelect} <span className="txt-primary">{activityStepFivePartners}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {activityStepFiveDescription}
                    </p>
                </div>

                <div className="variation-box">
                    {partnerData.map((partner) => (
                        <div className="selection-box" key={partner.id}>
                            <Input
                                id={`partner${partner.id}`}
                                type="checkbox"
                                checked={data.partners.includes(partner.id)}
                                onChange={() => handlePartnerChange(partner.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{partner.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepFive;