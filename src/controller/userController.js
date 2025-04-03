import modelUser from "../model/User.js"

async function createUser(req, res) {
    if (!req.body) return res.status(400).send({ msg: "Bad request!" })
    const { name, pass, tel, cpf } = req.body

    if (!name || !pass || !tel || !cpf) return res.status(400).send({ msg: "Bad request!" })

    //VALIDACAO DE DADOS

    if (name.length < 3) return res.status(400).send({ msg: "Bad request!", reason: "Name must be minimun 3 characters" })
    if (pass.length < 4) return res.status(400).send({ msg: "Bad request!", reason: "Password must be minimun 8 characters" })
    if (cpf.length != 11) return res.status(400).send({ msg: "Bad request!", reason: "CPF need to have 11 characters" })

    const user = await modelUser.CreateUser(name, pass, tel, cpf)
    if (!user.ok && user.reason == 409) return res.status(409).send({ msg: "User already registered!" })
    if (!user.ok && user.reason == 500) return res.status(500).send({ msg: "Internal server error!" })
    return res.status(201).send({ msg: "Created!", user })

}

async function findUser(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    const user = await modelUser.findUser(id)
    if (user.length == 0) return res.status(404).send({ msg: "User not found!" })
    return res.status(200).send(user)
}

async function findAllUsers(req, res) {
    const users = await modelUser.findAllUsers()
    if (!users) return res.status(500).send({ msg: "Internal server error!" })
    return res.status(200).send(users)
}

async function updateUser(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    if (!req.body) return res.status(400).send({ msg: "Bad request!" })
    const { name, tel, cpf } = req.body

    if (!name && !tel && !cpf) return res.status(400).send({ msg: "Bad request!" })

    const result = await modelUser.updateUser(id, name, tel, cpf)
    return res.status(result.code).send(result.msg)

}

async function deleteUser(req, res) {
    const id = req.params.id
    if (!id) return res.status(400).send({ msg: "Id is required in this route!" })
    const result = await modelUser.deleteUser(id)
    return res.status(result.code).send(result.msg)
}

export default { createUser, findAllUsers, deleteUser, findUser, updateUser };
