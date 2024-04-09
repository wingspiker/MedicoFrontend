import React, { useEffect, useState } from "react";
import { CustomSelect } from "../../OfferComponents/Input";
import { getGroups } from "../../../Services/group";

function SelectExistingGroup({ register, errors, groups }) {

  
  return (
    <>
    <div>
      <CustomSelect
        options={[
          { value: "", label: "Select a Existing Group" }, ...groups.map((g,i)=>{return {value: g.id, label: g.name}})]}
        inputProps={register("existingGroupNo")}
        error={errors.existingGroupNo}
      />
    </div>
    </>
    
  );
}

export default SelectExistingGroup;
