import React, { useState } from 'react';
import { UserProfileType } from "@/Types/Authentication/AuthenticationType";

const VulgarisationCard: React.FC<{ userData: UserProfileType }> = ({ userData }) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://fikiri.co/sign-up?link=${userData?.popularization_link || ''}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-5 mb-5 border rounded p-4 bg-light-primary text-center">

            <h5 className="mb-3">Partagez votre lien de parrainage</h5>
            <p className="text-muted mb-4">
                Copiez le lien ci-dessous ou partagez-le directement.
            </p>

            <div className="input-group mb-3 position-relative">
                <input
                    type="text"
                    className="form-control"
                    value={`https://fikiri.co/sign-up?link=${userData?.popularization_link || ''}`}
                    readOnly
                    aria-label="Lien de parrainage"
                />
                <button
                    className="btn btn-primary position-relative"
                    type="button"
                    onClick={handleCopy}
                >
                    <i className="icofont icofont-copy"></i> Copier
                    {
                        copied && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge bg-success"
                                style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', zIndex: 10 }}
                            >
                                Copié!
                            </span>
                        )
                    }
                </button>
            </div>
        </div>
    );
};
export default VulgarisationCard;