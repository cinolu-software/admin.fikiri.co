import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import NumberingWizard from "@/Components/Admin/Calls/common/Common/NumberingWizard";
import {fetchCallById} from "@/Redux/Reducers/CallSlice";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";

const EditCallContainer = () => {

    const {selectedCall} = useAppSelector(state => state.call);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (selectedCall === null) {
            router.push('/admin/call');
        } else {
            if (selectedCall?.id) {
                dispatch(fetchCallById(selectedCall?.id));
            }
        }
    }, []);

    return (
        <Container fluid>
            <Row>
                <NumberingWizard mode={'edit'} initialValues={selectedCall}  />
            </Row>
        </Container>
    );
};

export default EditCallContainer;
