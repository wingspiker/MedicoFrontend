import React from "react";

const StepFour = ({
  formData,
  handleChange,
  errors,
  prevStep,
  handleSubmit,
  handleFileChange,
  documents
}) => {

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded-2xl">
      {documents.map((document, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <label
            htmlFor={document.id}
            className="inline-block text-white bg-cyan-900 w-1/4"
          >
            {document.label}
          </label>
          <input
            type="file"
            id={document.id}
            name={document.name}
            onChange={handleFileChange}
            className="inline-block w-3/4 px-3 py-2 rounded focus:outline-none focus:border-green-500"
          />
          {errors[document.name] && (
            <span className="text-red-500">{errors[document.name]}</span>
          )}
        </div>
      ))}
      <div className="mt-4 text-center">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">
          Submit
        </button>
      </div>
    </form>
  );
};

export default StepFour;
