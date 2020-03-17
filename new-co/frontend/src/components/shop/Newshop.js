import React, { useState, useEffect } from "react";
import * as actions from "../../store/shop";
import * as userActions from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function NewShop(props) {
  const [address, setAddress] = useState("");
  const [assistant_id, setAssistantId] = useState("");

  const [name, setName] = useState("");

  const [nameError, setNameError] = useState(true);
  const [addressError, setAddressError] = useState(true);

  const dispatch = useDispatch();

  const assistants = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(userActions.getUsersAsync());
  }, []);

  useEffect(() => {
    validateName();
    validateAddress();
  });
  const onSubmitHandler = e => {
    e.preventDefault();

    var id = assistant_id.replace(/\D/g, "");
    const ass_id = parseInt(id);

    const shop = { address, ass_id, name };
    dispatch(actions.addShop(shop));
    props.history.push("/");
  };

  const validateName = () => {
    if (name !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };
  const validateAddress = () => {
    if (address !== "") {
      setAddressError(false);
    } else {
      setAddressError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1 col-md-2 col-lg-3"></div>
        <div className=" col-sm-10 col-md-8 col-lg-6 card mx-auto m-3 p-3">
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput11">Address</label>
              <input
                onChange={e => setAddress(e.target.value)}
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput11"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea188">Assistant</label>

              <div className="input-group mb-3">
                <select
                  placeholder="Select a shop"
                  onChange={e => setAssistantId(e.target.value)}
                  className="custom-select"
                  id="inputGroupSelect188"
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>

                  {assistants !== null
                    ? assistants.map(assistant => {
                        if (assistant.roleId === 2) {
                          return (
                            <option key={assistant.id} value={assistant.id}>
                              {assistant.name}
                            </option>
                          );
                        } else return;
                      })
                    : null}
                </select>
              </div>
            </div>

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
              disabled={nameError || addressError}
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

export default withRouter(NewShop);
