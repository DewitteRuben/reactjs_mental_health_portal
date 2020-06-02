import React from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
} from "@material-ui/core";
import QRCode from "qrcode.react";
import clsx from "clsx";
import { IRootState } from "../redux/store";
import {
  selectClientById,
  selectAuthStatus,
  selectAuthenticated,
} from "../redux/selectors/authSelectors";
import { connect } from "react-redux";
import { IClient } from "../api/authApi";
import { AuthStatus } from "../redux/reducers/authReducer";
import Loading from "../components/Loading";
import { ThunkDispatch } from "redux-thunk";
import { fetchMoodEntriesByUserId } from "../redux/actions/moodActions";
import MoodEntriesList from "../components/MoodEntriesList";
import {
  selectMoodLoading,
  selectMoodStatus,
  selectMoodEntriesDateAsc,
} from "../redux/selectors/moodSelectors";
import { IMoodStatus, IMoodEntry } from "../redux/reducers/moodReducer";
import MoodEntriesGraph from "../components/MoodEntriesGraph";
import moment from "moment";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(2),
    },
  })
);

interface IClientDetailProps {
  getClientById: (userId: string) => IClient | undefined;
  fetchEntriesByUserId: (userId: string) => void;
  authenticated: boolean;
  status: AuthStatus;
  moodStatus: IMoodStatus;
  moodLoadingState: boolean;
  entries: IMoodEntry[];
}

const ClientDetail: React.FC<IClientDetailProps> = ({
  getClientById,
  authenticated,
  status,
  fetchEntriesByUserId,
  entries,
  moodStatus,
}) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("clientDetails");
  const { id } = useParams<{ id: string }>();
  const client = getClientById(id);

  React.useEffect(() => {
    if (id) {
      fetchEntriesByUserId(id);
    }
  }, [fetchEntriesByUserId, id]);

  if (status === "ESTABLISHING" || moodStatus === "FETCHING") {
    return <Loading />;
  }

  if (!id || !client) {
    return <Redirect to="/" />;
  }

  const onTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const { userId, email, firstName, lastName, birthDate } = client;

  return (
    <Container>
      <Paper className={styles.paper} square>
        <Tabs
          value={value}
          onChange={onTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Client details" value="clientDetails" />
          <Tab label="Mood Entries" value="moodEntries" />
          <Tab label="Tasks" value="tasks" />
        </Tabs>
      </Paper>
      <Paper className={clsx(styles.paper, styles.content)}>
        <TabPanel value={value} index="clientDetails">
          <Box display="flex">
            <Box display="flex" flexDirection="column" alignItems="center">
              <QRCode size={192} value={id} />
              <Typography>{userId}</Typography>
            </Box>
            <Box marginRight={2} />
            <div>
              <Typography>Email: {email}</Typography>
              <Typography>First name: {firstName}</Typography>
              <Typography>Last name: {lastName}</Typography>
              <Typography>
                Birthdate: {moment(birthDate).format("LL")}
              </Typography>
            </div>
          </Box>
        </TabPanel>
        <TabPanel value={value} index="moodEntries">
          <MoodEntriesList entries={entries} />
          <Box marginTop={2} />
          <MoodEntriesGraph entries={entries} />
        </TabPanel>
        <TabPanel value={value} index="tasks">
          Item Three
        </TabPanel>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  authenticated: selectAuthenticated(state),
  status: selectAuthStatus(state),
  getClientById: (userId: string) => selectClientById(userId)(state),
  entries: selectMoodEntriesDateAsc(state),
  moodLoadingState: selectMoodLoading(state),
  moodStatus: selectMoodStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchEntriesByUserId: (userId: string) =>
    dispatch(fetchMoodEntriesByUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
