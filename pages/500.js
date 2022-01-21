import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Layout from '../views/shared/Layout';
import Link from 'next/link';

export default function Error500() {
    return (
      <Layout>
        <>
          <Jumbotron className='errorJumbo text-white'>
            <h1>Something's Not Right...</h1>
            <p>We've encountered a problem on the server and are unable to honor your request. We will try to fix this as soon as possible<br /> <span className='text-danger'>500: Internal Server Error</span></p>
            <Link href="/">
                <Button className="themed-btn">Return to home</Button>
            </Link> 
          </Jumbotron>
        </>
      </Layout>
    );
}