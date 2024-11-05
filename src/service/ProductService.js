import axios from "axios";

const URL_PRODUCTS = "http://localhost:3030/products";

export const getAllProducts = async (searchName, searchCategory) => {
    try {
        let res = await axios.get(URL_PRODUCTS);
        let products = res.data;

        if (searchName) {
            const regex = new RegExp(searchName, "i");
            products = products.filter(product => regex.test(product.name));
        }

        if (searchCategory) {
            products = products.filter(product => product.category.id === searchCategory);
        }

        return products;
    } catch (error) {
        console.error("Error fetching product:", error);
        return [];
    }
};

export const saveProduct = async (product) => {
    try {
        await axios.post(URL_PRODUCTS, product)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

