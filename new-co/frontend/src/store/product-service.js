import axios from "axios";

const intinialState = {
  productServices: [],
  productWithServices: []
};

const getProductServices = productServices => {
  return {
    type: "GET_PRODUCT_SERVICE",
    productServices: productServices
  };
};

const getProductWithServices = productWithServices => {
  return {
    type: "GET_PRODUCT_WITH_SERVICE",
    productWithServices: productWithServices
  };
};

export const getProductServicesAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/product-service/get-all")
      .then(res => dispatch(getProductServices(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const getProductWithServicesAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/product-service/get-all-p-s")
      .then(res => dispatch(getProductWithServices(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SERVICE":
      return {
        ...state,
        productServices: action.productServices
      };
    case "ADD_PRODUCT_SERVICE":
      return {
        ...state
      };
    case "GET_PRODUCT_WITH_SERVICE":
      return {
        ...state,
        productWithServices: action.productWithServices
      };
    default:
      return {
        ...state
      };
  }
};
