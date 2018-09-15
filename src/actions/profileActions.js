import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILES
} from "./types";
import { logoutUser } from "./authActions";

//GET PROFILE BY HANDLE
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/profiles/handle/${handle}`)
    .then(profile => {
      dispatch({ type: GET_PROFILE, payload: profile.data });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//GET ALL PROFILES
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/profiles/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};
//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/profiles")
    .then(profile => {
      dispatch({ type: GET_PROFILE, payload: profile.data });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//CLEAR current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//CREATE PROFILE
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles", profileData)
    .then(profile => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles/experience", expData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
//Delete Experience
export const deleteExperience = expid => dispatch => {
  axios
    .delete("http://localhost:5000/api/profiles/experience/" + expid)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
//Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profiles/education", eduData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Delete Education
export const deleteEducation = eduid => dispatch => {
  axios
    .delete("http://localhost:5000/api/profiles/education/" + eduid)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Delete account
export const deleteAccount = history => dispatch => {
  axios
    .delete("http://localhost:5000/api/profiles")
    .then(response => {
      dispatch(logoutUser());
      history.push("/login");
      dispatch({
        type: CLEAR_CURRENT_PROFILE
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
