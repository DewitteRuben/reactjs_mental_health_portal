import React from "react";
import {
  Paper,
  Container,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import AddClientFormDialog, {
  IAddClientFormData,
} from "../components/AddClientFormDialog";
import { IRootState } from "../redux/store";
import { connect } from "react-redux";
import {
  selectAuthenticated,
  selectProfessionalClients,
  selectAuthError,
  selectAuthStatus,
} from "../redux/selectors/authSelectors";
import { ThunkDispatch } from "redux-thunk";
import { fetchAddClientToProfessional } from "../redux/actions/authActions";
import { IClient } from "../api/authApi";
import DeleteClientDialog from "../components/DeleteClientDialog";
import { AuthStatus } from "../redux/reducers/authReducer";
import ClientsTable from "../components/ClientsTable";
import ClientsTableToolbar from "../components/ClientsTableToolbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(2),
    },
    paper: {
      width: "100%",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    interactableRow: {
      cursor: "pointer",
    },
  })
);

interface IDashboardProps {
  authenticated: boolean;
  clients: IClient[];
  error: Error | null;
  status: AuthStatus;
  fetchAddClient: (
    email: string,
    firstName: string,
    lastName: string,
    birthDate: Date
  ) => void;
}

const Dashboard: React.FC<IDashboardProps> = ({
  authenticated,
  error,
  clients,
  fetchAddClient,
  status,
}) => {
  const styles = useStyles();
  const history = useHistory();

  const [modals, setModalState] = React.useState({
    addModal: false,
    deleteModal: false,
  });

  const [selectedId, setSelectedId] = React.useState("");

  if (!authenticated && status !== "ESTABLISHING") {
    return <Redirect to="/" />;
  }

  const updateModalState = (modal: keyof typeof modals) => (value: boolean) => {
    setModalState((modalState) => ({ ...modalState, [modal]: value }));
  };

  const handleOnClickAdd = () => {
    updateModalState("addModal")(true);
  };

  const handleOnClickDelete = (client: IClient) => {
    const { userId } = client;
    setSelectedId(userId);
    updateModalState("deleteModal")(true);
  };

  const handleOnClickRow = (client: IClient) => {
    const { userId } = client;
    history.push(`/client/${userId}`);
  };

  const handleAddClientFormSubmit = async (formData: IAddClientFormData) => {
    const { email, firstName, lastName, birthDate } = formData;
    try {
      fetchAddClient(email, firstName, lastName, birthDate);
      updateModalState("addModal")(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={styles.content}>
      <Paper className={styles.paper}>
        <ClientsTableToolbar onAdd={handleOnClickAdd} title="Your clients" />
        <ClientsTable
          clients={clients}
          onDelete={handleOnClickDelete}
          onClick={handleOnClickRow}
        />
      </Paper>
      <AddClientFormDialog
        onVisibilityChange={updateModalState("addModal")}
        onSubmit={handleAddClientFormSubmit}
        visible={modals.addModal}
      />
      <DeleteClientDialog
        userId={selectedId}
        onVisibilityChange={updateModalState("deleteModal")}
        visible={modals.deleteModal}
      />
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  authenticated: selectAuthenticated(state),
  clients: selectProfessionalClients(state),
  error: selectAuthError(state),
  status: selectAuthStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchAddClient: (
    email: string,
    firstName: string,
    lastName: string,
    birthDate: Date
  ) =>
    dispatch(
      fetchAddClientToProfessional(email, firstName, lastName, birthDate)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
