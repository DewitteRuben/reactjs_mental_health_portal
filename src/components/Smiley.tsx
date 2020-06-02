import React from "react";
import Image from "material-ui-image";

export type SmileyType = "veryBad" | "bad" | "moderate" | "good" | "veryGood";

interface SmileyProps {
  type: SmileyType;
  size?: number;
}

interface SmileyState {
  src?: string;
}

const DEFAULT_SMILEY_SIZE = 56;

class Smiley extends React.Component<SmileyProps, SmileyState> {
  state: SmileyState = { src: undefined };

  async componentDidMount() {
    const { type } = this.props;
    const { default: src } = await import(`../images/smiley_${type}.png`);
    this.setState({ src });
  }

  render() {
    const { src } = this.state;
    const { size } = this.props;

    return (
      <div
        style={{
          width: size || DEFAULT_SMILEY_SIZE,
          height: size || DEFAULT_SMILEY_SIZE,
        }}
      >
        <Image
          style={{
            width: size || DEFAULT_SMILEY_SIZE,
            height: size || DEFAULT_SMILEY_SIZE,
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
          imageStyle={{}}
          disableSpinner
          src={src || ""}
        />
      </div>
    );
  }
}

export default Smiley;
