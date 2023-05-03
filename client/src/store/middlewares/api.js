import axiosInstance from "../../config/axios"
import { apiCallFailed, apiCallSuccess } from "../reducers/api"


export const api = ({ dispatch }) => next => async (action) => {
    if (action.type !== "api/callBegin") return next(action)

    const { url, method, data, onSuccess, onError } = action.payload

    next(action)
    try {
        const response = await axiosInstance.request({
            baseURL: import.meta.env.VITE_SERVER_URL,
            url,
            method,
            data
        })

        if (onSuccess)
            dispatch({ type: onSuccess, payload: response.data })
        else dispatch({ type: apiCallSuccess })

    }
    catch (err) {
        console.log("[Redux Error]", err.message)
        if (onError)
            dispatch({ type: onError, payload: err.message })
        else dispatch({ type: apiCallFailed })
    }

}