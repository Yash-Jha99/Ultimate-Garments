import { useEffect, useState } from "react"
import { getData } from "../Services/NodeService"

const useDataFetch = (url, initial, cb = null) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(initial)

    useEffect(() => {
        (async () => {
            const response = await getData(url)
            setLoading(false)
            if (response.status) {
                setError(response)

            }
            else {
                setData(response)
                if (cb) cb(response)

            }
        })()
    }, [url])

    return { data, loading, error }
}

export default useDataFetch