import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/user";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    validateEmail();
    validatePassword();
  });

  useEffect(() => {
    dispatch(actions.getUsersAsync());
  }, []);

  const onLoginHandler = e => {
    e.preventDefault();

    const userLogin = users.find(usr => {
      return usr.email === email && usr.password === password;
    });
    if (userLogin !== undefined) {
      dispatch(actions.loginTrue());
      dispatch(actions.setLogedUser(userLogin));
    }
    if (userLogin === undefined) {
      dispatch(actions.loginFalse());
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
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
            <hr />
            <p className="text text-center">{}</p>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Email "
                    type="email"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  onClick={onLoginHandler}
                  disabled={emailError || passwordError}
                  type="submit"
                  className="btn btn-block btn-dark"
                >
                  Login
                </button>
              </div>
            </form>
          </article>
        </div>
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
      </div>
    </div>
  );
}
