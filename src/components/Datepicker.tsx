import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface IDatepickerProps extends KeyboardDatePickerProps {}

const defaultHandler = (
  date: MaterialUiPickersDate,
  value?: string | null | undefined
) => {};

const keyboardButtonProps = {
  "aria-label": "change date",
};

const Datepicker: React.FC<IDatepickerProps> = ({
  onChange,
  value,
  KeyboardButtonProps,
  ...props
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        value={value}
        onChange={onChange || defaultHandler}
        KeyboardButtonProps={KeyboardButtonProps || keyboardButtonProps}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Datepicker;
