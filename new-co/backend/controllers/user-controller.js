const { sql, poolPromise } = require("../db/config");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/user-query.json");
var queries = JSON.parse(rawdata);

class UserController {
  async getAllUsers(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getUsers);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getAllRoles(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getRoles);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addNewUser(req, res) {
    try {
      if (
        req.body.name != null &&
        req.body.surname != null &&
        req.body.address != null &&
        req.body.phone != null &&
        req.body.email != null &&
        req.body.password != null &&
        req.body.roleId != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("surname", sql.NVarChar, req.body.surname)
          .input("address", sql.NVarChar, req.body.address)
          .input("phone", sql.NVarChar, req.body.phone)
          .input("email", sql.NVarChar, req.body.email)
          .input("password", sql.NVarChar, req.body.password)
          .input("roleId", sql.Int, req.body.roleId)

          .query(queries.addUser);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      if (
        req.body.name != null &&
        req.body.surname != null &&
        req.body.address != null &&
        req.body.phone != null &&
        req.body.email != null &&
        req.body.password != null &&
        req.body.roleId != null &&
        req.body.id != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("surname", sql.NVarChar, req.body.surname)
          .input("address", sql.NVarChar, req.body.address)
          .input("phone", sql.NVarChar, req.body.phone)
          .input("email", sql.NVarChar, req.body.email)
          .input("password", sql.NVarChar, req.body.password)
          .input("roleId", sql.Int, req.body.roleId)
          .input("id", sql.Int, req.body.id)
          .query(queries.updtUser);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addShopAssistant(req, res) {
    try {
      if (
        req.body.name != null &&
        req.body.surname != null &&
        req.body.address != null &&
        req.body.phone != null &&
        req.body.email != null &&
        req.body.password != null &&
        req.body.roleId != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("surname", sql.NVarChar, req.body.surname)
          .input("address", sql.NVarChar, req.body.address)
          .input("phone", sql.NVarChar, req.body.phone)
          .input("email", sql.NVarChar, req.body.email)
          .input("password", sql.NVarChar, req.body.password)
          .input("roleId", sql.Int, req.body.roleId)
          .query(queries.addShopAssistnt);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateUserPassword(req, res) {
    try {
      if (req.body.newpassword != null && req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("newpassword", sql.NVarChar, req.body.newpassword)
          .input("name", sql.NVarChar, req.body.name)
          .query(queries.updateUserPassword);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteUser(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.NVarChar, req.body.id)
          .query(queries.deleteUsr);
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

const controller = new UserController();
module.exports = controller;
