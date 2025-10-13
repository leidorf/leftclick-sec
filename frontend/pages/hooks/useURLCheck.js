import { useState, useEffect } from 'react';

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

      const response = await fetch(
        `/api/check-url?q=${encodeURIComponent(domain)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
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