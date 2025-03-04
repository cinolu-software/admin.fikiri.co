import React, { useEffect, useState } from "react";
import { TabPane } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addReviewer, deleteReviewer, resendReviewerLink } from "@/Redux/Reducers/CallSlice";
import { useRouter } from "next/navigation";
import { fetchOrganization } from "@/Redux/Reducers/OrganizationSlice";
import { showToast } from "@/utils";

const CallCurators = () => {
    const { selectedCall } = useAppSelector(state => state.call);
    const { dataOrganization, statusOrganization } = useAppSelector(state => state.organization);
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");

    useEffect(() => {
        if (!selectedCall) {
            router.push("/admin/call");
        }
    }, [selectedCall, router]);

    useEffect(() => {
        if (statusOrganization === 'idle') {
            dispatch(fetchOrganization());
        }
    }, [dispatch, statusOrganization]);

    const handleAddReviewer = async () => {
        if (selectedCall && email && organization) {
            try {
                await dispatch(addReviewer({
                    email,
                    organization,
                    callId: selectedCall.id
                }));
                showToast("Le curateur a été ajouté avec succès", "success");
                setEmail("");
                setOrganization("");
            } catch (error) {
                showToast("Erreur lors de l'ajout du curateur", "error");
                console.error("Error adding reviewer:", error);
            }
        }
    };

    const handleDeleteReviewer = async (email: string) => {
        if (selectedCall) {
            try {
                await dispatch(deleteReviewer({
                    email,
                    callId: selectedCall.id
                }));
                showToast("Le curateur a été supprimé avec succès", "success");
            } catch (error) {
                showToast("Erreur lors de la suppression du curateur", "error");
                console.error("Error deleting reviewer:", error);
            }
        }
    };

    const handleResendLink = async (email: string) => {
        try {
            await dispatch(resendReviewerLink({ email }));
            showToast("Le lien a été renvoyé avec succès", "success");
        } catch (error) {
            showToast("Erreur lors du renvoi du lien", "error");
            console.error("Error resending link:", error);
        }
    };

    const getOrganizationName = (organizationId: string) => {
        const organization = dataOrganization.find(org => org.id === organizationId);
        return organization ? organization.name : organizationId;
    };

    if (!selectedCall) {
        return null;
    }

    return (
        <TabPane tabId={"3"}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Ajouter un nouveau curateur</h5>
                                <div className="row g-3">
                                    <div className="col-md-5">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email du curateur"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <select
                                            className="form-select"
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                        >
                                            <option value="">Sélectionner une organisation</option>
                                            {statusOrganization === 'loading' && (
                                                <option disabled>Chargement des organisations...</option>
                                            )}
                                            {dataOrganization.map((org) => (
                                                <option key={org.id} value={org.id}>
                                                    {org.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={handleAddReviewer}
                                            disabled={!email || !organization}
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Liste des curateurs</h5>
                                {selectedCall.reviewers && selectedCall.reviewers.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Organisation</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedCall.reviewers.map((reviewer: any, index: number) => (
                                                    <tr key={index}>
                                                        <td>{reviewer.email}</td>
                                                        <td>{getOrganizationName(reviewer.organization)}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm me-2"
                                                                onClick={() => handleDeleteReviewer(reviewer.email)}
                                                            >
                                                                Supprimer
                                                            </button>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => handleResendLink(reviewer.email)}
                                                            >
                                                                Renvoye le lien
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-muted text-center">Aucun curateur n'a encore été ajouté.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default CallCurators;