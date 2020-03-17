import axios from "axios";

const intinialState = {
  customers: []
};

const getCustomers = customers => {
  return {
    type: "GET_CUSTOMERS",
    customers
  };
};

export const addCustomer = data => {
  axios
    .post("http://localhost:5000/api/customer/add-new-customer", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_CUSTOMER"
  };
};

export const getCustomersAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/customer/get-all")
      .then(res => dispatch(getCustomers(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return {
        ...state,
        customers: action.customers
      };
    case "ADD_CUSTOMER":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
