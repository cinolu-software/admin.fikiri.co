import React, {useEffect, useState} from "react";
import {Badge, Col, Row, TabPane, TabContent, Input, Label} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchApplicationByproject } from "@/Redux/Reducers/projectSlice/ProjectApplicationSlice";
import {applicationData} from "@/Data/Application/application";
import {generateSmartShortName} from "@/utils";


const PhaseApplications: React.FC<{ navId: string }> = ({ navId }) => {

    const {selectedProject} = useAppSelector(state => state.project);
    const { status, ApplicationPhaseData, page } = useAppSelector(state => state.PhaseApplication);
    const dispatch = useAppDispatch();


    useEffect(
        ()=>{
            dispatch(fetchApplicationByproject(selectedProject?.id as string));
        }, 
        [selectedProject]
    );

    return (
        <TabPane tabId="audience-tab">
            <div className="mb-4 bg-white mt-5 ps-5">
                <div className="mail-body-wrapper">
                    <ul>
                        { ApplicationPhaseData &&
                            ApplicationPhaseData.map((item, index) => (
                                <li className={`inbox-data`} key={index}>
                                    <div className="inbox-user">
                                        <div className={'rounded-border'}>
                                            <div className={'circle-success'}>
                                                <p className={'txt-primary'}> {generateSmartShortName(item.applicant.name as string)}</p>
                                            </div>
                                        </div>
                                        <p>{item.applicant.name}</p>
                                    </div>
                                    <div className="inbox-message">
                                        {/*<div className="email-data" >*/}
                                        {/*    <span>*/}
                                        {/*      {data.message}*/}
                                        {/*        <span>{data.subMessage}</span>*/}
                                        {/*    </span>*/}
                                        {/*    <div className="inbox-width d-flex gap-2">*/}
                                        {/*        {data.badge &&*/}
                                        {/*            data.badge.map((item, i) => (*/}
                                        {/*                <Badge color="" className={`badge-width badge-light-${item.color} text-${item.color === "light" ? "light-dark" : item.color }`} key={i}>{item.title}</Badge>*/}
                                        {/*            ))}*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="email-timing">*/}
                                        {/*    <span>{data.time}</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </TabPane>
    )
}

export default PhaseApplications;