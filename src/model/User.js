import Database from "../config/database.js";
import crypto from "crypto"

const db = new Database()

function encryptPass(pass) {
    return crypto.createHash("sha256", { encoding: "utf-8" }).update(pass, "utf8").digest("hex")
}

async function CreateUser(n, p, t, c) {
    const pass = encryptPass(p)
    try {
        const exist = await db.findByCpf(c)
        if (exist.length != 0) return { ok: false, reason: 409 }
        const res = await db.insert("INSERT INTO User(name, pass, tel, cpf) VALUES (?,?,?,?)", [n, pass, t, c])
        if (res.ok) {
            return {
                id: res.id,
                name: n,
                pass,
                tel: t,
                cpf: c
            }
        } else {
            return { ok: false, reason: 500 };
        }
    } catch (error) {
        console.error(error)
    }

}

async function findUser(id) {
    const user = await db.findById(id)
    return user
}

async function findAllUsers() {
    const users = await db.findUsers()
    if (!users) return false
    return users
}

async function updateUser(id, n, t, c) {
    const user = await db.findById(id)
    if (user.length == 0) return { ok: false, code: 404, msg: "User not found!" }
    const newUser = {
        name: n ??= user[0].name,
        tel: t ??= user[0].tel,
        cpf: c ??= user[0].cpf,
    }

    const update = await db.updateUser(id, newUser)
    if (update.affectedRows > 0) return { ok: true, code: 200, msg: "Updated!" }
    return { ok: false, code: 500, msg: "Failed updating " }
}

async function deleteUser(id) {
    const user = await db.findById(id)
    if (user.length == 0) return { ok: false, code: 404, msg: "User not found!" }
    const result = await db.deleteUser(id)
    if (!result) return { ok: false, code: 500, msg: "Failed deleting from database" }
    return { ok: true, code: 200, msg: "Deleted!" }
}

export default { CreateUser, findUser, findAllUsers, updateUser, deleteUser }