import React, {useState} from 'react';
import {PartnerListTableColumnType, PartnerType} from "@/Types/Partners/PartnerType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeletePartner, setSelectedPartner} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import SVG from '@/CommonComponent/SVG';
import {useRouter} from "next/navigation";
import {Spinner} from "reactstrap";
import {imageBaseUrl} from "@/Services/axios";
import {Button} from "reactstrap";


const PartnerListTableName: React.FC<{image: string; name: string}> = ({image, name}) =>{
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <span className="text-dark text-truncate text-start"
                  style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.02rem',
                      transition: 'all 0.2s ease'
                  }}>
                {name}
            </span>
        </div>
    )
}

const PartnerListTableAction: React.FC<{partner: PartnerType}> = ({partner}) =>{

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleShowDetail = () =>{
        setLoadingDetail(true)
        router.push('/admin/partners/detail');
        dispatch(setSelectedPartner({partner}))
    }

    const handleEdit = () => {
        setLoadingEdit(true)
        router.push('/admin/partners/update')
        dispatch(setSelectedPartner({partner}))
    }

    const handleDelete = () => {
        setLoadingDelete(true)
        dispatch(setModalDeletePartner({isOpen: true, partner: partner}))
        setLoadingDelete(false)
    }

    return (
        <div className="product-action w-100">
            <div className="row w-100 g-2">

                <div className="col-12 col-md-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleEdit}
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


                <div className="col-12 col-md-4">
                    <Button
                        color="info"
                        outline
                        onClick={handleShowDetail}
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


                <div className="col-12 col-md-4">
                    <Button
                        color="danger"
                        outline
                        onClick={handleDelete}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDelete ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Supprimer</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const PartnerListTableDataColumn = [
    {
        name: "Partenaire",
        cell:(row: PartnerListTableColumnType) => <PartnerListTableName image={row?.logo ? `${imageBaseUrl}/partners/${row.logo}` : `/assets/images/calls/patners.jpg`} name={row.name}/>,
        sortable: true,
        grow: 1
    },
    {
        name: "Website link",
        cell:(row: PartnerListTableColumnType) => <div>{row.link}</div>,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: PartnerListTableColumnType) => <PartnerListTableAction partner={row}/>,
        sortable: false,
        grow: 1
    }
]