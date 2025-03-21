import React, { ChangeEvent } from "react";
import { Col, Input, Label } from "reactstrap";
import { StepProps } from "@/Types/PartnerType/PartnerType";

const StepOne = ({ formValue, onChange }: { formValue: any; onChange: (name: string, value: any) => void }) => {
    return (
        <div>
            <div className="form-group">
                <label>Nom</label>
                <input
                    type="text"
                    name="name"
                    value={formValue.name}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={formValue.description}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    className="form-control"
                ></textarea>
            </div>
        </div>
    );
};

export default StepOne;