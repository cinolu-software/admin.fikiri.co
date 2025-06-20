import React, { useEffect, useState } from "react";
import { TabPane } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addReviewer, deleteReviewer, resendReviewerLink, updateReviewerSolution } from "@/Redux/Reducers/CallSlice";
import { useRouter } from "next/navigation";
import { fetchOrganization } from "@/Redux/Reducers/OrganizationSlice";
import { showToast } from "@/utils";
import { fetchApplicationsByCall } from "@/Redux/Reducers/CallSlice/CallApplication";
import { phases } from "@/utils";

const CallCurators = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { selectedCall } = useAppSelector(state => state.call);
    const { dataOrganization, statusOrganization } = useAppSelector(state => state.organization);
    const { applicationStatus, applicationData } = useAppSelector(state => state.application);

    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [solution, setSolution] = useState<number>(0);
    const [phase, setPhase] = useState<string>("");

    const [solutionsByReviewer, setSolutionsByReviewer] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (applicationStatus === "idle" && selectedCall?.id) {
            dispatch(fetchApplicationsByCall({ callId: selectedCall.id }));
        }
    }, [dispatch, applicationStatus, selectedCall?.id]);

    useEffect(() => {
        if (!selectedCall) {
            router.push("/admin/call");
        }
    }, [selectedCall, router]);

    useEffect(() => {
        if (statusOrganization === "idle") {
            dispatch(fetchOrganization());
        }
    }, [dispatch, statusOrganization]);

    const handleAddReviewer = async () => {
        if (selectedCall && email && organization && solution > 0 && phase) {
            try {
                await dispatch(
                    addReviewer({
                        email,
                        organization,
                        callId: selectedCall.id,
                        solutions: solution,
                        phase
                    })
                );
                showToast("Le curateur a été ajouté avec succès", "success");
                setEmail("");
                setOrganization("");
                setSolution(0);
                setPhase("");
            } catch (error) {
                showToast("Erreur lors de l'ajout du curateur", "error");
                console.error("Error adding reviewer:", error);
            }
        }
    };

    const handleDeleteReviewer = async (email: string) => {
        if (selectedCall) {
            try {
                await dispatch(deleteReviewer({ email, callId: selectedCall.id }));
                showToast("Le curateur a été supprimé avec succès", "success");
            } catch (error) {
                showToast("Erreur lors de la suppression du curateur", "error");
                console.error("Error deleting reviewer:", error);
            }
        }
    };

    const handleResendLink = async (email: string) => {
        try {
            if (!selectedCall) {
                throw new Error("No selected call");
            }
            await dispatch(resendReviewerLink({ email, id: selectedCall?.id }));
            showToast("Le lien a été renvoyé avec succès", "success");
        } catch (error) {
            showToast("Erreur lors du renvoi du lien", "error");
            console.error("Error resending link:", error);
        }
    };

    const handleSolutionChange = (email: string, newSolution: number) => {
        setSolutionsByReviewer(prev => ({
            ...prev,
            [email]: newSolution
        }));
    };

    const handleUpdateSolution = async (email: string) => {
        if (selectedCall && solutionsByReviewer[email] !== undefined) {
            try {
                const reviewer = selectedCall.reviewers.find(r => r.email === email);
                if (!reviewer) {
                    throw new Error("Reviewer not found");
                }
                await dispatch(
                    updateReviewerSolution({
                        email,
                        id: selectedCall.id,
                        solutions: solutionsByReviewer[email],
                        organization: reviewer.organization,
                        phase: reviewer.phase
                    })
                );
                showToast("Nombre de solutions mis à jour avec succès", "success");
            } catch (error) {
                showToast("Erreur lors de la mise à jour du nombre de solutions", "error");
            }
        }
    };

    const getOrganizationName = (organizationId: string) => {
        const org = dataOrganization.find(org => org.id === organizationId);
        return org ? org.name : "Organisation inconnue";
    };

    if (!selectedCall) {
        return null;
    }

    return (
        <TabPane tabId={"3"}>
            <div className="container mt-4 mb-4">
                <div className="row mb-4 mt-5">
                    <div className="col">
                        <div className="p-3 border rounded bg-white text-center">
                            <h6 className="text-muted">
                                Total des candidatures pour l'appel :{" "}
                                <span className="fw-bold">{selectedCall.name}</span>
                            </h6>
                            <h2 className="fw-bold text-primary">{applicationData ? applicationData.length : 0}</h2>
                            <div className="progress mt-2" style={{ height: "2px" }}>
                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "100%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ajout d'un curateur */}
                <div className="row">
                    <div className="col-12">
                        <div className="mb-4">
                            <h5 className="mb-4">Ajouter un nouveau curateur</h5>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email du curateur"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <select
                                        className="form-select"
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                    >
                                        <option value="">Sélectionner une organisation</option>
                                        {statusOrganization === "loading" && (
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
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Solutions"
                                        value={solution}
                                        onChange={(e) => setSolution(Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={phase}
                                        onChange={(e) => setPhase(e.target.value)}
                                    >
                                        <option value="">Phase de curation</option>
                                        {phases.map((p, i) => (
                                            <option key={i} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleAddReviewer}
                                        disabled={!email || !organization || solution <= 0 || !phase}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Liste des curateurs */}
                        <div>
                            <h5 className="mb-4">Liste des curateurs</h5>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Organisation</th>
                                    <th>Solutions</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedCall.reviewers?.map((reviewer, index) => (
                                    <tr key={index}>
                                        <td>{reviewer.email}</td>
                                        <td>{getOrganizationName(reviewer.organization)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={solutionsByReviewer[reviewer.email] || reviewer.solutions}
                                                onChange={(e) =>
                                                    handleSolutionChange(reviewer.email, Number(e.target.value))
                                                }
                                                className="form-control"
                                                style={{ width: "80px" }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleResendLink(reviewer.email)}
                                            >
                                                Renvoyer le lien
                                            </button>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleUpdateSolution(reviewer.email)}
                                            >
                                                Mettre à jour
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteReviewer(reviewer.email)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default CallCurators;
