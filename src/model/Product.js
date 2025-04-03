import Database from "../config/database.js";
import crypto from "crypto"

const db = new Database()

async function CreateProduct(n, qnt, p) {
    try {
        const exist = await db.findProductByName(n)
        if (exist.length != 0) return { ok: false, code: 409, msg: "Product already registered" }
        if (n.length < 3) return { ok: false, code: 400, msg: "Bad request" }
        if (qnt < 0 || Math.trunc(qnt) != qnt) return { ok: false, code: 400, msg: "Bad request" }
        if (p < 0) return { ok: false, code: 400, msg: "Bad request" }
        const res = await db.insert("INSERT INTO Produto(name, qnt, price) VALUES (?,?,?)", [n, qnt, p])
        if (res.ok) {
            return {
                ok: true,
                id: res.id,
                name: n,
                qnt,
                price: p
            }
        } else {
            return { ok: false, reason: 500 };
        }
    } catch (error) {
        console.error(error)
        return { ok: false, reason: 500 }
    }

}

async function findProduct(id) {
    const product = await db.findProductById(id)
    return product
}

async function findAllProducts() {
    const Products = await db.findProducts()
    if (!Products) return false
    return Products
}

async function updateProduct(id, n, qnt, p) {
    const Product = await db.findProductById(id)
    if (Product.length == 0) return { ok: false, code: 404, msg: "Product not found!" }
    if (n.length < 3) return { ok: false, code: 400, msg: "Bad request" }
    if (qnt < 0 || Math.trunc(qnt) != qnt) return { ok: false, code: 400, msg: "Bad request" }
    if (p < 0) return { ok: false, code: 400, msg: "Bad request" }

    const newProduct = {
        name: n ??= Product[0].name,
        qnt: qnt ??= Product[0].tel,
        price: p ??= Product[0].cpf,
    }

    const update = await db.updateProduct(id, newProduct)
    if (update.affectedRows > 0) return { ok: true, code: 200, msg: "Updated!", product: newProduct }
    return { ok: false, code: 500, msg: "Failed updating " }
}

async function deleteProduct(id) {
    const Product = await db.findProductById(id)
    if (Product.length == 0) return { ok: false, code: 404, msg: "Product not found!" }
    const result = await db.deleteProduct(id)
    if (!result) return { ok: false, code: 500, msg: "Failed deleting from database" }
    return { ok: true, code: 200, msg: "Deleted!" }
}

export default { CreateProduct, findProduct, findAllProducts, updateProduct, deleteProduct }