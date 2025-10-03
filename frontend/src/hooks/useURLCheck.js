import { useState, useEffect } from "react";
import { urlService } from "../services/url";
import { showToast } from "../utils/showToast";

export const useURLCheck = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkingText, setCheckingText] = useState("Checking.");

  useEffect(() => {
    if (checking) {
      const interval = setInterval(() => {
        setCheckingText((prev) => {
          if (prev === "Checking.") return "Checking..";
          if (prev === "Checking..") return "Checking...";
          return "Checking.";
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [checking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setChecking(true);

    try {
      let domain;
      try {
        const urlObj = new URL(url);
        domain = urlObj.hostname;
      } catch (err) {
        domain = url;
      }
      const response = await urlService.checkURL(domain);
      const data = response.data;

      if (data.messages) {
        showToast(data.messages.type, data.messages.code);
      }

      setResult(data);
    } catch (error) {
      const errorData = error.response.data.detail;

      setError(errorData.messages.message);
      showToast(errorData.messages.type, errorData.messages.code);
    } finally {
      setChecking(false);
    }
  };

  return {
    url,
    setUrl,
    result,
    error,
    checking,
    checkingText,
    handleSubmit,
  };
};
