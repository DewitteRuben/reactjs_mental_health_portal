import React from "react";
import { IMoodEntry } from "../redux/reducers/moodReducer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Chip,
  Theme,
  withStyles,
  StyledComponentProps,
} from "@material-ui/core";
import Smiley from "./Smiley";
import { capitalizeCamelCase } from "../utils/string";
import moment from "moment";
import _ from "lodash";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface IMoodEntriesListProps extends StyledComponentProps<"chip" | "list"> {
  entries: IMoodEntry[];
}

interface IMoodEntriesListState {
  selectedIndex: number;
}

const styles = (theme: Theme): Record<any, CSSProperties> => ({
  list: {
    maxHeight: 300,
    overflowY: "scroll",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

class MoodEntriesList extends React.Component<
  IMoodEntriesListProps,
  IMoodEntriesListState
> {
  state: IMoodEntriesListState = {
    selectedIndex: 0,
  };

  handleListItemClick = (index: number) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, entries } = this.props;
    const { selectedIndex } = this.state;

    const selectedEntry = entries[selectedIndex];

    return (
      <Box display="flex" flexWrap="wrap">
        <Box flex="1">
          <List className={classes?.list} component="nav">
            {entries.map((entry, index) => (
              <ListItem
                key={entry.entryId}
                button
                selected={selectedIndex === index}
                onClick={this.handleListItemClick(index)}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ListItemIcon>
                    <Smiley type={entry.mood} />
                  </ListItemIcon>
                  <Typography>{capitalizeCamelCase(entry.mood)}</Typography>
                </Box>
                <Box marginLeft={2}>
                  <ListItemText primary={moment(entry.date).format("LLL")} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginLeft={2} flex="2">
          <Typography>Emotions:</Typography>
          {selectedEntry.emotions.map((emotion) => (
            <Chip
              className={classes?.chip}
              color="primary"
              key={`${selectedEntry.entryId}-${emotion}`}
              label={_.capitalize(emotion)}
            />
          ))}
          <Box mt={2} />
          <Typography>Experiences:</Typography>
          {selectedEntry.experiences.map((experience) => (
            <Chip
              className={classes?.chip}
              color={experience.positive ? "primary" : "secondary"}
              key={`${selectedEntry.entryId}-${experience.name}`}
              label={_.capitalize(experience.name)}
            />
          ))}
          <Box mt={2} />
          <Typography>Thoughts:</Typography>
          <Typography>{selectedEntry.thoughts}</Typography>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(MoodEntriesList);
