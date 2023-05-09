require("dotenv").config();
const prisma = require("../config/prisma");
const uuid = require("uuid").v4;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    const { orderItemIds, orderId } = req.body;

    const result = await prisma.orderItem.findMany({ select: { quantity: true, price: true, product: { select: { name: true } } }, where: { id: { in: orderItemIds } } })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: result.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item?.product?.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: "payment",
        success_url:
            req.headers.origin + "/myaccount/order/success?oid=" + orderId,
        cancel_url:
            req.headers.origin + "/myaccount/order/failed?oid=" + orderId,
    });
    res.status(200).json({ url: session.url });
}

exports.updatePaymentStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params
    await prisma.payment.update({ data: { status }, where: { id } })

    res.status(200).send("Payment Updated")
}