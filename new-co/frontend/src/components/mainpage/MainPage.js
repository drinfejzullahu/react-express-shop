import React from "react";
import Sidemenu from "../sidemenu/Sidemenu";
import Layout from "../layout/Layout";

export default function MainPage() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 mt-4">
            <Sidemenu />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 mt-4">
            <Layout />
          </div>
        </div>
      </div>
    </div>
  );
}
