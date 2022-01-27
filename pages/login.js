import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import Layout from '../components/shared/Layout';
import { MessageContext } from '../components/MessageContext';
import { UserContext } from '../components/UserContext';

export default function Login(){
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const { notify } = useContext(MessageContext);
  const { setAuthContext } = useContext(UserContext);
  const router = useRouter();

  const handleChange = (evt) => {
    const newCredentials = {...credentials};
    newCredentials[evt.target.name] = evt.target.value;
    setCredentials(newCredentials);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if(data.success) {
        notify("Log In Successful", 'success');
        setAuthContext(data.data);
        setTimeout(() => router.push('/'), 2000);
      } else { 
        throw data.errors
      }
    } catch(err) {
      notify(err, 'error');
    }
  }

  return (
    <Layout>
      <>
        <Head> 
          <title>Login | Project-Explorer</title>
        </Head>
        <h2 className="mt-4 mx-4 themed form-header"><span className='mx-auto'>Login</span></h2>
        <Form id='loginForm' className='text-white mx-4' onSubmit={handleSubmit}>
          <Form.Group className='mx-auto'>
            <Form.Label className='small'>Email Address</Form.Label>
            <Form.Control required type="email" name='email' placeholder="Enter email" size='sm' value={credentials.email} onChange={handleChange}/>
            </Form.Group>
          <Form.Group className='mx-auto'>
            <Form.Label className='small'>Password</Form.Label>
            <Form.Control required type="password" name='password' placeholder="Enter password" size='sm' value={credentials.password} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className='mx-auto'>
            <Button type='submit' className="primarybtn" size='sm'>Login</Button>
          </Form.Group>
          
        </Form>
      </>
    </Layout>
  );
}


