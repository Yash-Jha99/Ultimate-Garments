import axios from "axios"

export const api = ({ dispatch, getState }) => next => async (action) => {
    if (action.type !== "api/callBegin") return next(action)

    const { url, method, data, onSuccess, onError } = action.payload

    next(action)
    try {
        const response = await axios.request({
            baseURL: process.env.REACT_APP_SERVER_URL,
            url,
            method,
            data
        })

        if (onSuccess)
            dispatch({ type: onSuccess, payload: response.data })

    }
    catch (err) {
        console.log(err)
        if (onError)
            dispatch({ type: onError, payload: err.message })
    }

}