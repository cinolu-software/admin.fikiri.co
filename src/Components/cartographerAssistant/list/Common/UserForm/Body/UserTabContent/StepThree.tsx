import React, { useEffect, useState } from 'react';
import { Col, Input } from 'reactstrap';
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import {setFormValue} from "@/Redux/Reducers/UserSlice";
import {fetchRole} from "@/Redux/Reducers/RoleSlice";
import {DataGetRoleType} from "@/Types/Role/RoleType";

const StepThree: React.FC<{selectedUser?: any}> = ({selectedUser}) => {

    const dispatch = useAppDispatch();

    const { formValue } = useAppSelector(state => state.user);
    const { dataRoles, statusRole } = useAppSelector(state => state.role);
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        selectedUser?.roles.map((role: DataGetRoleType) => role.id) || []
    );

    useEffect(() => {
        if (statusRole === 'idle') {
            dispatch(fetchRole());
        }
    }, [dispatch, statusRole]);


    useEffect(() => {
        if (formValue?.roles) {
            setSelectedRoles(formValue.roles);
        }
    }, [formValue?.roles]);


    const updateRoleChange = (roleId: string) => {
        const updatedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter((id) => id !== roleId)
            : [...selectedRoles, roleId];

        setSelectedRoles(updatedRoles);
        dispatch(setFormValue({ name: 'roles', value: updatedRoles }));
    };

    if (!dataRoles || dataRoles.length === 0) {
        return <p>Chargement des rôles...</p>;
    }

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {'Sélectionner'} <span className="txt-primary">{'le rôle de l’utilisateur'}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur le(s) rôle(s) que vous voulez attribuer à l'utilisateur
                    </p>
                </div>
                <div className="variation-box">
                    {dataRoles.map((role: DataGetRoleType) => (
                        <div className="selection-box" key={role.id}>
                            <Input
                                id={`role-${role.id}`}
                                type="checkbox"
                                checked={selectedRoles.includes(role.id)}
                                onChange={() => updateRoleChange(role.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{role.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepThree;
