import React from "react";
import { Line } from "react-chartjs-2";
import { IMoodEntry } from "../redux/reducers/moodReducer";
import { SmileyType } from "./Smiley";
import _ from "lodash";
import { capitalizeCamelCase } from "../utils/string";

interface IMoodEntriesGraphProps {
  entries: IMoodEntry[];
  onPointClick?: (index: number) => void;
}

const smileyToValueMap: Record<SmileyType, number> = {
  veryBad: 0,
  bad: 10,
  moderate: 20,
  good: 30,
  veryGood: 40,
};

const getValueFromSmileyType = (type: SmileyType) => {
  return smileyToValueMap[type];
};

const valueToSmileyTypeMap = _.invert(smileyToValueMap);

const getSmileyTypeStringFromValue = (value: number) => {
  return capitalizeCamelCase(valueToSmileyTypeMap[value]);
};

const entriesToGraphData = (entries: IMoodEntry[]) => {
  return entries.map((entry) => ({
    y: getValueFromSmileyType(entry.mood),
    x: new Date(entry.date),
  }));
};

class MoodEntriesGraph extends React.Component<IMoodEntriesGraphProps> {
  handleOnPointClick = (elements: any) => {
    const { onPointClick } = this.props;

    if (!elements.length) return;

    const activeElement = elements[0];

    if (onPointClick) {
      onPointClick(activeElement["_index"]);
    }
  };

  render() {
    const { entries } = this.props;

    if (!entries.length) {
      return null;
    }

    return (
      <Line
        options={{
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return getSmileyTypeStringFromValue(
                  parseInt(tooltipItem.value || "0")
                );
              },
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  max: 40,
                  min: 0,
                  stepSize: 10,
                  callback: function (value, index, values) {
                    return getSmileyTypeStringFromValue(
                      values[index] as number
                    );
                  },
                },
              },
            ],
            xAxes: [
              {
                type: "time",
                time: { unit: "day", stepSize: 1 },
                distribution: "series",
              },
            ],
          },
        }}
        data={{
          datasets: [
            {
              backgroundColor: "#ffffff",
              borderColor: "#567AB3",
              fill: false,
              data: entriesToGraphData(entries),
            },
          ],
        }}
        onElementsClick={this.handleOnPointClick}
      />
    );
  }
}

export default MoodEntriesGraph;
