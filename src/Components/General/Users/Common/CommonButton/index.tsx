import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setNavId, setTabId} from "@/Redux/Reducers/UserSlice";
import { Button } from "reactstrap";

const CommonButton = () => {

    const {navId,formValue,tabId} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch()

    const handleFormValue = () => {
        dispatch(setNavId(2))
    }

    const handlePrevious = () => {
       dispatch(setNavId(1))
    }

    return (
        <div className="product-buttons border-0">
            {navId > 1 &&
                <Button color="transparent" onClick={()=>handlePrevious()}>
                    <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <SVG iconId="back-arrow"/>{'Precédent'}</div>
                </Button>
            }
            <Button color="transparent" className="ms-2" onClick={()=>handleFormValue()} disabled={tabId>2}>
                <div className="d-flex align-items-center gap-sm-2 gap-1">{tabId === 3 ? "Envoyer" : "Suivant"}
                    <SVG iconId="front-arrow" />
                </div>
            </Button>
        </div>
    );
};

export default CommonButton;