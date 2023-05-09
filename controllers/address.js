const prisma = require("../config/prisma");
const uuid = require("uuid").v4;

exports.createAddress = async (req, res) => {
    const id = uuid();
    const { id: userId } = req.user
    const { isDefault, ...data } = req.body
    await prisma.address.create({
        data: { id, ...data, userId }
    })

    if (isDefault) await prisma.user.update({
        where: { id: req.user.id }, data: {
            defaultAddressId: id
        }
    })
    return res.status(201).json({ id });
}

exports.updateAddress = async (req, res) => {
    const { id } = req.params
    const { id: userId } = req.user
    const { isDefault, ...data } = req.body
    await prisma.address.update({
        where: { id },
        data: { ...data, userId }
    })
    if (isDefault) await prisma.user.update({
        where: { id: userId }, data: {
            defaultAddressId: id
        }
    })
    return res.status(200).json({ id });
}

exports.getAddress = async (req, res) => {
    const result = await prisma.address.findMany(({
        include: { user: { select: { defaultAddressId: true } } }
        , where: { userId: req.user.id }
    }))
    return res.status(200).send(result);
}

exports.deleteAddress = async (req, res) => {
    const { id } = req.params
    await prisma.address.delete(({
        where: { id }
    }))
    return res.status(200).send({ result: "Address deleted succesfully" });
}