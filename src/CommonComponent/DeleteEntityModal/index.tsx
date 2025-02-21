import React from 'react';
import {ImagePath} from '@/Constant';
import {Button, CardBody, Col} from 'reactstrap';
import CommonModal from '@/CommonComponent/CommonModalType/CommonModal';
import {useAppDispatch, useAppSelector} from '@/Redux/Hooks';
import {toast, Flip} from 'react-toastify';


const DeleteEntityModal = ({isOpen, entityName, selectedEntity, entities, setModalAction, deleteEntityThunk}: {
    isOpen: boolean;
    entityName: string;
    selectedEntity: { id?: string; name?: string } | null;
    entities: { id: string; name: string }[];
    setModalAction: (payload: { isOpen: boolean; entity?: any | null }) => any;
    deleteEntityThunk: (id: string) => any;
}) => {
    const dispatch = useAppDispatch();

    const selectedEntityData = entities.find((item) => item.id === selectedEntity?.id);

    const handleDelete = () => {

        if (selectedEntityData && selectedEntityData.id !== undefined) {
            dispatch(deleteEntityThunk(selectedEntityData.id))
                .then(() => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">
                            {`${entityName} a été supprimé avec succès`}
                        </p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: 'colored',
                        }
                    );
                    dispatch(setModalAction({isOpen: false, entity: null}));
                })
                .catch(() => {
                    toast.error(
                        <p className="text-white tx-16 mb-0">
                            {`Erreur survenue lors de la suppression de ${entityName}`}
                        </p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: 'colored',
                        }
                    );
                });
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpen}
                    toggle={() => dispatch(setModalAction({isOpen: false, entity: null}))}
                    title={`Supprimer ${entityName}`}
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger"/>
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            Êtes-vous sûr de vouloir supprimer {entityName} ?
                        </h4>
                        {selectedEntity && (
                            <p className="text-center">
                                Vous êtes sur le point de supprimer {entityName} :{' '}
                                <strong>{selectedEntity?.name}</strong>
                            </p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <button

                                className="me-2 btn btn-outline-secondary"
                                onClick={() => dispatch(setModalAction({isOpen: false, entity: null}))}
                            >
                                Fermer
                            </button>
                            <button className={'btn btn-outline-danger'} onClick={handleDelete}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </CommonModal>
            </CardBody>
        </Col>
    );
};

export default DeleteEntityModal;