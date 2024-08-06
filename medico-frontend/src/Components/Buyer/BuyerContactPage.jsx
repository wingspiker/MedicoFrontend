import React from "react";
import Navbar from "./Navbar";
import Footer from "../Global/Footer";
import { Button, TextareaAutosize, TextField } from "@mui/material";
// import contactSvg from "../../../public/contact.svg";

export default function BuyerContactPage() {
  return (
    <div className="text-cyan-900 bg-white">
      <Navbar />
      <div className="min-h-screen ">
        <div className="px-32 py-10">
          <h2 className="text-xl font-medium pb-3">Contact Us</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-2  rounded-xl py-4 px-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Subject"
                variant="outlined"
                fullWidth
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                fullWidth
                style={{
                  width: "100%",
                  border: "2px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
                placeholder="Content"
              />
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className={`cursor-pointer bg-cyan-900 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-auto text-white font-bold ml-3 rounded-xl w-20 text-center py-2`}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="grid place-content-center">
              <img src={"../../../public/contact.svg"} alt="contact svg" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
