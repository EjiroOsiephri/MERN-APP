import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

export const useHttpClient = (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);

    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: httpAbortController.signal,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      history.push("/");
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      httpAbortController.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, clearError, sendRequest };
};
