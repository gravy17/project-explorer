import {Form, Button, Alert} from 'react-bootstrap';
import Layout from '../views/shared/Layout';
import { getPrograms, getGradYears } from '../services/school';

export default function Signup({user, programs, graduationYears, errors, formData}){

  return (
    <Layout user={user}>
      <>
      <h2 className="mt-4 mx-4 themed form-header">Signup</h2>
        <Form method='post' action='signup' id='signupForm' className='text-white mx-4 align-items-stretch'>
          {errors ? <Alert variant='danger' className='pre-line'>{errors.map(err => err+'\n')}</Alert> : null}
          <Form.Row className='d-flex'>
            <Form.Group className='mx-1 flex-fill' >
              <Form.Label className='small'>First name</Form.Label>
              <Form.Control size='sm' type="text" name='firstName' defaultValue={formData?formData.firstname:''} placeholder="First name"/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Last name</Form.Label>
              <Form.Control size='sm' type="text" name='lastName' defaultValue={formData?formData.lastname:''} placeholder="Last name"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Email Address</Form.Label>
              <Form.Control size='sm' type="email" name='email' defaultValue={formData?formData.email:''} placeholder="Your email address"/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Password</Form.Label>
              <Form.Control size='sm' type="password" name='password' defaultValue={formData?formData.password:''} placeholder="Enter password"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Program</Form.Label>
              <Form.Control size='sm' as='select' name='program' defaultValue={formData?formData.program:''} custom>
                {programs.map((program, idx) => <option key={idx} value={program}>{program}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Matric Number</Form.Label>
              <Form.Control size='sm' type="text" name='matricNumber' defaultValue={formData?formData.matricNumber:''} placeholder="00/0000"/>
            </Form.Group>
            <Form.Group className='mx-1 flex-fill'>
              <Form.Label className='small'>Graduation year</Form.Label>
              <Form.Control size='sm' as='select' name='graduationYear' defaultValue={formData?formData.graduationYear:''} custom>
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

export async function getServerSideProps({req, res}){
    const programs = await getPrograms();
    const graduationYears = await getGradYears();

    // const errorMsg = req.flash('error');
    let formData='', errors='';
    // if(errorMsg.length){
    //     [errors, formData] = JSON.parse(errorMsg);
    // }
    const user = req.session?.user || {};
    return {
        props: {
            user, 
            programs, 
            graduationYears, 
            errors, 
            formData
        }
    }
}
