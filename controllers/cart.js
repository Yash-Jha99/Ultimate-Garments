const prisma = require("../config/prisma");
const uuid = require("uuid").v4

exports.createCart = async (req, res) => {
    const { productId, quantity, productOptionId } = req.body;
    const { id: userId } = req.user;
    const id = uuid();

    const result = await prisma.cart.create({
        data: { id, productId, userId, quantity, productOptionId },
        select: {
            id: true, quantity: true, product: {
                select: {
                    name: true, image: true, discount: true, price: true, id: true
                }
            },
            option: { select: { size: true, sku: true, stock: true, color: true, id: true } }
        }
    })

    res.status(200).send(result)
}

exports.getCart = async (req, res) => {
    const { userId } = req.user;
    const result = await prisma.cart.findMany({
        where: { userId }, select: {
            id: true, quantity: true, product: {
                select: {
                    name: true, image: true, discount: true, price: true, id: true
                }
            },
            option: { select: { size: true, sku: true, stock: true, color: true, id: true } }
        }
    })

    res.status(200).send(result)
}

exports.updateCart = async (req, res) => {
    const { productId, quantity, productOptionId } = req.body;
    const { id: userId } = req.user;
    const { id } = req.params

    await prisma.cart.update({
        where: { id },
        data: { productId, userId, quantity, productOptionId },
    })
    res.status(200).json({ id, quantity, message: "Cart Updated Succesfully" });
}

exports.deleteCart = async (req, res) => {
    const { id } = req.params

    await prisma.cart.delete({
        where: { id },
    })
    res.status(200).json({ id, message: "Product removed from cart" });
}