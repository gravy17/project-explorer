import {Form, Button, Alert} from 'react-bootstrap';
import Layout from '../views/shared/Layout';

export default function Login({user, errors}){

  return (
    <Layout user={user}>
      <>
        <h2 className="mt-4 mx-4 themed form-header"><span className='mx-auto'>Login</span></h2>
        <Form method='post' action='login' id='loginForm' className='text-white mx-4'>
          {errors?<Alert variant='danger' style={{whiteSpace: 'pre-wrap'}}>{errors.join('\n')}</Alert>:null}
          <Form.Group className='mx-auto'>
            <Form.Label className='small'>Email Address</Form.Label>
            <Form.Control required type="email" name='email' placeholder="Enter email" size='sm'/>
            </Form.Group>
          <Form.Group className='mx-auto'>
            <Form.Label className='small'>Password</Form.Label>
            <Form.Control required type="password" name='password' placeholder="Enter password" size='sm'/>
          </Form.Group>
          <Form.Group className='mx-auto'>
            <Button type='submit' className="primarybtn" size='sm'>Login</Button>
          </Form.Group>
          
        </Form>
      </>
    </Layout>
  );
}

// export async function getServerSideProps({req}) {
//     const errorMsg = req.flash('error');
//     let errors = '';
//     if(errorMsg.length){
//         errors = JSON.parse(errorMsg);
//     }
//     const user = req.session.user || {};
//     return {
//       props: {
//         errors, 
//         user
//       }
//     }
// }
