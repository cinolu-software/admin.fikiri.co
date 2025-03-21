import React from 'react';
import { Col, Input, Label } from "reactstrap";

interface StepProps {
    formValue: any;
    onChange: (name: string, value: any) => void;
}

const StepTwo: React.FC<StepProps> = ({ formValue, onChange }) => {
    const { website_link } = formValue;

    return (
        <Col xs="12">
            <div>
                <Label for="websiteLink" check>
                    Website Link <span className="text-danger">*</span>
                </Label>
                <Input
                    className="m-0"
                    id="websiteLink"
                    type="url"
                    name="website_link"
                    value={website_link || ""}
                    onChange={(e) => onChange("website_link", e.target.value)}
                    required
                    placeholder="Enter the website URL"
                />
            </div>
        </Col>
    );
};

export default StepTwo;