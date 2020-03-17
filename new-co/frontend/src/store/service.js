import axios from "axios";

const intinialState = {
  services: []
};

const getServices = services => {
  return {
    type: "GET_SERVICES",
    services: services
  };
};

export const addService = data => {
  axios
    .post("http://localhost:5000/api/service/add-new-service", data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: "ADD_SERVICE"
  };
};

export const getServicesAsync = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/service/get-all")
      .then(res => dispatch(getServices(res.data)))
      .catch(err => {
        console.log(err);
      });
  };
};

// const getServicesById = (service) =>{
//   return{
//     type:"GET_SERVICE_BY_ID",
//     service:data
//   }
// }

// export const getServicesByIdAsync = (id) => {
//   return dispatch => {
//     axios
//       .get("http://localhost:5000/api/service/get-by-id",id)
//       .then(res => dispatch(getServicesById(res.data)))
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };

export const reducer = (state = intinialState, action) => {
  switch (action.type) {
    case "GET_SERVICES":
      return {
        ...state,
        services: action.services
      };
    case "ADD_SERVICE":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
