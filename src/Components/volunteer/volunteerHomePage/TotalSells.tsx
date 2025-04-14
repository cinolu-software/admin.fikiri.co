import {useEffect} from 'react';
import Stat from '@/Components/Admin/AdminHomePage/Stat';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {fetchCall, fetchPublishedCall} from "@/Redux/Reducers/CallSlice";
import {fetchApplicationByUser} from "@/Redux/Reducers/CallSlice/CallApplication";


const TotalSells = () => {

    const {applicationDataByUser, applicationByUserStatus} = useAppSelector(state=>state.application);
    const dispatch = useAppDispatch();
    const {userData} = useAppSelector(state=>state.authentication);

    useEffect(
        ()=>{
            if(applicationByUserStatus == 'idle'){
                if(applicationByUserStatus == 'idle' && userData) {
                    dispatch(fetchApplicationByUser({userId:userData.id}));
                }
            }
        },
        [dispatch, userData, applicationByUserStatus]
    );

  
  return (
    <>
        {
            applicationDataByUser !== null &&
            <Stat
                className={"total-sells"}
                title={"Nombre d'application"}
                image={"opportunity.png"}
                count={applicationDataByUser.length}
               icon={"fa-arrow-up"}
                color={"success"}
            />
        }
      {/*<Stat className={"total-sells-3"} title={"Nombre Total de candidatures"} image={"applications.png"} count={1000} icon={"fa-arrow-up"} color={"success"} />*/}
      {/*<Stat className={"total-sells-4"} title={"Nombre Total d'utilisateurs"} image={"bublishedOpportunity.png"} count={20} icon={"fa-arrow-down"} color={"danger"} />*/}
    </>
  );
};

export default TotalSells;
