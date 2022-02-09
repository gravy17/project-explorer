import {getAll, getById} from '../../services/project';

import Card from 'react-bootstrap/Card'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../../components/shared/Layout';
import ProjectTag from '../../components/shared/ProjectTag';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../components/UserContext';

export default function Project({project, creatorName}) {
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    if(user._id){
      fetch(`/api/project/trackView?id=${project._id}`)
      .then((res) => res.json())
      .then(data => {
        if(data.success) {
          let updatedUser = {...user};
          updatedUser.project_views = data.data;
          updateUser({type: 'set', payload: updatedUser});
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }, [])

  return (
    <Layout>
      <>
        <Head>
          <title>Project- {project.name} | Project-Explorer</title>
        </Head>
        <h4 className='mt-4 ml-4 themed' id='project_name'>{project?.name}</h4>
        <Container className='w-100 mb-4 mx-auto strong-text'>
          <Row className='py-2'>
            <Col>
              <h6 className='m-2' id='project_author'>CreatedBy<br/>{creatorName}</h6>
            </Col>
            <Col>
              <h6 className='m-2'>Date Created<br/>{new Date(project?.createdAt).toLocaleDateString()}</h6>
            </Col>
            <Col>
              <h6 className='m-2'>Last Updated<br/>{new Date(project?.updatedAt).toLocaleDateString()}</h6>
            </Col>
            <Col className='text-right py-2'>
              <Button href={`/projects/${String(project?._id)}/edit`} className='m-auto'>Edit Project</Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <h5 className="mb-2 themed">Project Abstract</h5>
              <hr/>
              <p id='project_abstract' className='strong-text'>{project?.abstract}</p>
              <h5 className='themed'>Comments</h5>
              <Form.Control as='textarea' className='mb-2' placeholder='Leave a comment'></Form.Control>
              <Button>Submit</Button>
              <hr/>
              <p className='weak-text'>No comments added yet</p>
            </Col>
            <Col>
            <h5 className="mb-2 themed">Project Details</h5>
            <hr/>
              <Card className='mb-3 bg-theme'>
                <Card.Header className='themed'>Author(s)</Card.Header>
                <ListGroup className='bg-theme' id='project_authors'>
                  {project?.authors.map((author, idx) => <ListGroup.Item key={idx} className='bg-theme strong-text'>{author}</ListGroup.Item>)}
                </ListGroup>
                <Card.Footer id='project_tags'>
                {project?.tags.map(
                  (tag, index) => <ProjectTag key={tag+index} value={tag}/>
                )}
                </Card.Footer>
              </Card>
              <Card className='bg-theme'>
                <Card.Header className='themed'>Project Files</Card.Header>
                <Card.Body>
                  <p className='text-center weak-text'>No file uploaded yet</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </Layout>
  );
}

export async function getStaticProps(req) {
  const {id} = req.params;
  try {
    let project = await getById(id);
    let creatorName = project.createdBy.firstname + ' ' +  project.createdBy.lastname;
    project = JSON.parse(JSON.stringify(project));
    return {
      props: {
        project,
        creatorName
      }
    }
  } catch (e) {
    console.log(e);
  }
} 

export async function getStaticPaths({}){
  let projects = await getAll();
  const paths = projects.map(projectPath => {
    return { params: { id: String(projectPath._id) }}
  })
  return {
    paths,
    fallback: 'blocking'
  };
}
