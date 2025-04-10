import {useEffect} from 'react';
import Stat from '@/Components/Admin/AdminHomePage/Stat';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {fetchCall, fetchPublishedCall} from "@/Redux/Reducers/CallSlice";


const TotalSells = () => {

    const { totalAllCall, totalPublishedCall } = useAppSelector(state=>state.call);
    const dispatch = useAppDispatch();

    useEffect(
        ()=>{
            if(totalAllCall === null){
                dispatch(fetchCall());
            }
            if(totalPublishedCall === null){
                dispatch(fetchPublishedCall());
            }
        },
        [dispatch, totalAllCall, totalPublishedCall]
    );

  
  return (
    <>
        {
            totalAllCall !== null &&
            <Stat
                className={"total-sells"}
                title={"Nombre Total d'appels"}
                image={"opportunity.png"}
                count={totalAllCall}
               icon={"fa-arrow-up"}
                color={"success"}
            />
        }
        {
            totalPublishedCall !== null &&
            <Stat
                className={"total-sells-2"}
                title={"Nombre Total d'appels publiés"}
                image={"bublishedOpportunity.png"}
                count={totalPublishedCall}
                icon={"fa-arrow-down"}
                color={"danger"}
            />

        }
      {/*<Stat className={"total-sells-3"} title={"Nombre Total de candidatures"} image={"applications.png"} count={1000} icon={"fa-arrow-up"} color={"success"} />*/}
      {/*<Stat className={"total-sells-4"} title={"Nombre Total d'utilisateurs"} image={"bublishedOpportunity.png"} count={20} icon={"fa-arrow-down"} color={"danger"} />*/}
    </>
  );
};

export default TotalSells;
