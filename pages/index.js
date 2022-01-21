import Head from 'next/head';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Layout from '../views/shared/Layout';
import ProjectInfo from '../views/shared/ProjectInfo';
import Link from 'next/link';
import Image from 'next/image';

// const { getShowcase } = require('../services/project');

export default function Home({projects, user}) {
  return (
    <Layout user={user}>
      <>
        <Head>
          <title>Home | Project-Explorer</title>
        </Head>
        <div className='hero-placeholder'></div>
        <Jumbotron className='jumbotron-fluid mx-0 px-5 text-light hero d-flex flex-row flex-wrap'>
          <div className='pitch'>
            <h2 className='themed h1'>Welcome to Project Explorer</h2>
            <p className='h6 mb-3 strong-text'>Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.</p>
            <Link href="/signup"><Button className='mr-2 themed-btn' size='sm'>Get Started</Button></Link>
            <Link href="/login"><Button className='themed-btn border-themed' size='sm'>Login</Button></Link>
          </div>
          <div className='illustration'>
            <Image src='/hero-illustration.svg' alt="decorative opened tabs illustration" layout='fill' objectFit='fill'></Image>
          </div>          
        </Jumbotron>
        <Container className='card-group pb-5'>
          {projects? 
          projects.map((project) => <ProjectInfo key={String(project._id)} pastVisit={user?.project_views?.find((view) => view.project_id === project._id)|| {}} {...project} />)
          :<p className='weak-text m-4 p-5 small border border-muted rounded w-100 text-center'>There seem to be no Projects at the moment. Signup/Login to add yours</p>}
        </Container>
      </>
    </Layout>
  );
}

// export async function getServerSideProps({req}) {
//   let projects = await getShowcase();
//   const user = req.session.user || {};
//   return {
//     props: {
//       projects: JSON.parse(JSON.stringify(projects)), 
//       user
//     }
//   }
// }

// export async function getStaticProps({params}) {
//   const req = await fetch();
//   const data = await req.json();
//   return {
//     props: {}
//   }
// }

// export async function getStaticPaths({}){
//   const req = await fetch();
//   const data = await req.json();
//   const paths = data.map(path => {
//     return { params: { id: path}}
//   })
//   return {
//     paths,
//     fallback: false
//   };
// }
