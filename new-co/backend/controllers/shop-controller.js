const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/shop-query.json");
var queries = JSON.parse(rawdata);

class ShopController {
  async getAllShops(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getShops);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateShop(req, res) {
    try {
      if (
        req.body.address != null &&
        req.body.ass_id != null &&
        req.body.name != null &&
        req.body.id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("address", sql.NVarChar, req.body.address)
          .input("ass_id", sql.Int, req.body.ass_id)
          .input("name", sql.NVarChar, req.body.name)
          .input("id", sql.Int, req.body.id)
          .query(queries.updtShop);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addNewShop(req, res) {
    try {
      if (
        req.body.address != null &&
        req.body.ass_id != null &&
        req.body.name != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("address", sql.NVarChar, req.body.address)
          .input("ass_id", sql.Int, req.body.ass_id)
          .input("name", sql.NVarChar, req.body.name)

          .query(queries.addShop);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateShopNm(req, res) {
    try {
      if (req.body.newname != null && req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("newname", sql.NVarChar, req.body.newname)
          .input("name", sql.NVarChar, req.body.name)
          .query(queries.updateShopNm);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteShop(req, res) {
    var idtoshow = req.body.id;
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.dltShop);
        res.json(result);
      } else {
        res.send("Please fill all the details! shop");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new ShopController();
module.exports = controller;
