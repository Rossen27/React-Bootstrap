import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>登 入</Col>
      <Col className={props.step2 ? 'active' : ''}>購 物 車</Col>
      <Col className={props.step3 ? 'active' : ''}>付 款 方 式</Col>
      <Col className={props.step4 ? 'active' : ''}>結 帳</Col>
    </Row>
  );
}