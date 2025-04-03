import getConfig from "./env.js";
import { createConnection } from "mysql2";

class Database {
  #config = getConfig();
  #conn;

  constructor() {
    this.#conn = this.#connect();
  }

  #connect() {
    try {
      const con = createConnection({
        host: this.#config.database.host,
        port: this.#config.database.port,
        user: this.#config.database.user,
        password: this.#config.database.pass,
        database: this.#config.database.name,
      });

      return con;
    } catch (error) {
      console.error("Failed connecting database, " + error);
    }
  }

  insert(query, values = []) {
    return new Promise((resolve, reject) => {
      this.#conn.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows == 1 ? { ok: true, id: results.insertId } : { ok: false });
        }
      });
    });
  }

  updateUser(id, user) {
    return new Promise((res, reje) => {
      const values = []
      let query = "Update User SET "
      for (const field in user) {
        query += `${field} = ?,`
        values.push(user[field])
      }

      query = query.slice(0, -1)
      query += ` Where id = ?`
      values.push(id)
      console.log(query)
      this.#conn.query(query, values, (err, result, _field) => {
        if (err) reje(err)
        res(result)
      })
    })
  }

  findByCpf(cpf) {
    return new Promise((resolve, reject) => {
      this.#conn.query("SELECT * FROM User WHERE cpf = ?", cpf, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  findById(Id) {
    return new Promise((resolve, reject) => {
      this.#conn.query("SELECT * FROM User WHERE Id = ?", Id, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  findUsers() {
    return new Promise((resolve, reject) => {
      this.#conn.query("SELECT * FROM User", (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  deleteUser(id) {
    return new Promise((resolve, reje) => {
      this.#conn.query("DELETE FROM User WHERE id = ?", id, (err, result, _field) => {
        if (err) reje(err)
        resolve(result)
      })
    })
  }
}

export default Database
