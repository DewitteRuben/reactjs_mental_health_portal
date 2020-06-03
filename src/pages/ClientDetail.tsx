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
} from "@material-ui/core";
import clsx from "clsx";
import { IRootState } from "../redux/store";
import {
  selectClientById,
  selectAuthStatus,
} from "../redux/selectors/authSelectors";
import { connect } from "react-redux";
import { IClient } from "../api/authApi";
import { AuthStatus } from "../redux/reducers/authReducer";
import Loading from "../components/Loading";
import { ThunkDispatch } from "redux-thunk";
import { fetchMoodEntriesByUserId } from "../redux/actions/moodActions";
import MoodEntriesList from "../components/MoodEntriesList";
import {
  selectMoodStatus,
  selectMoodEntriesDateAsc,
  selectNeedsReload,
} from "../redux/selectors/moodSelectors";
import { IMoodStatus, IMoodEntry } from "../redux/reducers/moodReducer";
import MoodEntriesGraph from "../components/MoodEntriesGraph";
import TaskTable from "../components/TaskTable";
import { selectTasks } from "../redux/selectors/taskSelectors";
import { fetchTasks } from "../redux/actions/taskActions";
import { ITask } from "../redux/reducers/taskReducer";
import TabPanel from "../components/TabPanel";
import ClientInfo from "../components/ClientInfo";

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
  fetchTasksByUserId: (userId: string) => void;
  authStatus: AuthStatus;
  moodStatus: IMoodStatus;
  entries: IMoodEntry[];
  tasks: ITask[];
  isDifferentUser: (userId: string) => boolean;
}

const ClientDetail: React.FC<IClientDetailProps> = ({
  getClientById,
  authStatus,
  fetchEntriesByUserId,
  fetchTasksByUserId,
  entries,
  tasks,
  moodStatus,
  isDifferentUser,
}) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("clientDetails");
  const { id } = useParams<{ id: string }>();
  const client = getClientById(id);

  React.useEffect(() => {
    if (id) {
      fetchEntriesByUserId(id);
      fetchTasksByUserId(id);
    }
  }, [fetchEntriesByUserId, fetchTasksByUserId, id]);

  if (
    isDifferentUser(id) ||
    authStatus === "ESTABLISHING" ||
    moodStatus === "FETCHING"
  ) {
    return <Loading />;
  }

  if (!id || !client) {
    return <Redirect to="/" />;
  }

  const onTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

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
          <ClientInfo client={client} />
        </TabPanel>
        <TabPanel value={value} index="moodEntries">
          <MoodEntriesList entries={entries} />
          <Box marginTop={2} />
          <MoodEntriesGraph entries={entries} />
        </TabPanel>
        <TabPanel value={value} index="tasks">
          <TaskTable tasks={tasks} userId={id} />
        </TabPanel>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  authStatus: selectAuthStatus(state),
  getClientById: (userId: string) => selectClientById(userId)(state),
  entries: selectMoodEntriesDateAsc(state),
  tasks: selectTasks(state),
  moodStatus: selectMoodStatus(state),
  isDifferentUser: (userId: string) => selectNeedsReload(userId)(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchEntriesByUserId: (userId: string) =>
    dispatch(fetchMoodEntriesByUserId(userId)),
  fetchTasksByUserId: (userId: string) => dispatch(fetchTasks(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
