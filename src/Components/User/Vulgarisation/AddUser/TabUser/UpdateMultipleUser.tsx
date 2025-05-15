import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { fetchUsers, updateMultipleUsers } from '@/Redux/Reducers/UserSlice';
import { fetchRole } from '@/Redux/Reducers/RoleSlice';
import { UpdateManyUserType } from '@/Types/User/UserType';
import Select from 'react-select';
import { Flip, toast, ToastContainer } from 'react-toastify';

interface OptionType {
    value: string;
    label: string;
}

const UpdateMultiple = () => {

    const dispatch = useAppDispatch();
    const { usersData, statusUsers } = useAppSelector((state) => state.user);
    const { dataRoles, statusRole } = useAppSelector((state) => state.role);

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);

    const userOptions: OptionType[] = usersData.map(user => ({
        value: user.id,
        label: `${user.name} - ${user.email}`,
    }));

    const roleOptions: OptionType[] = dataRoles.map(role => ({
        value: role.id,
        label: role.name,
    }));

    useEffect(() => {
        if (statusUsers === 'idle') dispatch(fetchUsers());
        if (statusRole === 'idle') dispatch(fetchRole());
    }, [dispatch, statusUsers, statusRole]);

    useEffect(() => {
        if (!selectedUserIds.length) {
            setSelectedRoleIds([]);
            return;
        }

        const selectedUsers = usersData.filter(user => selectedUserIds.includes(user.id));
        const initialRoles = selectedUsers.reduce((acc: string[], user) => {
            const userRoles = user.roles.map(role => role.id);
            return acc.length === 0
                ? userRoles
                : userRoles.filter(role => acc.includes(role));
        }, []);

        setSelectedRoleIds(initialRoles);
    }, [selectedUserIds, usersData]);

    const handleUserSelect = (selectedOptions: OptionType[] | null) => {
        setSelectedUserIds(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleRoleSelect = (selectedOptions: OptionType[] | null) => {
        setSelectedRoleIds(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSubmit = () => {
        const payload: UpdateManyUserType = {
            ids: selectedUserIds,
            data: usersData
                .filter(user => selectedUserIds.includes(user.id))
                .map(user => ({
                    email: user.email,
                    name: user.name,
                    phone_number: user.phone_number,
                    address: user.address,
                    organisation: '',
                    roles: selectedRoleIds,
                })),      
        };

        dispatch(updateMultipleUsers(payload))
            .then(() => {
                setSelectedUserIds([]);
                setSelectedRoleIds([]);

                toast.success(
                    <p className="text-white tx-16 mb-0">{"Mise à jour effectuée avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
            .catch((error) => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur lors de la mise à jour"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            });
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="mb-6 mb-4">
                <label htmlFor="users" className="block mb-2 font-medium">
                   <h5> Utilisateurs à modifier :</h5>
                </label>
                <Select
                    id="users"
                    isMulti
                    options={userOptions}
                    value={userOptions.filter(option => selectedUserIds.includes(option.value))}
                    //@ts-ignore
                    onChange={handleUserSelect}
                    placeholder="Sélectionner des utilisateurs..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>

            <div className="mb-6 mb-4">
                <label htmlFor="roles" className="block mb-2 font-medium">
                    <h5>Rôles à appliquer :</h5>
                </label>
                <Select
                    id="roles"
                    isMulti
                    options={roleOptions}
                    value={roleOptions.filter(option => selectedRoleIds.includes(option.value))}
                    //@ts-ignore
                    onChange={handleRoleSelect}
                    placeholder="Sélectionner des rôles..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={!selectedUserIds.length || statusUsers === 'loading'}
                className='btn btn-outline-primary'
            >
                {statusUsers === 'loading' ? 'Envoi en cours...' : 'Mettre à jour'}
            </button>
            <ToastContainer />
        </div>
    );
};

export default UpdateMultiple;