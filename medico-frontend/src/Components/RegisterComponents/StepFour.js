import React from "react";
import Loader from "../../Loader";
import CustomButton from "../Global/Button";

const StepFour = ({
  formData,
  handleChange,
  errors,
  prevStep,
  handleSubmit,
  handleFileChange,
  documents,
  submitLoading,
}) => {
  return (
    <div className="border p-6 rounded-2xl bg-slate-100">
      <div className="grid md:grid-cols-2 gap-4">
        {documents.map((document, index) => (
          <div key={index}>
            <div className="flex gap-2 my-2">
              <div className="bg-cyan-600  px-4 grid place-content-center rounded-md">
                {index + 1}
              </div>
              <label
                htmlFor={document.id}
                className="inline-block text-cyan-600 font-medium"
              >
                {document.label}
              </label>
            </div>
            <div className="mb-4 border-b  bg-cyan-500 text-cyan-50 rounded-md">
              <input
                type="file"
                id={document.id}
                accept="image/*, .pdf"
                name={document.name}
                onChange={handleFileChange}
                className="inline-block w-3/4 px-3 py-2 rounded focus:outline-none focus:border-green-500 "
              />
            </div>
            {errors[document.name] && (
              <span className="text-red-500">{errors[document.name]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center flex justify-end">
        <CustomButton
          onClick={handleSubmit}
          // className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          {submitLoading ? <Loader /> : "Submit"}
        </CustomButton>
      </div>
    </div>
  );
};

export default StepFour;
