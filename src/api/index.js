import axios from "axios";

const baseURL = "http://localhost:8000/"

export const valiateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        return res
    } catch (err) {
        return err
    }
}