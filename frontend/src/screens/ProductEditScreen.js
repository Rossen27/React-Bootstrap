import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductEditScreen() {
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  return (
  <Container className="small-container">
    <Helmet>
      <title> 商 品 編 輯 ${productId} </title>
    </Helmet>
    <h1> 商 品 編 輯 ${productId} </h1>

    {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label> 姓 名 </Form.Label>
          <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='slug'>
          <Form.Label> 品 牌 分 類 </Form.Label>
          <Form.Control
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='price'>
          <Form.Label> 價 格 </Form.Label>
          <Form.Control
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='image'>
          <Form.Label> 商 品 圖 </Form.Label>
          <Form.Control
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='category'>
          <Form.Label> 商 品 分 類 </Form.Label>
          <Form.Control
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='brand'>
          <Form.Label> 品 牌 </Form.Label>
          <Form.Control
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='countInStock'>
          <Form.Label> 庫 存 </Form.Label>
          <Form.Control
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='description'>
          <Form.Label> 商 品 簡 介 </Form.Label>
          <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type="submit" variant='outline-dark primary'> 更 新 </Button>
        </div>
      </Form>
    )}
  </Container>
  );
}
