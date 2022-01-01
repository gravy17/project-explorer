import React from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = ({user, programs, graduationYears, errors, formData}) => {

  return (
    <Layout user={user}>
      <>
        <h2 className="mt-4">Signup</h2>
        <Form method='post' action='signup' id='signupForm'>
          {errors ? <Alert variant='danger' className='pre-line'>{errors.map(err => err+'\n')}</Alert> : null}
          <Form.Row>
            <Form.Group className='mx-1'>
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" name='firstName' defaultValue={formData?formData.firstname:''} placeholder="First name"/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" name='lastName' defaultValue={formData?formData.lastname:''} placeholder="Last name"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name='email' defaultValue={formData?formData.email:''} placeholder="Your email address"/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' defaultValue={formData?formData.password:''} placeholder="Enter password"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1'>
              <Form.Label>Program</Form.Label>
              <Form.Control as='select' name='program' defaultValue={formData?formData.program:''} custom>
                {programs.map((program, idx) => <option key={idx} value={program}>{program}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Matric Number</Form.Label>
              <Form.Control type="text" name='matricNumber' defaultValue={formData?formData.matricNumber:''} placeholder="00/0000"/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Graduation year</Form.Label>
              <Form.Control as='select' name='graduationYear' defaultValue={formData?formData.graduationYear:''} custom>
                {graduationYears.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
              </Form.Control>
          </Form.Group>
          </Form.Row>
          <Button type='submit'>Sign Up</Button>
        </Form>
      </>
    </Layout>
  );
}

export default Signup;
