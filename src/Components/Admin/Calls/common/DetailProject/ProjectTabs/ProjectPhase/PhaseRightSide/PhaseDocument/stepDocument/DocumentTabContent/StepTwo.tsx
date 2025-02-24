import React from 'react';
import UploadDocument from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent/UploadDocument";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addAttachmentDocumentFile } from "@/Redux/Reducers/projectSlice/ProjectDocumentSlice";

const StepTwo = () => {
    const dispatch = useAppDispatch();
    const { selectedProjectPhase } = useAppSelector((state) => state.projectPhase);

    if (!selectedProjectPhase) {
        return <p>Phase non sélectionnée.</p>;
    }

    const handleUploadFile = (documentId: string, file: File) => {
        dispatch(addAttachmentDocumentFile({ documentId, file }));
    };


    return (
        <div className="mt-5">
            <h3 className="text-lg font-semibold mb-4">Documents de la phase : {selectedProjectPhase.name}</h3>

            {selectedProjectPhase.documents.length === 0 ? (
                <p>Aucun document disponible pour cette phase.</p>
            ) : (
                <ul className="space-y-4">
                    {selectedProjectPhase.documents.map((document: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }) => (
                        <li key={document.id} className="border-b pb-4">
                            <div className="mb-2">
                                <h4 className="text-md font-bold">{document.title}</h4>
                                <p className="text-sm text-gray-600">{document.description}</p>
                            </div>

                            <UploadDocument
                                // @ts-ignore
                                documentId={document.id}
                                // @ts-ignore
                                onUpload={(file: File) => handleUploadFile(document.id, file)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StepTwo;
