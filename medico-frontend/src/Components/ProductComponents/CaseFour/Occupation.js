import React from "react";
import { CustomSelect, CustomCheckbox } from "../../OfferComponents/Input";

function Occupation({ register, errors, occupation }) {
  // console.log(occupation);
  return (
    <div className="flex items-center">
      <div>
        <input
          type="checkbox"
          value="Doctor"
          className="w-16 h-16"
          {...register("occupation")}
        />
        <p className="text-4xl">Doctor</p>
        <input
          type="checkbox"
          value="Medical Store"
          className="w-16 h-16"
          {...register("occupation")}
        />
        <p className="text-4xl">Medical Store</p>
      </div>
      <div>
        {occupation && occupation.includes("Doctor") && (
          <>
            <input
              type="checkbox"
              value="Master of Surgery"
              className="w-16 h-16"
              {...register("degree")}
            />
            <p className="text-4xl">Master of Surgery</p>

            <input
              type="checkbox"
              value="Bachelor of Medicine Bachelor of Surgery"
              className="w-16 h-16"
              {...register("degree")}
            />
            <p className="text-4xl">Bachelor of Medicine Bachelor of Surgery</p>

            <input
              type="checkbox"
              value="Bachelor of Dental Surgery"
              className="w-16 h-16"
              {...register("degree")}
            />
            <p className="text-4xl">Bachelor of Dental Surgery</p>

            <input
              type="checkbox"
              value="Bachelor of Homeopathy Medicine and Surgery"
              className="w-16 h-16"
              {...register("degree")}
            />
            <p className="text-4xl">
              Bachelor of Homeopathy Medicine and Surgery
            </p>

            <input
              type="checkbox"
              value="Medical Store"
              className="w-16 h-16"
              {...register("degree")}
            />
            <p className="text-4xl">Medical Store</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Occupation;
