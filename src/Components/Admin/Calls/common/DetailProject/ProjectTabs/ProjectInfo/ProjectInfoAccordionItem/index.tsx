import React from 'react';
import { ChevronDown } from 'react-feather';
import { AccordionHeader, AccordionItem, AccordionBody } from 'reactstrap';

interface ProjectInfoAccordionItemProps {
    id: string;
    Icon: React.ReactNode;
    title: string;
    ContentComponent?: React.ComponentType<any>;
    children?: React.ReactNode;
}

const ProjectInfoAccordionItem: React.FC<ProjectInfoAccordionItemProps> = ({id, Icon, title, ContentComponent, children,}) => {
    return (
        <AccordionItem className="bg-light">
            <AccordionHeader
                targetId={id}
                className="gap-2 bg-light-primary text-primary accordion-header"
            >
                {Icon}
                <span className="text-success ms-2 fw-bold">{title}</span>
                <ChevronDown className="svg-color text-success" />
            </AccordionHeader>
            <AccordionBody accordionId={id}>
                {ContentComponent ? <ContentComponent /> : children}
            </AccordionBody>
        </AccordionItem>
    );
};

export default ProjectInfoAccordionItem;
