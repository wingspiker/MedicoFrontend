import React from "react";
import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";

function Occupation({ register, errors, occupation }) {
  // console.log(occupation);
  return (
    <div className="flex flex-col gap-8 text-white">
      <div className="flex gap-8">
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="Doctor"
            className="form-checkbox h-4 w-4"
            {...register("occupation")}
          />
          <span>Doctor</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="Medical Store"
            className="form-checkbox h-4 w-4"
            {...register("occupation")}
          />
          <span>Medical Store</span>
        </label>
      </div>
      {occupation && occupation.includes("Doctor") && (
        <>
          <p className=" text-2xl"> Select Degree</p>
          <div className="grid grid-cols-4 gap-8">
            <label className="flex items-center space-x-2 text-lg">
              <input
                type="checkbox"
                value="Master of Surgery"
                className="form-checkbox h-4 w-4"
                {...register("degree")}
              />
              <span>Master of Surgery</span>
            </label>

            <label className="flex items-center space-x-2 text-xl">
              <input
                type="checkbox"
                value="Bachelor of Medicine Bachelor of Surgery"
                className="form-checkbox h-4 w-4"
                {...register("degree")}
              />
              <span>Bachelor of Medicine Bachelor of Surgery</span>
            </label>

            <label className="flex items-center space-x-2 text-xl">
              <input
                type="checkbox"
                value="Bachelor of Dental Surgery"
                className="form-checkbox h-4 w-4"
                {...register("degree")}
              />
              <span>Bachelor of Dental Surgery</span>
            </label>

            <label className="flex items-center space-x-2 text-xl">
              <input
                type="checkbox"
                value="Bachelor of Homeopathy Medicine and Surgery"
                className="form-checkbox h-4 w-4"
                {...register("degree")}
              />
              <span>Bachelor of Homeopathy Medicine and Surgery</span>
            </label>

      
          </div>
        </>
      )}
    </div>
  );
}

export default Occupation;
