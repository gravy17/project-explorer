import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Layout from './shared/Layout';
import ProjectInfo from './shared/ProjectInfo';

const Error = ({user, error}) => {

    return (
      <Layout user={user}>
        <>
          <Jumbotron>
            <h1>Something's Not Right...</h1>
            <p>There's been a failure in attempting to honor your request <br /> <span className='text-danger'>{error.status}: {error.message}</span></p>
            <Button href="/" variant="primary">Return to home</Button>
          </Jumbotron>
          {error.stack?<div className='pre-line text-muted border border-danger rounded p-4'>{error.stack}</div>:null}
        </>
      </Layout>
    );
  }
  
  export default Error;