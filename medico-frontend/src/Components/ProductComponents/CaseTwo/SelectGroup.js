import React from "react";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../../OfferComponents/Input";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

function SelectExistingGroup({ register, errors, existingGroupNo }) {
  return (
    <CustomSelect
      label="Select Existing Group"
      options={[
        { value: "", label: "Select a Existing Group" },
        { value: "Group1", label: "Group1" },
        { value: "Group2", label: "Group2" },
      ]}
      inputProps={register("existingGroupNo")}
      error={errors.existingGroupNo}
    />
  );
}

export default SelectExistingGroup;
