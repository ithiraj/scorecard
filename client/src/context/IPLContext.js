import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const IPLContext = createContext();

const initialArrayState = {
  loading: false,
  data: [],
  error: null,
};

const initialObjectState = {
  loading: false,
  data: {},
  error: null,
};

const initialFormState = {
  matchId: null,
  teams: [],
};

export const IPLContextProvider = ({ children }) => {
  const [matchSchedule, setMatchSchedule] = useState(initialObjectState);
  const [pointTable, setPointTable] = useState(initialObjectState);
  const [formId, setFormId] = useState(initialFormState);
  const [formPopupOpen, setFormPopupOpen] = useState(false);
  const [formState, setFormState] = useState(false);

  useEffect(() => {
    setMatchSchedule((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get(`http://localhost:1887/ipl/getMatch`)
      .then((response) => {
        console.log("response", response);
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          data: response.data,
          error: null,
        }));
      })
      .catch((error) => {
        console.log(error);
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
      });
  }, []);

  useEffect(() => {
    setPointTable((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get(`http://localhost:1887/ipl/getPoint`)
      .then((response) => {
        console.log(response);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          data: response.data,
          error: null,
        }));
      })
      .catch((error) => {
        console.log(error);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
      });
  }, []);

  //   console.log(formId);

  const handleUpdate = (id, state) => {
    setMatchSchedule((prev) => ({
      ...prev,
      loading: true,
    }));
    setMatchSchedule((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    axios
      .put(`http://localhost:1887/ipl/updateMatch/${id}`, {
        ...state,
      })
      .then(function (response) {
        console.log(response, response.data.matchData);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          data: response.data.pointData,
          error: null,
        }));
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          data: response.data.matchData,
          error: null,
        }));
      })
      .catch(function (error) {
        console.log(error);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
      });
  };

  const handleReset = (id, state) => {
    setMatchSchedule((prev) => ({
      ...prev,
      loading: true,
    }));
    setMatchSchedule((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    axios
      .get(`http://localhost:1887/ipl/reset`)
      .then(function (response) {
        console.log(response, response.data.matchData);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          data: response.data.pointData,
          error: null,
        }));
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          data: response.data.matchData,
          error: null,
        }));
      })
      .catch(function (error) {
        console.log(error);
        setPointTable((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
        setMatchSchedule((prev) => ({
          ...prev,
          loading: false,
          error: error,
        }));
      });
  };

  const state = {
    matchSchedule,
    pointTable,
    formId,
    formPopupOpen,
  };

  const actions = {
    setMatchSchedule,
    setPointTable,
    setFormId,
    setFormPopupOpen,
    handleUpdate,
    handleReset
  };

  return (
    <IPLContext.Provider value={{ state, actions }}>
      {children}
    </IPLContext.Provider>
  );
};
