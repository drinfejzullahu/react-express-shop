import React, { useState, useEffect } from "react";
import * as actions from "../../store/customer";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function AddCustomer(props) {
  const [name, setName] = useState("");
  const [surname, setSurame] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState(true);
  const [surnameError, setSurnameError] = useState(true);
  const [addressError, setAddressError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    validateName();
    validateSurname();
    validateAddress();
    validatePhone();
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    const customer = { name, surname, address, phone };
    dispatch(actions.addCustomer(customer));
    props.history.push("/");
  };

  const validateName = () => {
    if (name !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const validateSurname = () => {
    if (surname !== "") {
      setSurnameError(false);
    } else {
      setSurnameError(true);
    }
  };

  const validateAddress = () => {
    if (address !== "") {
      setAddressError(false);
    } else {
      setAddressError(true);
    }
  };

  const validatePhone = () => {
    if (phone !== "") {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
        <div className=" col-sm-10 col-md-8 col-lg-6 card mx-auto m-3 p-3">
          {" "}
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
              <label htmlFor="exampleFormControlInput12">Surname</label>
              <input
                onChange={e => setSurame(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput12"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput13">Address</label>
              <input
                onChange={e => setAddress(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput13"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput14">Phone</label>
              <input
                onChange={e => setPhone(e.target.value)}
                required
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="form-control"
                id="exampleFormControlInput14"
              />
            </div>

            <button
              onClick={onSubmitHandler}
              className="btn btn-dark mt-3 mb-2"
              style={{ width: "100%" }}
              disabled={nameError || surnameError || addressError || phoneError}
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
export default withRouter(AddCustomer);
