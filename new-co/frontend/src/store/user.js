import axios from "axios";

const intinialState = {
  logedIn: false,
  logedUser: null,
  users: [],
  roles: []
};

const getUsers = users => {
  return {
    type: "GET_USERS",
    users: users
  };
};

const getRoles = roles => {
  return {
    type: "GET_ROLES",
    roles: roles
  };
};

export const getRolesAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/user/get-roles")
      .then(res => {
        dispatch(getRoles(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addUserAdmin = data => {
  console.log(data);
  axios
    .post("http://localhost:5000/api/user/add-new-user", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_USER_ADMIN"
  };
};

export const addUserAssistant = data => {
  axios
    .post("http://localhost:5000/api/user/add-new-shop-assistant", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_USER_ASSISTANT"
  };
};

export const loginTrue = () => {
  return {
    type: "LOGIN_TRUE"
  };
};

export const loginFalse = () => {
  return {
    type: "LOGIN_FALSE"
  };
};

export const setLogedUser = user => {
  return {
    type: "SET_LOGED_USER",
    user: user
  };
};

export const getUsersAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/user/get-all")
      .then(res => dispatch(getUsers(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.users
      };
    case "GET_ROLES":
      return {
        ...state,
        roles: action.roles
      };
    case "ADD_USER_ADMIN":
      return {
        ...state
      };
    case "ADD_USER_ASSISTANT":
      return {
        ...state
      };
    case "LOGIN_TRUE":
      return {
        ...state,
        logedIn: true
      };
    case "LOGIN_FALSE":
      return {
        ...state,
        logedIn: false,
        logedUser: null
      };
    case "SET_LOGED_USER":
      return {
        ...state,
        logedUser: action.user
      };
    default:
      return {
        ...state
      };
  }
};
