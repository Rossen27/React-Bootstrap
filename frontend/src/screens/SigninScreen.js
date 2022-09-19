import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

export default function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title> 會 員 登 入 </title>
      </Helmet>
      <h1 className='my-3'> 會 員 登 入 </h1>
      <Form>
        <Form.Group className='md-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required placeholder="Password" />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit' variant="outline-secondary"> 登 入 </Button>
        </div>
        <div className='mb-3'>
          尚 未 註 冊 ? {''}
          <Link to={`/signup?redirect=${redirect}`}>建立帳戶</Link>
        </div>
      </Form>
    </Container>
  )
}