import axios from "axios"

export default axios.create({
    baseURL: "https://localhost:7046/api/", // https://anyhand.co/  
    headers: {
        "Content-Type": "application/json"
    },
})