import axios from "axios";

const intinialState = {
  products: [],
  product_service_id: null
};

const getProducts = products => {
  return {
    type: "GET_PRODUCTS",
    products: products
  };
};

const addProductServiceId = id => {
  return {
    type: "ADD_PRODUCT_SERVICE_ID",
    id: id
  };
};

export const addProduct = data => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/product/add-new-product", data)
      .then(res => {
        dispatch(addProductServiceId(res.data.recordset[0].p_id));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addProductService = data => {
  for (let i = 0; i < data.services.length; i++) {
    let s_id = parseInt(data.services[i]);
    let p_id = data.p_id;
    let dataToPost = { p_id, s_id };
    axios
      .post(
        "http://localhost:5000/api/product-service/add-new-product-service",
        dataToPost
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return {
    type: "ADD_PRODUCT_SERVICE"
  };
};

export const getProductsAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/product/get-all")
      .then(res => dispatch(getProducts(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateProductQuantity = data => {
  axios
    .put("http://localhost:5000/api/product/update-product-quantity", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "UPDATE_PRODUCT_QUANTITY"
  };
};

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.products
      };
    case "ADD_PRODUCT":
      return {
        ...state
      };
    case "ADD_PRODUCT_SERVICE":
      return {
        ...state
      };
    case "ADD_PRODUCT_SERVICE_ID":
      return {
        ...state,
        product_service_id: action.id
      };
    case "UPDATE_PRODUCT_QUANTITY":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
