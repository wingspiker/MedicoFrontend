import React from "react";
import { CustomSelect } from "../../OfferComponents/Input";

function SelectExistingGroup({ register, errors }) {
  return (
    <div>
      <CustomSelect
        options={[
          { value: "", label: "Select a Existing Group" },
          { value: "Group1", label: "Group1" },
          { value: "Group2", label: "Group2" },
        ]}
        inputProps={register("existingGroupNo")}
        error={errors.existingGroupNo}
      />
    </div>
  );
}

export default SelectExistingGroup;
