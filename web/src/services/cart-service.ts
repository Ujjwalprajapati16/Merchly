import api from "@/lib/axios"

export const getCart = async () => {
    const res = await api.get("/cart");
    console.log(res.data.cart);
    return res.data.cart;
}