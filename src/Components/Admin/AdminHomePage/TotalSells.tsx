import {useEffect} from 'react';
import Stat from '@/Components/Admin/AdminHomePage/Stat';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {fetchCall, fetchPublishedCall} from "@/Redux/Reducers/CallSlice";
import {fetchUsers} from "@/Redux/Reducers/UserSlice";
import {fetchStat} from '@/Redux/Reducers/StatSlice';
import {Row, Col} from "reactstrap";


const TotalSells = () => {

    const {totalAllCall, totalPublishedCall} = useAppSelector(state => state.call);
    const {statData, status} = useAppSelector(state => state.stat);
    const {totalUsers} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            if (totalAllCall === null) {
                dispatch(fetchCall());
            }
            if (totalPublishedCall === null) {
                dispatch(fetchPublishedCall());
            }
        },
        [dispatch, totalAllCall, totalPublishedCall]
    );

    useEffect(
        () => {
            if (totalUsers === null) {
                dispatch(fetchUsers());
            }
        },
        [dispatch, totalUsers]
    );

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStat());
        }
    }, [dispatch, status]);


    return (
        <Row>
            <Stat className={"total-sells"} title={"Nombre Total d'appels"} image={"opportunity.png"} count={Number(statData.calls)} icon={"fa-arrow-up"} color={"success"}/>
            <Stat className={"total-sells-2"} title={"Nombre Total d'appels publiés"} image={"bublishedOpportunity.png"} count={Number(statData.publishedCalls)} icon={"fa-arrow-down"} color={"danger"}/>
            <Stat className={"total-sells-4"} title={"Nombre Total d'utilisateurs"} image={"users.png"} count={Number(statData.users)} icon={"fa-arrow-down"} color={"danger"}/>
            <Stat className={"total-sells-3"} title={"Nombre Total de solutions"} image={"applications.png"} count={Number(statData.solutions)} icon={"fa-arrow-down"} color={"danger"}/>
        </Row>
    );
};

export default TotalSells;
