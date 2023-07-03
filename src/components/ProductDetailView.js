import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";


import { Container, Button, Card } from "react-bootstrap";

const API_URL = "https://fakestoreapi.com/products";

const ProductDetailView = () => {
 
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = () => {
    
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Product deleted");

       navigate('/products')  
        alert('Product deleted')

      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="detail_section">
        <div className="col-3 detail_card">
          <Card className="detail_card2" key={product.id}>
            <Card.Img className="card_img" variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Card.Text>{product.description}</Card.Text>

              <Link
                to={`/products/${product.id}/edit`}
                className="btn btn-warning me-2"
              >
                Edit
              </Link>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ProductDetailView;
