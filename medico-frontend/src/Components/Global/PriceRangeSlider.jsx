import React from "react";
import { Slider } from "@mui/material";

const PriceRangeSlider = ({ value, onChange }) => {
  return (
    <Slider
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto"
      min={0}
      max={10000}
      sx={{
        width: "100%",
        "& .MuiSlider-thumb": {
          height: 14,
          width: 14,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
          },
          "&:before": {
            display: "none",
          },
        },
        "& .MuiSlider-track": {
          height: 4,
          backgroundColor: "#3b82f6", // Tailwind blue-500
        },
        "& .MuiSlider-rail": {
          height: 4,
          opacity: 0.5,
          backgroundColor: "#94a3b8", // Tailwind slate-400
        },
        "& .MuiSlider-valueLabel": {
          lineHeight: 1.2,
          fontSize: 12,
          background: "unset",
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: "50% 50% 50% 0",
          backgroundColor: "#3b82f6", // Tailwind blue-500
          transformOrigin: "bottom left",
          transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
          "&:before": { display: "none" },
          "&.MuiSlider-valueLabelOpen": {
            transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
          },
          "& > *": {
            transform: "rotate(45deg)",
          },
        },
      }}
    />
  );
};

export default PriceRangeSlider;
