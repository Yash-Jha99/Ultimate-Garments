const Joi = require("joi");
const { generateAuthToken } = require("../middlewares/tokens");
const prisma = require("../config/prisma");

const validateReq = (req) => {
    const schema = Joi.object({
        mobileNumber: Joi.string().length(10).required(),
    });
    return schema.validate(req);
};
const validateOtp = (req) => {
    const schema = Joi.object({
        otp: Joi.string().length(6).required(),
        mobileNumber: Joi.string().length(10).required(),
    });
    return schema.validate(req);
};


exports.login = async (req, res) => {
    const { error } = validateReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { mobileNumber } = req.body
    const user = await prisma.user.findUnique({ where: { mobileNumber } })

    if (user) return res.status(200).json({ isRegistered: true });
    else return res.status(200).json({ isRegistered: false });
}


exports.logout = async (req, res) => {
    res.status(200).cookie('token', null, { httpOnly: true, maxAge: 0 })
}


exports.validateOtp = async (req, res) => {
    const { error } = validateOtp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { mobileNumber } = req.body

    const user = await prisma.user.findUnique({ where: { mobileNumber } })
    console.log(user)
    if (!user) return res.status(200).send(null)

    const { id, isAdmin, name } = user
    const token = generateAuthToken({
        id,
        mobileNumber,
        name,
        isAdmin,
    });
    return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 604_800_800 }).send(token);
}