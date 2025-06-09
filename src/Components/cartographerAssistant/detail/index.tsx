import { CardBody, Card, Row, Container  } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import BackButton from "@/CommonComponent/BackButton";

const Detail = () => {

    const dispatch = useAppDispatch();
    const { selectedUser } = useAppSelector(state => state.user);


    return (
        <Container  fluid>
            <Row className="mb-3 ">
                <BackButton link={'/cartographerAssistant/list'} />

                <Card >
                    <h1>Test</h1>
                </Card>
            </Row>
        </Container>
    )
}

export default Detail;