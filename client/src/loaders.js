import { defer } from "react-router-dom"
import { getData } from "./services/NodeService"

export const productsLoader = async ({ params }) => {
    const products = await getData('product', { ...params, pageSize: 12 })
    const size = await getData('product/options/size', { ...params, pageSize: 12 })
    const color = await getData('product/options/color', { ...params, pageSize: 12 })
    return { products, filters: { size, color } }
}

export const productDetailsLoader = async ({ params }) => {
    const product = await getData(`product/${params.handler}`)
    return { product }
}

export const orderDetailsLoader = async ({ request }) => {
    const query = new URLSearchParams(request.url.split("?")[1])
    const data = getData(`order/${query.get('order_id')}/${query.get('item_id')}`)
    return defer({ data });
}

export const ordersLoader = async () => {
    const data = getData("order");
    return defer({ data });
}
