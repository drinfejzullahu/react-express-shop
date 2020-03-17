import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import * as serviceActions from "../../store/service";
import * as productServiceActions from "../../store/product-service";

import Modal from "../shared/Modal";
export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [prd, setPrd] = React.useState(null);

  const dispatch = useDispatch();

  const productWithServices = useSelector(
    state => state.productServiceReducer.productWithServices
  );

  useEffect(() => {
    dispatch(productActions.getProductsAsync());
    dispatch(productServiceActions.getProductServicesAsync());
    dispatch(serviceActions.getServicesAsync());
    dispatch(productServiceActions.getProductWithServicesAsync());
  }, []);
  var productsToShow = {};
  for (var i = 0; i < productWithServices.length; i++) {
    var groupName = [
      [
        productWithServices[i].p_id,
        productWithServices[i].product_name,
        productWithServices[i].quantity,
        productWithServices[i].state,
        productWithServices[i].product_description,
        productWithServices[i].name,
        productWithServices[i].sh_id
      ]
    ];
    if (!productsToShow[groupName]) {
      productsToShow[groupName] = [];
    }
    productsToShow[groupName].push([
      productWithServices[i].service_name,
      productWithServices[i].price
    ]);
  }
  var myArray = [];
  for (var groupName in productsToShow) {
    myArray.push({
      productsToShow: groupName,
      p_id: productsToShow[groupName]
    });
  }

  const handleOpen = prd => {
    setOpen(true);
    setPrd(prd);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let productsWithServices = [];

  return (
    <div className="container">
      <div className="row">
        {myArray.length > 0
          ? myArray.map(product => {
              let prd = product.productsToShow.split(",");
              return (
                <div
                  key={prd[0]}
                  className="card m-4"
                  style={{ width: "320px", height: "100%" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{prd[1]}</h5>
                    <hr />
                    <p className="card-text">Description: {prd[4]}</p>

                    <p className="card-text">State: {prd[3]}</p>
                    <h6 className="card-text mb-4">Quantity: {prd[2]}</h6>
                    <hr />
                    <h5 className="card-text mb-4">Servces:</h5>
                    <ul className="list-group mb-2">
                      {product.p_id.map(service => {
                        return (
                          <li className="list-group-item" key={service[0]}>
                            {service[0] + service[1]}
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      disabled={product.quantity <= 0 ? true : false}
                      onClick={() => handleOpen(prd)}
                      className="btn btn-block bg-dark"
                      style={{ color: "white", width: "100%" }}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <Modal
        product={prd}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
}
