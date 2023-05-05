import { defer } from "react-router-dom"
import { getData } from "./services/NodeService"

export const productsLoader = async ({ params }) => {
    const urls = ['product', 'product/options/size', 'product/options/color']
    const [products, size, color] = await Promise.all(urls.map(url => getData(url, { ...params, pageSize: 12 })))
    if (products) return { products, filters: { size, color } }
    else return { products: [], filters: { size: [], color: [] } }
}

export const productDetailsLoader = async ({ params }) => {
    const product = await getData(`product/${params.handler}`)
    if (product) return { product }
    else return { product: {} }
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
