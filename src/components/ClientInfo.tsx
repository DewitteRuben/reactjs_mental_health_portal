import React from "react";
import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import QRCode from "qrcode.react";
import { IClient } from "../api/authApi";

interface IClientInfoProps {
  client: IClient;
}

const ClientInfo: React.FC<IClientInfoProps> = ({ client }) => {
  const { userId, email, firstName, lastName, birthDate } = client;

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" alignItems="center">
        <QRCode size={192} value={userId} />
        <Typography>{userId}</Typography>
      </Box>
      <Box marginRight={2} />
      <div>
        <Typography>Email: {email}</Typography>
        <Typography>First name: {firstName}</Typography>
        <Typography>Last name: {lastName}</Typography>
        <Typography>Birthdate: {moment(birthDate).format("LL")}</Typography>
      </div>
    </Box>
  );
};

export default ClientInfo;
