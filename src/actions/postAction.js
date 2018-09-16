import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./types";

//Add Post
export const addPost = postData => dispatch => {
  axios
    .post("http://localhost:5000/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("http://localhost:5000/api/posts/")
    .then(res => {
      return dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const deletePost = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeDislike = id => dispatch => {
  axios
    .post(`http://localhost:5000/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
