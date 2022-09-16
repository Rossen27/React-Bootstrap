import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  return (
    <div>
      <Helmet>
        <title>購物車</title>
      </Helmet>
      <h1>購物車</h1>
      <Row>
        <Col md={8}>
          {
            cartItem.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">繼續購物</Link>
              </MessageBox>
            ) :
              (
                <ListGroup>
                  {cartItem.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className='align=items-canter'>
                        <Col md={4}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{' '}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <Button variant="light" disabled={item.quantity === 1}>
                            <i className='fas fa-minus-circle'></i>
                          </Button>{' '}
                          <span>{item.quantity}</span>{' '}
                          <Button variant="light" disabled={item.quantity === 1}>
                            <i className='fas fa-plus-circle'></i>
                          </Button>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                        <Col md={2}>
                          <Button variant="light">
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )
          }
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};
