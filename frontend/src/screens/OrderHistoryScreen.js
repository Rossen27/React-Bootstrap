import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, orders: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ Loading, error, orders }, dispatch] = useReducer(reducer, {
    Loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const { data } = await axios.get(
            `api/orders/mine`,
            { headers: { Authorization:`Bearer ${userInfo.token}` } }
          );
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
          dispatch({
            type: 'FETCH_FAIL',
            payload: getError(error),
          });
        }
    };
    fetchData();

  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>歷 史 訂 單</title>
      </Helmet>
      <h1>歷 史 訂 單</h1>
      {Loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
            <Button
            type="button"
            variant="outline-secondary"
            onClick={() => {
              navigate(`/order/${order.id}`);
            }}
            >詳情</Button>
          </tr>
        ))}
        </tbody>
        </table>
      )}
    </div>
  )
}
