import React from "react";
import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";

function Occupation({ register, errors, occupation }) {
  return (
    <div className="flex items-center">
      <CustomSelect
        options={[
          { value: "", label: "Select an Occupation" },
          { value: "doctor", label: "Doctor" },
          { value: "medical_store", label: "Medical Store" },
        ]}
        inputProps={register("occupation")}
        error={errors.occupation}
        className="mr-4 ml-5" // Add margin-right to create space between selects
      />
      {occupation === "doctor" && (
        <div className="ml-4">
          <CustomSelect
            options={[
              { value: "", label: "Select a Degree" },
              { value: "Master of Surgery", label: "Master of Surgery" },
              { value: "Doctor of Medicine", label: "Doctor of Medicine" },
              {
                value: "Bachelor of Medicine Bachelor of Surgery",
                label: "Bachelor of Medicine Bachelor of Surgery",
              },
              {
                value: "Bachelor of Dental Surgery",
                label: "Bachelor of Dental Surgery",
              },
              {
                value: "Bachelor of Homeopathy Medicine and Surgery",
                label: "Bachelor of Homeopathy Medicine and Surgery",
              },
            ]}
            inputProps={register("degree")}
            error={errors.degree}
          />
        </div>
      )}
    </div>
  );
}

export default Occupation;
