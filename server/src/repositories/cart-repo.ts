import cartModels from "../models/cart-models.js";
import productModel from "../models/product-model.js";

export const findCartByUserId = async (userId: string) => {
    return await cartModels.findOne({ user: userId })
        .populate({
            path: "items.product",
            model: productModel,
            select: "name price slug category",
        })
        .exec();
};

export const createEmptyCart = async (userId: string) => {
    const cart = new cartModels({
        user: userId,
        items: [],
    });
    return await cart.save();
};

export const saveCart = async (cart: any) => {
    return await cart.save();
};