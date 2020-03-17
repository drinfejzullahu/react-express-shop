import axios from "axios";

const intinialState = {
  sold: []
};

const getSoldProducts = sold => {
  return {
    type: "GET_SOLD_PRODUCTS",
    sold: sold
  };
};

export const addSell = data => {
  axios
    .post("http://localhost:5000/api/sold/add-new-sold", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_SELL"
  };
};

export const getSoldProductsAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/sold/get-all")
      .then(res => dispatch(getSoldProducts(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_SOLD_PRODUCTS":
      return {
        ...state,
        sold: action.sold
      };
    case "ADD_SELL":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
