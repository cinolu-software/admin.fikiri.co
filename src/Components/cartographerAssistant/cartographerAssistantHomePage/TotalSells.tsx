import {useEffect} from 'react';
import Stat from '@/Components/Admin/AdminHomePage/Stat';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import { fetchCountByOutreachers, fetchUsers } from '@/Redux/Reducers/UserSlice';
import {Row} from "reactstrap";


const TotalSells = () => {

    const {outReachersStatus, outReachersTotal, statusUsers  } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    useEffect(
        ()=>{
            if (outReachersStatus === "idle") {
                dispatch(fetchCountByOutreachers());
            }
            if( statusUsers === "idle" ) {
                dispatch(fetchUsers());
            }
        }, 
        [outReachersStatus, statusUsers]
    )

    return (
        <Row>
            <Stat className={"total-sells"} title={"Nombre Total de vulgarisateurs"} image={"users.png"} count={outReachersTotal} icon={"fa-arrow-up"} color={"success"}/>
        </Row>
    );
};

export default TotalSells;
