import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
      dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/order`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ 
          type: 'FETCH_FAIL', 
          payload: getError(err) });
      }
    };
    fetchData();
  },[userInfo]);

  return (
    <div>
      <Helmet>
        <title> 訂 單 管 理 </title>
      </Helmet>
      <h1> 訂 單 管 理 </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th> 編 號 </th>
              <th> 姓 名 </th>
              <th> 日 期 </th>
              <th> 總 金 額 </th>
              <th> 付 款 方 式 </th>
              <th> 運 送 狀 況 </th>
              <th> 訂 單 狀 況 </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : '用戶不存在'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : '無'}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : '無'}</td>
                <td>
                  {order.isDelivered
                  ? order.deliveredAt.substring(0, 10)
                  : '無'
                  }
                </td>
                <td>
                  <Button 
                    type="button"
                    variant='outline-dark primary'
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                    >
                    詳 情
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
