import React from "react";
import Lottie from "lottie-react";
import medicoLoader from "../../lottie/medico-loader.json";

export default function MedicoLoader() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={medicoLoader}
          loop={true}
          size={20}
          className="h-[300px] w-[300px]"
        />
      </div>
    </>
  );
}
