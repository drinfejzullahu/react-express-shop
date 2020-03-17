const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/sold-query.json");
var queries = JSON.parse(rawdata);

class SoldController {
  async getAllSoldProducts(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getSoldProducts);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getAllSoldForAssistant(req, res) {
    try {
      if (req.body.ass_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("ass_id", sql.Int, req.body.ass_id)
          .query(queries.getSoldProductsForAssistant);
        res.json(result.recordset);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getAllSoldForShop(req, res) {
    try {
      if (req.body.sh_id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("sh_id", sql.Int, req.body.sh_id)
          .query(queries.getSoldProductsForShop);
        res.json(result.recordset);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addNewSoldProduct(req, res) {
    try {
      if (
        req.body.p_id != null &&
        req.body.sh_id != null &&
        req.body.ass_id != null &&
        req.body.c_id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.Int, req.body.p_id)
          .input("sh_id", sql.Int, req.body.sh_id)
          .input("ass_id", sql.Int, req.body.ass_id)
          .input("c_id", sql.Int, req.body.c_id)
          .query(queries.addSoldProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateSoldProduct(req, res) {
    try {
      if (
        req.body.p_id != null &&
        req.body.sh_id != null &&
        req.body.ass_id != null &&
        req.body.c_id != null &&
        req.body.id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.Int, req.body.p_id)
          .input("sh_id", sql.Int, req.body.sh_id)
          .input("ass_id", sql.Int, req.body.ass_id)
          .input("c_id", sql.Int, req.body.c_id)
          .input("id", sql.Int, req.body.id)
          .query(queries.updtSoldProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async deleteSoldProduct(req, res) {
    try {
      if (req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("p_id", sql.NVarChar, req.body.p_id)
          .input("sh_id", sql.NVarChar, req.body.sh_id)
          .input("ass_id", sql.NVarChar, req.body.ass_id)
          .input("c_id", sql.NVarChar, req.body.c_id)
          .query(queries.dltSoldProduct);
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

const controller = new SoldController();
module.exports = controller;
