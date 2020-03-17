import React, { useState, useEffect } from "react";
import * as actions from "../../store/service";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function NewService(props) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState(true);
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    validateName();
    validateDescription();
    validatePrice();
  });

  const onSubmitHandler = e => {
    e.preventDefault();

    const service = { description, price, status, name };
    dispatch(actions.addService(service));
    props.history.push("/");
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
  const validateStatus = () => {
    if (description !== "") {
      setStatusError(false);
    } else {
      setStatusError(true);
    }
  };

  const validatePrice = () => {
    if (price > 0) {
      setPriceError(false);
    } else {
      setPriceError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
        <div className=" col-sm-10 col-md-8 col-lg-6 card mx-auto m-3 p-3">
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput11">Description</label>
              <input
                onChange={e => setDescription(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput11"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput123">Price</label>
              <input
                onChange={e => setPrice(e.target.value)}
                required
                type="number"
                className="form-control"
                id="exampleFormControlInput123"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput1223">Status</label>
              <input
                onChange={e => setStatus(e.target.value)}
                required
                type="number"
                className="form-control"
                id="exampleFormControlInput1223"
              />
            </div>

            {/* <div className="form-group">
          <label htmlFor="exampleFormControlTextarea188">Product</label>

          <div className="input-group mb-3">
            <select
              placeholder="Select a shop"
              onChange={e => setProduct(e.target.value)}
              className="custom-select"
              id="inputGroupSelect188"
            >
              <option value="" disabled selected>
                Select your option
              </option>

              {products !== null
                ? products.map(product => {
                    return (
                      <option key={product.id}>
                        {product.name + " " + product.p_id}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        </div> */}

            <div className="form-group">
              <label htmlFor="exampleFormControlInput13">Name</label>
              <input
                onChange={e => setName(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput13"
              />
            </div>

            <button
              onClick={onSubmitHandler}
              className="btn btn-dark mt-3 mb-2"
              style={{ width: "100%" }}
              disabled={
                nameError || descriptionError || priceError || statusError
              }
            >
              Post
            </button>
          </form>
        </div>
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
      </div>
    </div>
  );
}
export default withRouter(NewService);
