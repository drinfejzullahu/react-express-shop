const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/product-query.json");
var queries = JSON.parse(rawdata);

class ProductController {
  async getAllProducts(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getProducts);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getProductsOutOfStock(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getPrOutOfStock);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addNewProduct(req, res) {
    try {
      if (
        req.body.description != null &&
        req.body.validity != null &&
        req.body.state != null &&
        req.body.quantity != null &&
        req.body.name != null &&
        req.body.sh_id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("description", sql.NVarChar, req.body.description)
          .input("validity", sql.DateTime, req.body.validity)
          .input("state", sql.NVarChar, req.body.state)
          .input("quantity", sql.Int, req.body.quantity)
          .input("name", sql.NVarChar, req.body.name)
          .input("sh_id", sql.Int, req.body.sh_id)

          .query(queries.addProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updtProduct(req, res) {
    try {
      if (
        req.body.description != null &&
        req.body.validity != null &&
        req.body.state != null &&
        req.body.quantity != null &&
        req.body.name != null &&
        req.body.p_id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("description", sql.NVarChar, req.body.description)
          .input("validity", sql.DateTime, req.body.validity)
          .input("state", sql.NVarChar, req.body.state)
          .input("quantity", sql.Int, req.body.quantity)
          .input("name", sql.NVarChar, req.body.name)
          .input("p_id", sql.Int, req.body.p_id)
          .query(queries.updateProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateProductQuantity(req, res) {
    try {
      if (req.body.p_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.NVarChar, req.body.p_id)
          .query(queries.updateProductQnt);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async changeState(req, res) {
    try {
      if (req.body.state != null && req.body.name !== null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("state", sql.NVarChar, req.body.state)
          .input("name", sql.NVarChar, req.body.name)
          .query(queries.changeProductState);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteProduct(req, res) {
    try {
      if (req.body.p_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.Int, req.body.p_id)
          .query(queries.dltProduct);
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

const controller = new ProductController();
module.exports = controller;
