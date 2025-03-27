import React from "react";
import { Alert, Button, Container } from "reactstrap";

const ErrorMessage = () => {


  return (
    <Container className="text-center mt-5 ">
      <Alert color="danger">
        <h4 className="alert-heading">⚠️ Token Expiré</h4>
        <p>
          Votre session a expiré ou le token est invalide. Veuillez vous reconnecter pour continuer.
        </p>
        
      </Alert>
    </Container>
  );
};

export default ErrorMessage;
