import React from 'react';
import {ChevronDown} from 'react-feather';
import {AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap';

interface PartnerAccordionItemProps {
    id: string;
    Icon: React.ReactNode;
    title: string;
    ContentComponent?: React.ComponentType<any>;
    children?: React.ReactNode;
}

const PartnerAccordionItem: React.FC<PartnerAccordionItemProps> = ({id, Icon, title, ContentComponent, children}) => {

    return (
        <AccordionItem className="bg-light">
            <AccordionHeader targetId={id} className="gap-2 bg-light-primary text-primary accordion-header">
                {/*{Icon}*/}
                <span className="text-secondary">{title}</span>
                <ChevronDown className="svg-color text-secondary"/>
            </AccordionHeader>
            <AccordionBody accordionId={id}>
                {ContentComponent ? <ContentComponent/> : children}
            </AccordionBody>
        </AccordionItem>
    );

};

export default PartnerAccordionItem;