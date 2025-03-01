import axios from "axios"

const baseUrl = "http://localhost:3001/orders"

const CreateOrder = async (order) => {
    return axios.post(baseUrl, order);
}

const GetOrders = async () => {
    return axios.get(baseUrl)
}

export {CreateOrder, GetOrders};
