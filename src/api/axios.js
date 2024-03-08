import axios from "axios"

export default axios.create({
    baseURL: "http://54.156.114.12:5000/api/",
    headers: {
        "Content-Type": "application/json"
    },
})