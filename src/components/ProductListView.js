import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Pagination,
  Form,
  Button,
  Table,
  Container,
  Card,
} from "react-bootstrap";

const ProductListView = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = products.filter((product) => {
        if (selectedCategory !== "All" && product.category !== selectedCategory) {
          return false;
        }

        if (
          searchTerm !== "" &&
          !product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        return true;
      });

      setFilteredProducts(filtered);
      setCurrentPage(1);
    };

    applyFilters();
  }, [selectedCategory, searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(["All", ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const searchProducts = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    return (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Container className="CategoryFilter" fluid>
        <div className="categoryfilter">
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                value={category}
                onClick={() => filterProductsByCategory(category)}
                className={selectedCategory === category ? "active" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <Form.Group className="categorySearch">
            <Form.Control
              type="text"
              placeholder="Search..."
              onChange={searchProducts}
            />
          </Form.Group>
        </div>

        <div className="">
          <Link to="/products/new" className="add_btn">
            Add New Product
          </Link>
        </div>
      </Container>

      <Container fluid className="my-3">
        <h1 className="text-center">Products</h1>
        <div className="product_section">
          <div className="row">
            {currentProducts.map((item) => (
              <div className="col-3 product_card" key={item.id}>
                <Card className="product_card2">
                  <Card.Img
                    className="card_img"
                    variant="top"
                    src={item.image}
                  />
                  <Card.Body>
                    <Card.Title>{item.title.substring(0, 25)}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>

                    <Link
                      to={`/products/${item.id}`}
                      className="btn btn-primary me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/products/${item.id}/edit`}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>

    

      <Container className="pagination_section">
        <Pagination>
          <Pagination.Prev
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />
          {pageNumbers.map((pageNumber) => paginate(pageNumber))}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredProducts.length / productsPerPage)
            }
          />
        </Pagination>
      </Container>
    </div>
  );
};

export default ProductListView;
