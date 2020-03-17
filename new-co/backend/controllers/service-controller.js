const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/service-query.json");
var queries = JSON.parse(rawdata);

class ServiceController {
  async getAllServices(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getServices);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getOneServiceById(req, res) {
    try {
      if (req.body.s_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("s_id", sql.Int, req.body.s_id)
          .query(queries.getServiceById);
        res.json(result.recordset);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addNewService(req, res) {
    try {
      if (
        req.body.description != null &&
        req.body.price != null &&
        req.body.status != null &&
        req.body.name != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("description", sql.NVarChar, req.body.description)
          .input("price", sql.Float, req.body.price)
          .input("status", sql.Bit, req.body.status)
          .input("name", sql.NVarChar, req.body.name)

          .query(queries.addService);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateService(req, res) {
    try {
      if (
        req.body.description != null &&
        req.body.price != null &&
        req.body.status != null &&
        req.body.name != null &&
        req.body.id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("description", sql.NVarChar, req.body.description)
          .input("price", sql.Float, req.body.price)
          .input("status", sql.Bit, req.body.status)
          .input("name", sql.NVarChar, req.body.name)
          .input("id", sql.Int, req.body.id)
          .query(queries.updtService);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateServiceState(req, res) {
    try {
      if (req.body.status != null && req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("status", sql.Bit, req.body.status)
          .input("name", sql.NVarChar, req.body.name)
          .query(queries.updateServiceSt);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteService(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.dltService);
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

const controller = new ServiceController();
module.exports = controller;
