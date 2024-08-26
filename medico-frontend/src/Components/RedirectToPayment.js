import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectToPayment = ({ isActive }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isActive) {
      navigate('/company/CompletePayment', { replace: true });
    }
  }, [isActive, navigate]);

  return null; // This component does not render anything
}
