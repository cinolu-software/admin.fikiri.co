import React from 'react';
import ReviewNavTab from './ReviewNavTab';

const TabsHeader: React.FC<{navId: string, setNavId: React.Dispatch<React.SetStateAction<string>>}> = ({navId, setNavId}) => {

    return(
        <div className={'mail-header-wrapper'}>
            <div className={'mail-header'}>
                <div className={'form-check form-check-inline m-0'}>
                    <ReviewNavTab navId={navId} setNavId={setNavId} />
                </div>
            </div>
        </div>
    )
}

export default TabsHeader