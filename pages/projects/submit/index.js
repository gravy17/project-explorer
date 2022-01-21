import {Form, Button, Alert} from 'react-bootstrap';
import Layout from '../../../views/shared/Layout';

export default function CreateProject({user, errors}) {

  return (
    <Layout user={user}>
      <>
      <h2 className="mt-4 mx-4 themed form-header"><span className='mx-auto'>Submit Project</span></h2>
        <Form method='post' action='/projects/submit' id='createProjectForm' className='text-white mx-4'>
          {errors? <Alert variant='danger' className="pre-line">{errors.join('\n')}</Alert> : null}
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Project Name</Form.Label>
              <Form.Control size='sm' type="text" name='name' placeholder="Project Title"/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Project Abstract</Form.Label>
              <Form.Control size='sm' as='textarea' name='abstract' rows={8} placeholder='Summarise the scope, objectives and findings of the project'/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Author(s)</Form.Label>
              <Form.Control size='sm' type="text" name='authors' placeholder="Enter author names (separated by comma)"/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Tags</Form.Label>
              <Form.Control size='sm' type="text" name='tags' placeholder='#topic1 #topic2'/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Button type='submit' size='sm' className='mx-auto'>Continue</Button>
            </Form.Group>      
        </Form>
      </>
    </Layout>
  );
}

//User must be on the req.session object, or else load login route

// export async function getServerSideProps({req}) {
//   const errorMsg = req.flash('error');
//   let errors = '';
//   if(errorMsg.length){
//       errors = JSON.parse(errorMsg);
//   }
//   const user = req.session.user || {};
//   return {
//     props: {
//       errors, 
//       user
//     }
//   }
// }