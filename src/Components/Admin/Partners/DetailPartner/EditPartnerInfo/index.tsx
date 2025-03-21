import React, {useEffect} from "react";
import { TabPane, UncontrolledAccordion } from "reactstrap";
import {Calendar, FileText, Tag, Users, Link,} from "react-feather";
import { useAppSelector } from "@/Redux/Hooks";
import PartnerAccordionItem from "@/Components/Admin/Partners/DetailPartner/EditPartnerInfo/PartnerAccordion";
import {useRouter} from "next/navigation";

const PartnerInfo = () => {

    const { selectedPartner } = useAppSelector((state) => state.partner);
    const router = useRouter();

    useEffect(()=> {
        if(!selectedPartner){
            router.push("/admin/partners");
        }
    }, [selectedPartner]);

    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={() => {}}>
                                <PartnerAccordionItem
                                    id="1"
                                    Icon={<Tag className="svg-wrapper text-secondary" />}
                                    title="Nom du Partenaire"
                                >
                                    <div className="program-info text-primary">
                                        <div className="info-row">
                                          <span className="value">
                                            {selectedPartner?.name || "Nom non spécifié"}
                                          </span>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>

                                <PartnerAccordionItem
                                    id="3"
                                    Icon={<Link className="svg-wrapper text-secondary" />}
                                    title="Site Web"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <a
                                                href={selectedPartner?.link || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="value"
                                            >
                                                {selectedPartner?.link || "Lien non disponible"}
                                            </a>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>

                                <PartnerAccordionItem
                                    id="4"
                                    Icon={<Link className="svg-wrapper text-success" />}
                                    title="type du Partenaire"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <a
                                                href={selectedPartner?.type || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="value"
                                            >
                                                {selectedPartner?.type || "type non disponible"}
                                            </a>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>



                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default PartnerInfo;
