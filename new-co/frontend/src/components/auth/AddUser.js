import React, { useState, useEffect } from "react";
import * as actions from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function AddUser(props) {
  const [name, setName] = useState("");
  const [surname, setSurame] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("Admin");

  const [nameError, setNameError] = useState(true);
  const [surnameError, setSurnameError] = useState(true);
  const [addressError, setAddressError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getRolesAsync());
  }, []);

  const roles = useSelector(state => state.usersReducer.roles);

  useEffect(() => {
    validateName();
    validateSurname();
    validateAddress();
    validatePhone();
    validatePassword();
    validateEmail();
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    const user = {
      name,
      surname,
      address,
      phone,
      email,
      password,
      roleId: roleId === "Admin" ? 1 : 2
    };
    if (roleId === "Admin") {
      dispatch(actions.addUserAdmin(user));
      props.history.push("/");
    } else if (roleId === "Assistant") {
      dispatch(actions.addUserAssistant(user));
      props.history.push("/");
    } else {
      return;
    }
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
  const validatePassword = () => {
    if (password.length > 5) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const validateEmail = () => {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      setEmailError(false);
    } else {
      setEmailError(true);
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
              <label htmlFor="exampleFormControlInput1">Name</label>
              <input
                onChange={e => setName(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput11">Surname</label>
              <input
                onChange={e => setSurame(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput11"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput12">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                required
                type="email"
                className="form-control"
                id="exampleFormControlInput12"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput13">Password</label>
              <input
                onChange={e => setPassword(e.target.value)}
                required
                type="password"
                className="form-control"
                id="exampleFormControlInput14"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput15">Address</label>
              <input
                onChange={e => setAddress(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput15"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput16">Phone</label>
              <input
                onChange={e => setPhone(e.target.value)}
                required
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="form-control"
                id="exampleFormControlInput16"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea188">Role</label>

              <div className="input-group mb-3">
                <select
                  placeholder="Select a role"
                  onChange={e => setRoleId(e.target.value)}
                  className="custom-select"
                  id="inputGroupSelect188"
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>

                  {roles !== null
                    ? roles.map(role => {
                        return <option key={role.id}>{role.name}</option>;
                      })
                    : null}
                </select>
              </div>
            </div>

            <button
              onClick={onSubmitHandler}
              className="btn btn-dark mt-3 mb-2"
              style={{ width: "100%" }}
              disabled={
                nameError ||
                surnameError ||
                addressError ||
                phoneError ||
                emailError ||
                passwordError
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

export default withRouter(AddUser);
