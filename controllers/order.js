const prisma = require("../config/prisma");
const uuid = require("uuid").v4;

exports.createOrder = async (req, res) => {
    const { products, addressId, paymentType } = req.body;
    const { id: userId } = req.user;
    const orderId = uuid();
    const paymentId = uuid();

    const orderItems = products.map(product => ({ id: uuid(), productId: product.id, productOptionId: product.optionId, quantity: product.quantity, price: product.price }))

    const amount = products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const createOrder = prisma.order.create({
        data: {
            id: orderId, userId, paymentId, addressId, status: "ORDERED",
            orderItem: { createMany: { data: orderItems } },
        },
        select: { orderItem: { where: { orderId } } }
    })

    const createPayment = prisma.payment.create({
        data: {
            id: paymentId, amount, status: "PENDING", type: paymentType,
        }
    })

    const deleteFromCart = prisma.cart.deleteMany({
        where: {
            id: {
                in: products.map(item => item.cartId)
            }
        }
    })

    const [, order] = await prisma.$transaction([createPayment, createOrder, deleteFromCart])
    res.status(201).json({ orderId, orderItemIds: order.orderItem.map(e => e.id) })
}

exports.getOrder = async (req, res) => {
    const { id: userId } = req.user;
    const result = await prisma.orderItem.findMany({
        select: {
            id: true, orderId: true, order: { select: { status: true, orderedAt: true } }, price: true, product: { select: { image: true, name: true } }
        },
        where: { order: { userId } },
        orderBy: { order: { orderedAt: "desc" } }
    })

    res.status(200).send(result)
}

exports.getOrderDetails = async (req, res) => {
    const { orderId, orderItemId } = req.params;
    const result = await prisma.orderItem.findFirst({
        select: { product: { select: { name: true, image: true, handler: true } }, price: true, productOption: { select: { color: true, size: true } }, order: { include: { address: true, payment: { select: { type: true } } } } },
        where: { id: orderItemId }
    })
    res.status(200).send(result)
}

exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    await prisma.order.update({ data: { status }, where: { id: orderId } })

    res.status(200).send("Order updated succesfully");
}