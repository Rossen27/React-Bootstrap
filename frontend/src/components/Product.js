import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <>
    {[
      'Dark',
    ].map((variant) => (
    <Card bg={variant.toLowerCase()} key={variant} text={variant.toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-2">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>      
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button variant="outline-light primary" size="sm">加入購物車</Button>
      </Card.Body>
  </Card>
  ))}
  </>
  );
}
export default Product;