import React, {useState} from "react";
import {Spinner, Row, Col} from "reactstrap";
import {useRouter} from "next/navigation";

const BackButton : React.FC<{link : string}> = ({link}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.push(link);
        }, 100);
    };

    return (
        <Row className={'mb-4'}>
            <Col className={'d-flex justify-content-end'}>
                <button
                    className={'btn btn-outline-primary'}
                    onClick={handleClick}
                >
                    {loading ? <Spinner size="sm"/> : <i className="fa fa-angle-left"></i>}
                    <span className={'ms-2'}>Retour</span>
                </button>
            </Col>
        </Row>
    )
}

export default BackButton;