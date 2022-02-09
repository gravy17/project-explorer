import { getShowcase } from '../services/project';

import Head from 'next/head';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Layout from '../components/shared/Layout';
import ProjectInfo from '../components/shared/ProjectInfo';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

export default function Home({ projects }) {
  let project_views;
  const { user } = useContext(UserContext);
  if(user.project_views){
    project_views = user.project_views;
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Home | Project-Explorer</title>
        </Head>
        <div className='hero-placeholder'></div>
        <Jumbotron className='jumbotron-fluid mx-0 px-5 text-light hero d-flex flex-row flex-wrap'>
          <div className='pitch'>
            <h2 className='themed h1'>Welcome to Project Explorer</h2>
            <p className='h6 mb-3 strong-text'>Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.</p>
            <Link href="/signup" passHref><Button className='mr-2 themed-btn' size='sm'>Get Started</Button></Link>
            <Link href="/login" passHref><Button className='themed-btn border-themed' size='sm'>Login</Button></Link>
          </div>
          <div className='illustration'>
            <Image src='/hero-illustration.svg' alt="decorative opened tabs illustration" layout='fill' objectFit='fill'></Image>
          </div>          
        </Jumbotron>
        <Container fluid className='card-group pb-5'>
          {projects? 
          projects.map((project) => {
            let last_view = project_views?.find((view) => view.project_id === project._id)?.last_view || null;
            return (<ProjectInfo key={String(project._id)} {...project} last_view={last_view}/>);
          })
          :<p className='weak-text m-4 p-5 small border border-muted rounded w-100 text-center'>There seem to be no Projects at the moment. Signup/Login to add yours</p>}
        </Container>
      </>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    let projects = await getShowcase();
    projects = JSON.parse(JSON.stringify(projects));
    return {
      props: {
        projects
      },
      revalidate: 60*30
    }
  } catch (e) {
    console.log(e);
  }
}