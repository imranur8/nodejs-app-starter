import axios from "axios";

import {
  AUTH_USER, ADD_USER, FETCH_USERS, EDIT_USER, DELETE_USER
} from "../constants";

export function authUser(email, password) {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "/users/auth",
        { email, password },
      );
      if (res.data) {
        dispatch({ type: AUTH_USER, user: res.data });
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        axios.defaults.headers = {
          Authorization: res.data.token,
        };
        return res.data
      } else if (res.response.status === 400) {
        let error = new Error(res.response.data);
        error.code = res.response.status;
        throw error;
      }
    } catch (error) {
      localStorage.clear();
      throw new Error(error);
    }
  };
}

export function addUser(user) {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "/users", user,
      );
      if (!res.status) {
        return {
          status: "error",
          error : "error"
        };
      }
      dispatch({ type: ADD_USER, user: res.data });
      return {
        "status": "success",
        user: res.data
      }
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        error
      };
    }
  };
}

export function fetchUsers(queryString = "") {
  return async (dispatch) => {
    try {
      console.log("users");
      const res = await axios.get(
        `/users/?${queryString}`,
      );
      const { results, total, page } = res.data;
      dispatch({ type: FETCH_USERS, users: results, total, page });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editUser(id, user) {
  return async (dispatch) => {
    try {
      if (id) {
        const res = await axios.put(
          `/users/${id}`, user,
        );

        dispatch({ type: EDIT_USER, user: res.data });
        return {
          "status": "success",
          user: res.data
        }
      } else {
        return {
          "status": "error",
          error: 'User id is not found'
        }
      }
    } catch (error) {
      console.log(error);
      return {
        "status": "error",
        error
      }
    }
  };
}


export function deleteUser(id) {
  return async (dispatch) => {
    try {
      if (id) {
        const res = await axios.delete(
          `/users/${id}`,
        );

        dispatch({ type: DELETE_USER, user: id });
        return {
          "status": "success",
          user: id
        }
      } else {
        return {
          "status": "error",
          error: 'User id is not found'
        }
      }
    } catch (error) {
      console.log(error);
      return {
        "status": "error",
        error
      }
    }
  };
}
