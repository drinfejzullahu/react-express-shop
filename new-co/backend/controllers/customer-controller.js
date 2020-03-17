const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/customer-query.json");
var queries = JSON.parse(rawdata);

class CustomerController {
  async getAllCustomers(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getCustomers);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getOneCustomerById(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.getCustomerById);
        res.json(result.recordset);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addNewCustomer(req, res) {
    try {
      if (
        req.body.name != null &&
        req.body.surname != null &&
        req.body.address != null &&
        req.body.phone != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("surname", sql.NVarChar, req.body.surname)
          .input("address", sql.NVarChar, req.body.address)
          .input("phone", sql.NVarChar, req.body.phone)

          .query(queries.addCustomer);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateCustomer(req, res) {
    try {
      if (
        req.body.name != null &&
        req.body.surname != null &&
        req.body.address != null &&
        req.body.phone != null &&
        req.body.id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("surname", sql.NVarChar, req.body.surname)
          .input("address", sql.NVarChar, req.body.address)
          .input("phone", sql.NVarChar, req.body.phone)
          .input("id", sql.Int, req.body.id)
          .query(queries.updCustomer);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteCustomer(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.dltCustomer);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new CustomerController();
module.exports = controller;
