import React, { useEffect, useState } from "react";
import { TabPane, Row, Col, Input, Button, FormGroup, Label, Spinner, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProject } from "@/Redux/Reducers/projectSlice/projectSlice";
import { Flip, toast } from "react-toastify";
import { INDICATOR_CATEGORIES, INPUT_TYPES } from "@/Data/Application/ProjectIndicator";

const ProjectIndicator = () => {

    const dispatch = useAppDispatch();
    const { selectedProject} = useAppSelector((state) => state.project);

    const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
    const [indicatorValues, setIndicatorValues] = useState<{ [key: string]: string | number }>({});
    const [customIndicatorInput, setCustomIndicatorInput] = useState<string>("");
    const [customIndicators, setCustomIndicators] = useState<{ name: string; value: string | number }[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (selectedProject?.report) {
            setSelectedIndicators(Object.keys(selectedProject.report));
            setIndicatorValues(selectedProject.report);
        }
    }, [selectedProject]);

    const handleToggleIndicator = (indicator: string) => {
        if (selectedIndicators.includes(indicator)) {
            setSelectedIndicators(selectedIndicators.filter((i) => i !== indicator));
            setIndicatorValues((prev) => {
                const newValues = { ...prev };
                delete newValues[indicator];
                return newValues;
            });
        } else {
            setSelectedIndicators([...selectedIndicators, indicator]);
            setIndicatorValues((prev) => ({ ...prev, [indicator]: "" }));
        }
    };

    const handleIndicatorValueChange = (indicator: string, value: string | number) => {
        setIndicatorValues({ ...indicatorValues, [indicator]: value });
    };

    const handleAddCustomIndicator = () => {
        if (customIndicatorInput.trim() !== "" && !customIndicators.some((i) => i.name === customIndicatorInput)) {
            setCustomIndicators([...customIndicators, { name: customIndicatorInput, value: "" }]);
            setCustomIndicatorInput("");
        }
    };

    const handleCustomIndicatorValueChange = (index: number, value: string | number) => {
        const updatedIndicators = [...customIndicators];
        updatedIndicators[index].value = value;
        setCustomIndicators(updatedIndicators);
    };

    const handleRemoveCustomIndicator = (index: number) => {
        setCustomIndicators(customIndicators.filter((_, i) => i !== index));
    };

    const handleSaveIndicators = async () => {
        if (!selectedProject) return;
        setIsSaving(true);

        const customIndicatorsObject = customIndicators.reduce((acc, curr) => {
            acc[curr.name] = curr.value;
            return acc;
        }, {} as { [key: string]: string | number });

        try {

            await dispatch(updateProject({
                projectId: selectedProject.id,
                // @ts-ignore
                updatedProject: {
                    name: selectedProject.name,
                    description: selectedProject.description,
                    started_at: selectedProject.started_at,
                    ended_at: selectedProject.ended_at,
                    targeted_audience: selectedProject.targeted_audience,
                    aim: selectedProject.aim,
                    prize: selectedProject.prize,
                    town: selectedProject.town,
                    types: selectedProject.types?.map(type => type.id) || [],
                    // @ts-ignore
                    partners: selectedProject.partners?.map(partner => partner.id) || [],
                    // @ts-ignore
                    categories: selectedProject.categories?.map(category => category.id) || [],
                    report: { ...indicatorValues, ...customIndicatorsObject }
                }
            }));

            toast.success("Indicateurs mis à jour avec succès !", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
                theme: "colored",
            });
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des indicateurs.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
                theme: "colored",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <TabPane tabId="3">
            <div className="p-4 bg-white">
                <h4 className="pb-3 border-bottom">Indicateurs du projet</h4>

                {Object.entries(INDICATOR_CATEGORIES).map(([category, indicators]) => (
                    <div key={category} className="mb-3 border border-radius p-3">
                        <div>
                            <h5 className="text-primary">{category}</h5>
                            <Row>
                                {indicators.map((indicator) => (
                                    <Col md="6" key={indicator} className="mb-2">
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="checkbox"
                                                    checked={selectedIndicators.includes(indicator)}
                                                    onChange={() => handleToggleIndicator(indicator)}
                                                />
                                                {indicator}
                                            </Label>
                                        </FormGroup>
                                        {selectedIndicators.includes(indicator) && indicator === "Répartition par genre (Homme/Femme)" && (
                                            <div>
                                                <Input
                                                    type="number"
                                                    value={indicatorValues["Homme"] || ""}
                                                    onChange={(e) => handleIndicatorValueChange("Homme", e.target.value)}
                                                    placeholder="Nombre d'hommes"
                                                    bsSize="sm"
                                                />
                                                <Input
                                                    type="number"
                                                    value={indicatorValues["Femme"] || ""}
                                                    onChange={(e) => handleIndicatorValueChange("Femme", e.target.value)}
                                                    placeholder="Nombre de femmes"
                                                    bsSize="sm"
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        {selectedIndicators.includes(indicator) && indicator === "Participants par tranche d'âge" && (
                                            <div>
                                                <Input
                                                    type="select"
                                                    value={indicatorValues["tranche_age"] || ""}
                                                    onChange={(e) => handleIndicatorValueChange("tranche_age", e.target.value)}
                                                    bsSize="sm"
                                                >
                                                    <option value="">Sélectionnez une tranche d'âge</option>
                                                    <option value="18-25">18-25 ans</option>
                                                    <option value="26-35">26-35 ans</option>
                                                    <option value="36-45">36-45 ans</option>
                                                    <option value="46+">46+ ans</option>
                                                </Input>
                                                <Input
                                                    type="number"
                                                    value={indicatorValues["participants_age"] || ""}
                                                    onChange={(e) => handleIndicatorValueChange("participants_age", e.target.value)}
                                                    placeholder="Nombre de participants"
                                                    bsSize="sm"
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        {selectedIndicators.includes(indicator) && indicator !== "Répartition par genre (Homme/Femme)" && indicator !== "Participants par tranche d'âge" && (
                                            <Input
                                                type={INPUT_TYPES[indicator] as any || "text"}
                                                value={indicatorValues[indicator] || ""}
                                                onChange={(e) => handleIndicatorValueChange(indicator, e.target.value)}
                                                placeholder="Entrer une valeur"
                                                bsSize="sm"
                                            />
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))}

                <h5 className="mt-4 pb-2 border-bottom ">Ajouter un indicateur personnalisé</h5>
                <Row className="my-3">
                    <Col md="9">
                        <Input
                            type="text"
                            value={customIndicatorInput}
                            onChange={(e) => setCustomIndicatorInput(e.target.value)}
                            placeholder="Ex: Nombre de participants internationaux"
                            bsSize="sm"
                        />
                    </Col>
                    <Col md="3">
                        <Button color="primary" size="sm" onClick={handleAddCustomIndicator}>
                            Ajouter
                        </Button>
                    </Col>
                </Row>

                {customIndicators.length > 0 && (
                    <>
                        <h5 className="mt-4 pb-2 border-bottom">Indicateurs personnalisés ajoutés</h5>
                        <ul className="list-group">
                            {customIndicators.map((indicator, index) => (
                                <li key={index} className="list-group-item d-flex flex-column">
                                    <span className="fw-bold">{indicator.name}</span>
                                    <Input
                                        type="text"
                                        value={indicator.value}
                                        onChange={(e) => handleCustomIndicatorValueChange(index, e.target.value)}
                                        placeholder="Entrer une valeur"
                                        bsSize="sm"
                                        className="mt-2"
                                    />
                                    <Button color="danger" size="sm" onClick={() => handleRemoveCustomIndicator(index)} className="mt-2">
                                        Supprimer
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <h5 className="mt-4 pb-2 border-bottom">Indicateurs sélectionnés</h5>
                {selectedIndicators.length === 0 ? (
                    <p>Aucun indicateur sélectionné.</p>
                ) : (
                    <ul className="list-group">
                    {selectedIndicators.map((indicator, index) => (
                        <li key={index} className="list-group-item d-flex flex-column">
                            <span className="fw-bold">{indicator}</span>
                            
                            {indicator === "Répartition par genre (Homme/Femme)" ? (
                                <div>
                                    <Input
                                        type="number"
                                        value={indicatorValues["Homme"] || ""}
                                        onChange={(e) => handleIndicatorValueChange("Homme", e.target.value)}
                                        placeholder="Nombre d'hommes"
                                        bsSize="sm"
                                    />
                                    <Input
                                        type="number"
                                        value={indicatorValues["Femme"] || ""}
                                        onChange={(e) => handleIndicatorValueChange("Femme", e.target.value)}
                                        placeholder="Nombre de femmes"
                                        bsSize="sm"
                                        className="mt-2"
                                    />
                                </div>
                            ) : indicator === "Participants par tranche d'âge" ? (
                                <div>
                                    <Input
                                        type="select"
                                        value={indicatorValues["tranche_age"] || ""}
                                        onChange={(e) => handleIndicatorValueChange("tranche_age", e.target.value)}
                                        bsSize="sm"
                                    >
                                        <option value="">Sélectionnez une tranche d'âge</option>
                                        <option value="18-25">18-25 ans</option>
                                        <option value="26-35">26-35 ans</option>
                                        <option value="36-45">36-45 ans</option>
                                        <option value="46+">46+ ans</option>
                                    </Input>
                                    <Input
                                        type="number"
                                        value={indicatorValues["participants_age"] || ""}
                                        onChange={(e) => handleIndicatorValueChange("participants_age", e.target.value)}
                                        placeholder="Nombre de participants"
                                        bsSize="sm"
                                        className="mt-2"
                                    />
                                </div>
                            ) : (
                                <Input
                                    type={INPUT_TYPES[indicator] as any || "text"}
                                    value={indicatorValues[indicator] || ""}
                                    onChange={(e) => handleIndicatorValueChange(indicator, e.target.value)}
                                    placeholder="Entrer une valeur"
                                    bsSize="sm"
                                />
                            )}
            
                            <Button color="danger" size="sm" onClick={() => handleToggleIndicator(indicator)} className="mt-2">
                                Supprimer
                            </Button>
                        </li>
                    ))}
                </ul>
                )}

                <div className="mt-4">
                    <Button color="success" onClick={handleSaveIndicators} disabled={isSaving}>
                        {isSaving ? <Spinner size="sm" /> : "Sauvegarder les indicateurs"}
                    </Button>
                </div>
            </div>
        </TabPane>
    );
};

export default ProjectIndicator;
