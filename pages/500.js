import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Error500() {
    return (
      <Layout>
        <>
          <Head>
            <title>Internal Server Error | Project-Explorer</title>
          </Head>
          <Jumbotron className='errorJumbo strong-text'>
            <h1 className='themed'>Something&apos;s Not Right...</h1>
            <p>We&apos;ve encountered a problem on the server and are unable to honor your request. We will try to fix this as soon as possible<br /> <span className='text-danger'>500: Internal Server Error</span></p>
            <Link href="/" passHref>
                <Button className="themed-btn">Return to home</Button>
            </Link> 
          </Jumbotron>
        </>
      </Layout>
    );
}