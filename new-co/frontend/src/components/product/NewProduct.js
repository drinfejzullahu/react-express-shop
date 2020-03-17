import React, { useState, useEffect } from "react";
import * as actions from "../../store/product";
import * as shopActions from "../../store/shop";
import * as serviceActions from "../../store/service";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function NewProduct(props) {
  const [description, setDescription] = useState("");
  const [validity, setValidity] = useState(null);
  const [state, setState] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [shopId, setShopId] = useState("");
  const [checkedServices, setCheckedServices] = useState([]);
  const [showServices, setShowServices] = useState(false);

  const [nameError, setNameError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [validityError, setValidityError] = useState(true);
  const [stateError, setStateError] = useState(true);
  const [quantityError, setQuantityError] = useState(true);

  const dispatch = useDispatch();
  const shops = useSelector(state => state.shopsReducer.shops);

  const services = useSelector(state => state.servicesReducer.services);
  const p_id = useSelector(state => state.productsReducer.product_service_id);

  useEffect(() => {
    dispatch(serviceActions.getServicesAsync());
  }, []);

  useEffect(() => {
    dispatch(shopActions.getShopsAsync());
  }, []);

  useEffect(() => {
    validateName();
    validateDescription();
    validateValidity();
    validateState();
    validateQuantity();
  });
  const onSubmitHandler = e => {
    e.preventDefault();
    const sh_id = parseInt(shopId);
    const product = { description, validity, state, quantity, name, sh_id };
    dispatch(actions.addProduct(product));
    setShowServices(true);
  };

  const validateName = () => {
    if (name !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const validateDescription = () => {
    if (description !== "") {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }
  };

  const validateValidity = () => {
    if (validity !== "") {
      setValidityError(false);
    } else {
      setValidityError(true);
    }
  };

  const validateState = () => {
    if (state !== "") {
      setStateError(false);
    } else {
      setStateError(true);
    }
  };
  const validateQuantity = () => {
    if (quantity > 0) {
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  };

  const handleCheckoxChange = e => {
    // current array of options
    const options = [...checkedServices];
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }

    // update the state with the new array of options
    setCheckedServices(options);
  };
  const addProductServiceHandler = e => {
    e.preventDefault();
    const data = {
      p_id,
      services: [...checkedServices]
    };
    dispatch(actions.addProductService(data));
    props.history.push("/");
  };

  let servicesArray = null;
  if (showServices === true) {
    servicesArray = (
      <div>
        <div className="form-group ">
          <label htmlFor="exampleFormControlTextareaee88">Services</label>
          <div className="row  ">
            {services !== null
              ? services.map(service => {
                  return (
                    <div className="checkbox ml-3" key={service.id}>
                      <label>
                        <input
                          type="checkbox"
                          onChange={e => handleCheckoxChange(e)}
                          value={service.id}
                        />
                        {service.name}
                      </label>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <button
          onClick={addProductServiceHandler}
          className="btn btn-dark mt-3 mb-2"
          style={{ width: "100%" }}
          disabled={
            nameError ||
            descriptionError ||
            validityError ||
            stateError ||
            quantityError
          }
        >
          Post
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
        <div className=" col-sm-10 col-md-8 col-lg-6 card mx-auto m-3 p-3">
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput11">Name</label>
              <input
                onChange={e => setName(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput11"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput12">Description</label>

              <textarea
                onChange={e => setDescription(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput12"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput13">Validity</label>
              <input
                onChange={e => setValidity(e.target.value)}
                required
                type="date"
                className="form-control"
                id="exampleFormControlInput13"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput14">State</label>
              <input
                onChange={e => setState(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput14"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput142">Quantity</label>
              <input
                onChange={e => setQuantity(e.target.value)}
                required
                type="number"
                className="form-control"
                id="exampleFormControlInput124"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea188">Shop</label>

              <div className="input-group mb-3">
                <select
                  placeholder="Select a shop"
                  onChange={e => setShopId(e.target.value)}
                  className="custom-select"
                  id="inputGroupSelect188"
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>

                  {shops !== null
                    ? shops.map(shop => {
                        return (
                          <option value={shop.id} key={shop.id}>
                            {shop.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
            {servicesArray}
            {showServices === false ? (
              <button
                onClick={onSubmitHandler}
                className="btn btn-default mt-3 mb-2"
                disabled={
                  nameError ||
                  descriptionError ||
                  validityError ||
                  stateError ||
                  quantityError
                }
              >
                Add Services
              </button>
            ) : null}
          </form>
        </div>
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
      </div>
    </div>
  );
}
export default withRouter(NewProduct);
