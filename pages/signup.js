import { getPrograms, getGradYears } from '../services/school';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import {Form, Button} from 'react-bootstrap';
import Layout from '../components/shared/Layout';
import { MessageContext } from '../components/MessageContext';
import { UserContext } from '../components/UserContext';

export default function Signup({programs, graduationYears}){
  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    matricNumber: '',
    password: '',
    program: '',
    graduationYear: ''
  })
  const { notify } = useContext(MessageContext);
  const { updateUser } = useContext(UserContext);
  const router = useRouter();

  const handleChange = (evt) => {
    const newDetails = {...userDetails};
    newDetails[evt.target.name] = evt.target.value;
    setUserDetails(newDetails);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
      const res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(userDetails)
      });
      const data = await res.json();
      if(data.success) {
        notify("Signup Completed!", 'success');
        updateUser({type: 'set', payload: data.data});
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
          <title>Register | Project-Explorer</title>
      </Head>
      <h2 className="mt-4 mx-4 themed form-header">Signup</h2>
        <Form onSubmit={handleSubmit} id='signupForm' className='text-white mx-4 align-items-stretch'>
          <Form.Row className='d-flex'>
            <Form.Group className='mx-1 flex-fill' >
              <Form.Label className='small'>First name</Form.Label>
              <Form.Control size='sm' type="text" name='firstname' placeholder="First name" value={userDetails.firstname} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Last name</Form.Label>
              <Form.Control size='sm' type="text" name='lastname' placeholder="Last name" value={userDetails.lastname} onChange={handleChange} required/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Email Address</Form.Label>
              <Form.Control size='sm' type="email" name='email' placeholder="Your email address" value={userDetails.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Password</Form.Label>
              <Form.Control size='sm' type="password" name='password' placeholder="Enter password" value={userDetails.password} onChange={handleChange} required/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Program</Form.Label>
              <Form.Control size='sm' as='select' name='program' custom value={userDetails.program} onChange={handleChange} required>
                <option value=''>Select Degree Program</option>
                {programs.map((program, idx) => <option key={idx} value={program}>{program}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Matric Number</Form.Label>
              <Form.Control size='sm' type="text" name='matricNumber' placeholder="e.g. 18/0000" value={userDetails.matricNumber} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Graduation year</Form.Label>
              <Form.Control size='sm' as='select' name='graduationYear' custom value={userDetails.graduationYear} onChange={handleChange} required>
                <option value=''>Select Year of Graduation</option>
                {graduationYears.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
              </Form.Control>
          </Form.Group>
          </Form.Row>
          <Button type='submit' className='primarybtn' size='sm'>Sign Up</Button>
        </Form>
      </>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const programs = await getPrograms();
    const graduationYears = await getGradYears();
    return {
      props: {
        programs,
        graduationYears
      },
      revalidate: 60*60*24
    }
  } catch (e) {
    console.log(e)
  }
}