import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Layout from '../views/shared/Layout';
import Link from 'next/link';

export default function Error404() {
    return (
      <Layout>
        <>
          <Jumbotron className='errorJumbo strong-text'>
            <h1 className='themed'>Something's Not Right...</h1>
            <p>There seems to be a problem with your request. We may not have what you're looking for, but check that you've entered the right parameters to be sure.<br /> <span className='text-danger'>404: Page Not Found</span></p>
            <Link href="/">
                <Button className='themed-btn'>Return to home</Button>
            </Link> 
          </Jumbotron>
        </>
      </Layout>
    );
}