import { useEffect, useState } from "react";
import * as productService from "../../service/ProductService";
import { Link } from "react-router-dom";
import * as categoryService from "../../service/CategoryService";
import debounce from 'lodash.debounce';

function ProductList() {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts(searchName, searchCategory);
    }, [searchName, searchCategory]);

    const getAllProducts = async (searchName, searchCategory) => {
        setLoading(true);
        try {
            let products = await productService.getAllProducts(searchName, searchCategory);
            // console.log("products", products)
            setProduct(products);
        } catch (error) {
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            let categories = await categoryService.getAllCategories();
            setCategory(categories);
        } catch (error) {
            setError("Failed to load categories.");
        }
    };


    const handleSearchName = debounce((value) => setSearchName(value), 500);
    const handleSearchCategory = debounce((value) => setSearchCategory(value));

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => handleSearchName(e.target.value)}
                /><br />
                <select
                    className="form-control ml-3"
                    onChange={(e) => handleSearchCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {category.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select><br />
                <Link to="/createProduct" className="btn btn-primary">Thêm mới</Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : products.length === 0 ? (
                <div>Tôi không tìm kiếm được sản phẩm.</div>
            ) : (
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Thể loại</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Ngày nhập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.category.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;
