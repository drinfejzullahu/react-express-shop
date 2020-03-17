const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/product-service-query.json");
var queries = JSON.parse(rawdata);

class ProductServiceController {
  async getAllProductServices(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getProductServices);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getAllProductWithServices(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getProductAndService);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getPrdSrcById(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("p_id", sql.Int, req.body.p_id)
        .query(queries.getProductServicesById);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addNewProductService(req, res) {
    try {
      if (req.body.p_id != null && req.body.s_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.Int, req.body.p_id)
          .input("s_id", sql.Int, req.body.s_id)
          .query(queries.addProductService);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateServiceInProduct(req, res) {
    try {
      if (req.body.new_s_id != null && req.body.p_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("new_s_id", sql.Int, req.body.new_s_id)
          .input("p_id", sql.Int, req.body.p_id)
          .query(queries.updateSrInPr);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteProductService(req, res) {
    try {
      if (
        req.body.id != null &&
        req.body.s_id != null &&
        req.body.p_id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .input("p_id", sql.Int, req.body.p_id)
          .input("s_id", sql.Int, req.body.s_id)
          .query(queries.dltProductService);
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

const controller = new ProductServiceController();
module.exports = controller;
