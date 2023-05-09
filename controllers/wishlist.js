const prisma = require("../config/prisma");

var uuid = require("uuid").v4;

exports.createWishlist = async (req, res) => {
    const { productId } = req.body;
    const id = uuid();

    const result = await prisma.wishlist.create({
        data: { id, userId: req.user.id, productId }, select: {
            product: {
                select: {
                    id: true, name: true, image: true, discount: true, price: true, id: true
                }
            }
        }
    })
    res.status(201).send({ id })
}

exports.getWishlist = async (req, res) => {
    const { id: userId } = req.user;
    const result = await prisma.wishlist.findMany({
        where: { userId },
        select: {
            id: true,
            product: {
                select: {
                    id: true, name: true, image: true, discount: true, price: true, handler: true
                }
            }
        }

    })
    res.status(200).send(result)
}

exports.deleteWishlist = async (req, res) => {
    const { id } = req.params;
    await prisma.wishlist.delete({ where: { id } })
    res.status(200).json({ id: id, message: "Product removed from wishlist" });
}