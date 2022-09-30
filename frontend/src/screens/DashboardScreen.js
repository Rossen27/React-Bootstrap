import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/esm/Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch(err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return ( 
    <div>
      <h1> 介 面 管 理 </h1>
      {loading ? (
        <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
        <>
          <Row>
            <Col mb={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0] 
                    ? summary.users[0].numUsers
                    : 0}
                  </Card.Title>
                  <Card.Text> 用 戶 </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col mb={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.orders[0] 
                    ? summary.orders[0].numOrders
                    : 0}
                  </Card.Title>
                  <Card.Text> 訂 單 </Card.Text>
                </Card.Body>
              </Card>
            </Col> 
            <Col mb={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    $ 
                    {summary.orders && summary.orders[0] 
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                  </Card.Title>
                  <Card.Text> 訂 單 總 額 </Card.Text>
                </Card.Body>
              </Card>
            </Col>         
          </Row>
          <div className='my-3'>
            <h2> 銷 售 紀 錄 </h2>
            { summary.dailyOrders.length === 0 
            ? (<MessageBox> 無 銷 售 紀 錄 </MessageBox>) 
            : (
              <Chart
              width="100%"
              height="400px"
              chartType="AreaChart"
              loading={<div> 圖 表 更 新 中... </div>}
              data={[['Date', 'Sales'], 
              ...summary.dailyOrders.map((x) => [x._id, x.sales]),
              ]}
              ></Chart>
            ) }
          </div>
          <div className='my-3'>
            <h2> 類 別 </h2>
            { summary.productCategories.length === 0 
            ? (<MessageBox> 無 類 別 紀 錄 </MessageBox>) 
            : (
              <Chart
              width="100%"
              height="400px"
              chartType="PieChart"
              loading={<div> 圖 表 更 新 中... </div>}
              data={[['Category', 'Products'], 
              ...summary.productCategories.map((x) => [x._id, x.count]),
              ]}
              ></Chart>
            ) }
          </div>
        </>
      )}
    </div>
  );
}
