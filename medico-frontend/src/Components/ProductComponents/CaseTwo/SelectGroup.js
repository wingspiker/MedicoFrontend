import React from "react";
import { CustomSelect } from "../../OfferComponents/Input";

function SelectExistingGroup({ register, errors }) {
  return (
    <CustomSelect
      label="Select Existing Group"
      options={[
        { value: "", label: "Select a Existing Group" },
        { value: "Group1", label: "Selcet Group1" },
        { value: "Group2", label: "Select Group2" },
      ]}
      inputProps={register("existingGroupNo")}
      //   error={errors.existingGroupNo}
    />
  );
}

export default SelectExistingGroup;
