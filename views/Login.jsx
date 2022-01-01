import React from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import Layout from './shared/Layout';

const Login = ({user, errors}) => {

  return (
    <Layout user={user}>
      <>
        <h2 className="mt-4">Login</h2>
        <Form method='post' action='login' id='loginForm'>
          {errors?<Alert variant='danger' style={{whiteSpace: 'pre-wrap'}}>{errors.join('\n')}</Alert>:null}
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type="email" name='email' placeholder="Enter email"/>
            </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name='password' placeholder="Enter password"/>
          </Form.Group>
          <Button type='submit'>Login</Button>
        </Form>
      </>
    </Layout>
  );
}

export default Login;
