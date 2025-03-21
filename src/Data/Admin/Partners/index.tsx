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


const PartnerListTableName: React.FC<{image: string; name: string}> = ({image, name}) =>{
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
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
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleEdit} >
                      <span>
                        {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
                      </span>
                    </button>
                </div>
                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleShowDetail}>
                      <span>
                        {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
                      </span>
                    </button>
                </div>
                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
                    </button>
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