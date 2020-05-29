import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <Container>{id}</Container>;
};

export default ClientDetail;
