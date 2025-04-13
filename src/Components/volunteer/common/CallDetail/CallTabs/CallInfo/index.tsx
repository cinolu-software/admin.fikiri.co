import React, { useState } from 'react';
import {Container, TabPane} from 'reactstrap';
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import { submitSolution } from '@/Redux/Reducers/CallSlice/CallApplication';
import CallCardCover from "@/Components/volunteer/common/CallDetail/CallTabs/Components/CallCardCover";
import CallRequirement from "@/Components/volunteer/common/CallDetail/CallTabs/Components/CallRequirement";
import CallDescription from "@/Components/volunteer/common/CallDetail/CallTabs/Components/CallDescription";
import CallFormApplication from "@/Components/volunteer/common/CallDetail/CallTabs/Components/CallFormApplication";


const CallInfo = () => {

  const { selectedCall } = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  if (!selectedCall) {
    return <p className="text-center text-muted">Aucun appel sélectionné.</p>;
  }

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      return updatedValues;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    for (const field of selectedCall.form) {
      if (field.required && !formValues[field.label]) {
        setErrorMessage(`Le champ "${field.label}" est requis.`);
        return;
      }
    }

    const responses = selectedCall.form.reduce((acc, field) => {

      if (field.label && formValues[field.label] !== undefined) {
        //@ts-ignore
        acc[field.label] = formValues[field.label];
      } else {
        console.warn(`Champ ${field.label} manquant ou sans valeur.`);
      }
      return acc;
    }, {});

    dispatch(
      submitSolution({
        call: selectedCall.id,
        responses, 
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSuccessMessage('Soumission réussie !');
        setFormValues({});
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Erreur lors de la soumission.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    });
  };

  return (
    <TabPane tabId="1">
      <Container className="mt-4 ms-3 pe-5" fluid>
        <CallCardCover selectedCall={selectedCall} />
        <CallDescription selectedCall={selectedCall} />
        <CallRequirement selectedCall={selectedCall} />
        <CallFormApplication selectedCall={selectedCall} formValues={formValues} handleChange={handleChange} handleSubmit={handleSubmit} successMessage={successMessage} errorMessage={errorMessage}/>
      </Container>
    </TabPane>
  );
};

export default CallInfo;
