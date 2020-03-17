import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function Table(props) {
  const [datas, setDatas] = useState([]);
  let colums = [];
  useEffect(() => {
    setDatas(props.data);
  });
  if (props.type === "product") {
    colums = [
      { title: "Description", field: "description" },
      { title: "Validity", field: "validity" },
      { title: "Quantity", field: "quantity" },
      { title: "Name", field: "name" }
    ];
  }

  if (props.type === "customer") {
    colums = [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Address", field: "address" },
      { title: "Phone", field: "phone" }
    ];
  }

  if (props.type === "service") {
    colums = [
      { title: "Description", field: "description" },
      { title: "Price", field: "price" },
      { title: "Status", field: "status" },
      { title: "Name", field: "name" }
    ];
  }

  if (props.type === "user") {
    colums = [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Address", field: "address" },
      { title: "Phone", field: "phone" },
      { title: "Email", field: "email" },
      { title: "RoleId", field: "roleId" }
    ];
  }

  if (props.type === "sold") {
    colums = [
      { title: "Product Id", field: "p_id" },
      { title: "Shop Id", field: "sh_id" },
      { title: "Assistant Id", field: "ass_id" },
      { title: "Customer Id", field: "c_id" }
    ];
  }

  if (props.type === "shop") {
    colums = [
      { title: "Address", field: "address" },
      { title: "Name", field: "name" }
    ];
  }

  return (
    <MaterialTable
      title={
        props.type.charAt(0).toUpperCase() + props.type.slice(1) + " Table"
      }
      columns={colums}
      data={datas.map(d => {
        return d;
      })}
      options={{
        filtering: true,
        search: false
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.editRow(oldData, newData);
            }, 600);
          }),
        onRowDelete: data =>
          new Promise(resolve => {
            resolve();
            props.deleteRow(props.type, data);
          })
      }}
    />
  );
}
