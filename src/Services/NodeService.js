import axios from "axios"

const ServerURL = process.env.REACT_APP_SERVER_URL
// const ServerURL = "http://localhost:5000"
// const ServerURL = "https://fakestoreapi.com"

axios.defaults.headers.common['access-token'] = process.env.REACT_APP_API_KEY

export const postData = async (url, body, isFile = false) => {
    try {
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json"
            }
        }

        const response = await axios.post(`${ServerURL}/${url}`, body, headers)
        return response
    }
    catch (error) {
        console.log("POST DATA Error: ", error.response.data)
        return error.response
    }
}

export const updateData = async (url, body, isFile = false) => {
    try {
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json"
            }
        }

        const response = await axios.put(`${ServerURL}/${url}`, body, headers)
        return response
    }
    catch (error) {
        console.log("POST DATA Error: ", error.response.data)
        return error.response
    }
}

export const getData = async (url) => {
    try {
        const headers = {
            headers: {
                "content-type": "application/json"
            }
        }

        const response = await axios.get(`${ServerURL}/${url}`, headers)
        const result = response.data
        return result
    }
    catch (error) {
        console.log("Get DATA Error: ", error.response)
        return { status: error.response.status, data: error.response.data }
    }
}

export const deleteData = async (url) => {
    try {
        const headers = {
            headers: {
                "content-type": "application/json"
            }
        }

        const response = await axios.delete(`${ServerURL}/${url}`, headers)
        return response
    }
    catch (error) {
        console.log("POST DATA Error: ", error.response.data)
        return error.response
    }
}