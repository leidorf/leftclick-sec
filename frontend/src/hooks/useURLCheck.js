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

      if (data.messages && data.messages.length > 0) {
        const firstMessage = data.messages[0];
        showToast(firstMessage.type, firstMessage.code);
      }

      setResult(data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.messages
      ) {
        const errorMessages = error.response.data.messages;
        if (errorMessages.length > 0) {
          const firstError = errorMessages[0];
          setError(firstError.message);
          showToast(firstError.type, firstError.code);
        }
      } else {
        setError(error.message);
        showToast("error", "ERR_URL_CHECK_FAILED");
      }
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
