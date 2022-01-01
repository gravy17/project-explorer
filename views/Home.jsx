import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Layout from './shared/Layout';
import ProjectInfo from './shared/ProjectInfo';

const Home = ({projects, user}) => {
  return (
    <Layout user={user}>
      <>
        <Jumbotron>
          <h1>Welcome to Project Explorer</h1>
          <p>Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.</p>
          <Button href="/signup" variant="primary" className='mr-2'>Get Started</Button>
          <Button href="/login" variant="secondary">Login</Button>
        </Jumbotron>
        <Container fluid bg='light' className='card-group'>
          {projects? 
          projects.map((project) => <ProjectInfo key={String(project._id)} pastVisit={user?.project_views?.find((view) => view.project_id === project._id)|| {}} {...project} />)
          :<p>There seem to be no Projects</p>}
        </Container>
      </>
    </Layout>
  );
}

export default Home;
