import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Error404() {
    return (
      <Layout>
        <>
          <Head>
            <title>Page Not Found | Project-Explorer</title>
          </Head>
          <Jumbotron className='errorJumbo strong-text'>
            <h1 className='themed'>Something&apos;s Not Right...</h1>
            <p>There seems to be a problem with your request. We may not have what you&apos;re looking for, but check that you&apos;ve entered the right parameters to be sure.<br /> <span className='text-danger'>404: Page Not Found</span></p>
            <Link href="/" passHref>
                <Button className='themed-btn'>Return to home</Button>
            </Link> 
          </Jumbotron>
        </>
      </Layout>
    );
}