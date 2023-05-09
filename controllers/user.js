const prisma = require("../config/prisma");
const { validate } = require("../models/auth");
var uuid = require("uuid").v4;
const { generateAuthToken } = require("../middlewares/tokens");

exports.createUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, mobileNumber, email, notify } = req.body;
    const id = uuid();

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) return res.status(400).json({ result: "User already registered" });

    await prisma.user.create({
        data: { id, ...req.body, notify }
    })

    const token = generateAuthToken({ id, mobileNumber, name });
    return res.status(201).cookie('token', token, { httpOnly: true, maxAge: 604_800_800 }).send(token);
}

exports.updateUser = async (req, res) => {
    const { firstName, lastName, mobileNumber, notify, gender, dob } = req.body;
    const { id } = req.params;
    const name = firstName + " " + lastName;

    await prisma.user.update({ where: { id }, data: { name, mobileNumber, gender, dob, notify } })

    return res.status(200).json({ result: "User updated" });

}

exports.getUserById = async (req, res) => {
    const { id } = req.params

    const result = await prisma.user.findUnique({ where: { id } })

    res.status(200).send(result)
}