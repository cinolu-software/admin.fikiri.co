import React from 'react';
import {TabPane, UncontrolledAccordion} from 'reactstrap';
import {Calendar, FileText, Home, Layers, Tag, User, Users, Target, Award, MapPin} from 'react-feather';
import ProjectInfoAccordionItem from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectInfo/ProjectInfoAccordionItem";
import {useAppSelector} from "@/Redux/Hooks";
import {calculateDuration} from "@/utils";

const ProgramInfo = () => {

    const {projectData} = useAppSelector(state=>state.project);

    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mx-5 mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={()=>{}}>
                                <ProjectInfoAccordionItem
                                    id="1"
                                    Icon={<Tag className="svg-wrapper text-success" />}
                                    title="Nom du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.name || "Nom non spécifié"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="2"
                                    Icon={<FileText className="svg-wrapper text-success" />}
                                    title="Description du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.description || "Description non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="3"
                                    Icon={<Target className="svg-wrapper text-success" />}
                                    title="Objectif du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.aim || "Objectif du programme"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="4"
                                    Icon={<User className="svg-wrapper text-success" />}
                                    title="Audience ciblée"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.targeted_audience || "Audience non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="5"
                                    Icon={<Calendar className="svg-wrapper text-success" />}
                                    title="Durée du programme"
                                >
                                    <div className="program-duration text-success">
                                        <div className="date-info">
                                            <span className="label">Lancement :</span>
                                            <span className="value">
                                                {projectData?.started_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="date-info">
                                            <span className="label">Fin :</span>
                                            <span className="value">
                                                {projectData?.ended_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="duration-info">
                                            <span className="label">Durée :</span>
                                            <span className="value">
                                                {projectData?.started_at && projectData?.ended_at
                                                    ? calculateDuration(projectData.started_at, projectData.ended_at)
                                                    : "Non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="6"
                                    Icon={<Award className="svg-wrapper text-success" />}
                                    title="A la clé"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.prize || "A la clé"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="7"
                                    Icon={<MapPin className="svg-wrapper text-success" />}
                                    title="Ville cible"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {projectData?.town || "Ville cible"}
                                            </span>
                                        </div>
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="8"
                                    Icon={<Layers className="svg-wrapper text-success" />}
                                    title="Type de programme"
                                >
                                    <div className="program-info text-success">
                                        {projectData?.types && projectData.types.length > 0 ? (
                                            projectData.types.map((type: any) => (
                                                <div className="info-row" key={type.id}>
                                                    <span className="value">{type.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Type non spécifié</span>
                                            </div>
                                        )}
                                    </div>
                                </ProjectInfoAccordionItem>

                                <ProjectInfoAccordionItem
                                    id="9"
                                    Icon={<Home className="svg-wrapper text-success" />}
                                    title="Catégorie de programme"
                                >
                                    <div className="program-info text-success">
                                        {projectData?.categories && projectData.categories.length > 0 ? (
                                            projectData.categories.map((category: any) => (
                                                <div className="info-row" key={category.id}>
                                                    <span className="value">{category.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Catégorie non spécifiée</span>
                                            </div>
                                        )}
                                    </div>
                                </ProjectInfoAccordionItem>
                                <ProjectInfoAccordionItem
                                    id="10"
                                    Icon={<Users className="svg-wrapper text-success" />}
                                    title="Partenaires"
                                >
                                    <div className="program-info text-success">
                                        {projectData?.partners && projectData.partners.length > 0 ? (
                                            projectData.partners.map((partner: any) => (
                                                <div className="partner-info mb-4" key={partner.id}>
                                                    <div className="info-row">
                                                        <strong>Nom :</strong> <span className="value">{partner.name || "Non spécifié"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Description :</strong> <span className="value">{partner.description || "Non spécifiée"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Site web :</strong>{" "}
                                                        {partner.website_link ? (
                                                            <a
                                                                href={partner.website_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="value text-decoration-underline text-primary"
                                                            >
                                                                {partner.website_link}
                                                            </a>
                                                        ) : (
                                                            <span className="value">Non spécifié</span>
                                                        )}
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Date de création :</strong>{" "}
                                                        <span className="value">{new Date(partner.created_at).toLocaleDateString() || "Non spécifiée"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Dernière mise à jour :</strong>{" "}
                                                        <span className="value">{new Date(partner.updated_at).toLocaleDateString() || "Non spécifiée"}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Aucun partenaire spécifié</span>
                                            </div>
                                        )}
                                    </div>
                                </ProjectInfoAccordionItem>


                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default ProgramInfo;

