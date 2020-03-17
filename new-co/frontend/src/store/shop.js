import axios from "axios";

const intinialState = {
  shops: []
};

const getShops = shops => {
  return {
    type: "GET_SHOPS",
    shops: shops
  };
};

export const addShop = data => {
  axios
    .post("http://localhost:5000/api/shop/add-new-shop", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_SHOP"
  };
};

export const getShopsAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/shop/get-all")
      .then(res => {
        dispatch(getShops(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_SHOPS":
      return {
        ...state,
        shops: action.shops
      };
    default:
      return {
        ...state
      };
  }
};
