import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchReviewer } from "@/Redux/Reducers/ReviewerSlice";
import { Spinner, Container, Row, Col } from "reactstrap";
import ErrorMessage from "@/Components/review/ErrorMessage";
import DataTable from "react-data-table-component";
import {SolutionListTableDataColumn} from "@/Data/Review";

const Review = () => {

  const { token, status, data } = useAppSelector((state) => state.reviewer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchReviewer({ token }));
    }
  }, []);

  if (status === "loading") {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Chargement...</p>
      </Container>
    );
  }

  if (status === "failed") {
    return <ErrorMessage />;
  }

  return (
    <Container className="mt-5" fluid>
            <div className="list-product-header mb-4">
               <h4 className="mb-0">Liste de solutions à curer</h4>
            </div>
            <div className={'list-program'}>
                <div className={'table-responsive'}>
                    <DataTable
                        className="theme-scrollbar"
                        columns={SolutionListTableDataColumn}
                        data={data}
                        highlightOnHover
                        pagination
                        subHeader
                    />
                </div>
            </div>
    </Container>
  );

};

export default Review;
