import React from 'react';
import AddButton from "@/CommonComponent/AddButton";

const PartnerList = () => {

    return (
        <div>
            <AddButton link={'/admin/partners/add'} name={'Ajouter un partenaire'}/>
        </div>
    )
}

export default PartnerList