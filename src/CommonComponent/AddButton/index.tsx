import React, {useState} from "react";
import { Spinner } from "reactstrap";
import {useRouter} from "next/navigation";

const AddButton : React.FC<{link : string, name: string}> = ({link, name}) => {

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

        <button
            className={'btn btn-outline-primary'}
            onClick={handleClick}
        >
            {loading ? <Spinner size="sm"/> : <i className="fa fa-plus"></i>}
            <span className={'ms-2'}>{name}</span>
        </button>

    )
}

export default AddButton;