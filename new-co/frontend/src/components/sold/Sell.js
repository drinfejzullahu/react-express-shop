import React, { useState, useEffect } from "react";
import * as shopActions from "../../store/shop";
import * as productsActions from "../../store/product";
import * as customersActions from "../../store/customer";
import * as usersActions from "../../store/user";
import * as soldActions from "../../store/sold";
import { withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Sell(props) {
  const dispatch = useDispatch();

  const [customerId, setCustomerId] = useState("");
  const [shopId, setShopId] = useState("");

  const shops = useSelector(state => state.shopsReducer.shops);
  const assistants = useSelector(state => state.usersReducer.users);
  const customers = useSelector(state => state.customersReducer.customers);

  const logedUser = useSelector(state => state.usersReducer.logedUser);

  useEffect(() => {
    dispatch(shopActions.getShopsAsync());
    dispatch(productsActions.getProductsAsync());
    dispatch(customersActions.getCustomersAsync());
    dispatch(usersActions.getUsersAsync());
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();
    const sh_id = parseInt(props.product[6]);
    const ass_id = logedUser.id;
    const p_id = parseInt(props.product[0]);
    const c_id = parseInt(customerId);
    const productToPass = {
      p_id: p_id,
      name: props.product.product_name
    };
    const sold = { p_id, sh_id, ass_id, c_id };
    dispatch(soldActions.addSell(sold));
    dispatch(productsActions.updateProductQuantity(productToPass));
    props.handleClose();
  };
  return (
    <div className="card mx-auto m-3 p-3 setWidth" style={{ width: "100%" }}>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea188">Shop</label>

        <input disabled className="form-control" value={props.product[6]} />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea188">Assistant</label>

        <input disabled className="form-control" value={logedUser.name} />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea188">Product</label>

        <input disabled className="form-control" value={props.product[2]} />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea188">Customers</label>

        <div className="input-group mb-3">
          <select
            placeholder="Select a customer"
            onChange={e => setCustomerId(e.target.value)}
            className="custom-select"
            id="inputGroupSelect188"
          >
            <option value="" disabled selected>
              Select your option
            </option>

            {customers !== null
              ? customers.map(customer => {
                  return (
                    <option value={customer.id} key={customer.id}>
                      {customer.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
      <span>Customer not shown ?</span>
      <NavLink to="/new-customer">Add new customer</NavLink>
      <button
        onClick={onSubmitHandler}
        className="btn btn-dark mt-3 mb-2"
        style={{ width: "100%" }}
      >
        Sell Product
      </button>
    </div>
  );
}

export default withRouter(Sell);
