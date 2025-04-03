import modelProduct from "../model/Product.js"

async function createProduct(req, res) {
    if (!req.body) return res.status(400).send({ msg: "Bad request!" })
    const { name, qnt, price } = req.body

    if (!name || !qnt || !price) return res.status(400).send({ msg: "Bad request!" })

    const Product = await modelProduct.CreateProduct(name, qnt, price)
    if (!Product.ok) return res.status(Product.code).send({ msg: Product.msg })
    return res.status(201).send({ msg: "Created!", Product })

}

async function findProduct(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    const Product = await modelProduct.findProduct(id)
    if (Product.length == 0) return res.status(404).send({ msg: "Product not found!" })
    return res.status(200).send(Product)
}

async function findAllProducts(req, res) {
    const Products = await modelProduct.findAllProducts()
    if (!Products) return res.status(500).send({ msg: "Internal server error!" })
    return res.status(200).send(Products)
}

async function updateProduct(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    if (!req.body) return res.status(400).send({ msg: "Bad request!" })
    const { name, qnt, price } = req.body

    if (!name && !qnt && !price) return res.status(400).send({ msg: "Bad request!" })

    const result = await modelProduct.updateProduct(id, name, qnt, price)
    return res.status(result.code).send({ msg: result.msg, product: result.product })

}

async function deleteProduct(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    const result = await modelProduct.deleteProduct(id)
    return res.status(result.code).send(result.msg)
}

export default { createProduct, findAllProducts, deleteProduct, findProduct, updateProduct };
