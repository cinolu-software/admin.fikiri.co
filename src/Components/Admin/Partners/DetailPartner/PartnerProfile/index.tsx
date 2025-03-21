import {ImagePath} from "@/Constant";
import React, {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {Card, CardBody, Row} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import {imageBaseUrl} from "@/Services/axios";


const PartnerProfile = () => {

    const router = useRouter();
    const {selectedPartner} = useAppSelector(state => state.partner);

    useEffect(() => {
        if (!selectedPartner) router.push('/partners');
    }, [selectedPartner]);


    return (
        <>
            <Row>
                <Card>
                    <CardBody className="text-center position-relative bg-gradient  rounded-top">
                        <div className="position-relative d-inline-block ">
                            <img
                                className="rounded-circle border border-3 border-light shadow-lg"
                                src={selectedPartner?.logo ? `${imageBaseUrl}/partners/${selectedPartner.logo}` : `/assets/images/calls/patners.jpg`}
                                alt="Profile Image"
                                width="120" height="120"
                                style={{objectFit: 'cover'}}
                            />
                        </div>
                        <h5 className="mt-3 text-uppercase font-weight-bold"
                            style={{color: '#343a40', letterSpacing: '1px'}}>
                            {selectedPartner?.name}
                        </h5>

                        <div className="d-flex justify-content-center mb-3">
                            <span className="border border-light rounded-pill" style={{width: '40px'}}></span>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    );
}

export default PartnerProfile;