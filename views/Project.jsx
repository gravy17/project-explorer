import Card from 'react-bootstrap/Card'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from './shared/Layout';
import ProjectTag from './shared/ProjectTag';

const Project = ({user, project, creatorName}) => {

  return (
    <Layout user={user}>
      <>
        <h4 className='mt-4 mb-3' id='project_name'>{project.name}</h4>
        <Container fluid className='bg-light mb-4'>
          <Row className='py-2'>
            <Col>
              <h6 className='m-2' id='project_author'>CreatedBy<br/>{creatorName}</h6>
            </Col>
            <Col>
              <h6 className='m-2'>Date Created<br/>{new Date(project.createdAt).toLocaleDateString()}</h6>
            </Col>
            <Col>
              <h6 className='m-2'>Last Updated<br/>{new Date(project.updatedAt).toLocaleDateString()}</h6>
            </Col>
            <Col className='text-right py-2'>
              <Button href={`/projects/${String(project._id)}/edit`} className='m-auto'>Edit Project</Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <h5 className="mb-2">Project Abstract</h5>
              <hr/>
              <p id='project_abstract'>{project.abstract}</p>
              <h5>Comments</h5>
              <Form.Control as='textarea' className='mb-2' placeholder='Leave a comment'></Form.Control>
              <Button>Submit</Button>
              <hr/>
              <p className='text-center text-secondary'>No comments added yet</p>
            </Col>
            <Col>
            <h5 className="mb-2">Project Details</h5>
            <hr/>
              <Card className='mb-3'>
                <Card.Header>Author(s)</Card.Header>
                <ListGroup variant='flush' id='project_authors'>
                  {project.authors.map((author, idx) => <ListGroup.Item key={idx}>{author}</ListGroup.Item>)}
                </ListGroup>
                <Card.Footer className='text-primary' id='project_tags'>
                {project.tags.map(
                  (tag, index) => <ProjectTag key={tag+index} value={tag}/>
                )}
                </Card.Footer>
              </Card>
              <Card>
                <Card.Header>Project Files</Card.Header>
                <Card.Body>
                  <p className='text-center text-secondary'>No file uploaded yet</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </Layout>
  );
}

export default Project;
