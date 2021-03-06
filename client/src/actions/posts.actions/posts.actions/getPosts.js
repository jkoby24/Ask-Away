import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../../constants/posts.constants";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("https://whispering-depths-80857.herokuapp.com/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};