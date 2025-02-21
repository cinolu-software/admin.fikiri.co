import React from "react";

const AddWithModalButton : React.FC<{
    buttonText: string;
    onClick : () => void;
}> = ({onClick, buttonText}) => {

    return (
        <div>
            <button
                className="btn btn-outline-primary"
                onClick={onClick}
            >
                <i className="fa fa-plus"/>
                <span className={'ms-2'}>{buttonText}</span>
            </button>
        </div>
    )
}

export default AddWithModalButton;