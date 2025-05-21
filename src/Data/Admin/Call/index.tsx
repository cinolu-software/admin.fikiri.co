import React, {useState} from 'react';
import { CallInstance} from "@/Types/Call/CallType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeleteCall, setSelectedCall, publishCall, unpublishCall} from "@/Redux/Reducers/CallSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/Services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner, Button} from 'reactstrap';
import { Flip, toast } from "react-toastify";

const CallListTableName : React.FC<{ image: string, name: string }> = ({image, name}) => {
  
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const CallListTableAction: React.FC<{ call: CallInstance; isPublished?: boolean }> = ({ call, isPublished }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  const handleEdit = async () => {
    setLoadingEdit(true);
    router.push(`/admin/call/edit_call`);
    dispatch(setSelectedCall(call));
  };

  const handleDetail = async () => {
    setLoadingDetail(true);
    router.push(`/admin/call/detail_call`);
    dispatch(setSelectedCall(call));
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    dispatch(setModalDeleteCall({ isOpen: true, call }));
    setLoadingDelete(false);
  };

  const handlePublish = async () => {
    try {
      setLoadingPublish(true);
      setTimeout(async () => {
        if (isPublished) {
          await dispatch(unpublishCall({ callId: call.id }));
          toast.success('Appel dépublié avec succès', {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER,
            transition: Flip,
          });
        } else {
          await dispatch(publishCall({ callId: call.id }));
          toast.success('Appel publié avec succès', {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER,
            transition: Flip,
          });
        }
        setLoadingPublish(false);
      }, 1000);
    } catch (e) {
      setLoadingPublish(false);
      toast.error('Une erreur est survenue', {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
      });
    }
  };

  return (
    <div className="product-action">
      <div className="row w-100 justify-content-center g-2">
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <Button
            color="primary"
            outline
            onClick={handleEdit}
            disabled={loadingEdit}
            className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
            style={{
                padding: '6px 10px',
                borderRadius: '8px',
                width: '100%',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            }}
          >
            {loadingEdit ? (
              <Spinner size="sm" className="flex-shrink-0" />
            ) : (
                <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
            )}
            <span className="text-truncate">Modifier</span>
          </Button>
        </div>
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <Button
            color="info"
            outline
            onClick={handleDetail}
            disabled={loadingDetail}
            className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
            style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
          >
{loadingDetail ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="moreTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Détails</span>
          </Button>
        </div>
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <Button
            color={isPublished ? 'warning' : 'success'}
            outline
            onClick={handlePublish}
            disabled={loadingPublish}
            className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
            style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            }}
          >
            {loadingPublish ? (
              <Spinner size="sm" className="flex-shrink-0" />
            ) : (
              <SVG iconId={isPublished ? 'unpublish_call' : 'publish_call'} />
            )}
            <span className="text-truncate">{isPublished ? 'Dépublier' : 'Publier'}</span>
          </Button>
        </div>
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <Button
            color="danger"
            outline
            onClick={handleDelete}
            disabled={loadingDelete}
            className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
            style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            }}
          >
            {
              loadingDelete ? <Spinner size="sm" className="flex-shrink-0"  /> : <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0"/>
              
            }
            <span className="text-truncate">Supprimer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};


export const CallListTableDataColumn : TableColumn<CallInstance>[] = [
    {
        name: "Nom",
        cell: (row: CallInstance) => (
            <CallListTableName
                image={row?.cover ? `${imageBaseUrl}/calls/covers/${row.cover}` : '/assets/images/calls/call.jpg'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: CallInstance) => {
            const date = new Date(row.started_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: CallInstance) => {
            const date = new Date(row.ended_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },

    {
        name: "Actions",
        cell: (row: CallInstance) => <CallListTableAction call={row} />,
        grow: 2
    },
];

export const PublishedCallListTableDataColumn : TableColumn<CallInstance>[] = [
    {
        name: "Nom",
        cell: (row: CallInstance) => (
            <CallListTableName
                image={row?.cover ? `${imageBaseUrl}/calls/covers/${row.cover}` : '/assets/images/calls/call.jpg'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: CallInstance) => {
            const date = new Date(row.started_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: CallInstance) => {
            const date = new Date(row.ended_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: CallInstance) => <CallListTableAction call={row} isPublished={true} />,
        grow: 2
    },
];
