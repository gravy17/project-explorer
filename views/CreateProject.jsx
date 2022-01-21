import {Form, Button, Alert} from 'react-bootstrap';
import Layout from './shared/Layout';

const CreateProject = ({user, errors}) => {

  return (
    <Layout user={user}>
      <>
        <h2 className="mt-4">Create Project</h2>
        <Form method='post' action='/projects/submit' id='createProjectForm'>
          {errors? <Alert variant='danger' className="pre-line">{errors.join('\n')}</Alert> : null}
            <Form.Group className='mx-1'>
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" name='name' placeholder="Project Title"/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Project Abstract</Form.Label>
              <Form.Control as='textarea' name='abstract' rows={8}/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Author(s)</Form.Label>
              <Form.Control type="text" name='authors' placeholder="Enter author names (separated by comma)"/>
            </Form.Group>
            <Form.Group className='mx-1'>
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name='tags' placeholder='#topic1 #topic2'/>
            </Form.Group>
          <Button type='submit'>Continue</Button>
        </Form>
      </>
    </Layout>
  );
}

export default CreateProject;
