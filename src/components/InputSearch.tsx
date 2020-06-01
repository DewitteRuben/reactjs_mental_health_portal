import React from "react";
import {
  Input,
  InputAdornment,
  IconButton,
  InputProps,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const InputSearch: React.FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      placeholder="Search"
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default InputSearch;
