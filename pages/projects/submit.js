import {Form, Button} from 'react-bootstrap';
import Layout from '../../components/shared/Layout';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../components/MessageContext';
import { useRouter } from 'next/router';
import { UserContext } from '../../components/UserContext';

export default function CreateProject() {
  const [project, setProject] = useState({name: '', abstract: '', authors: '', tags: ''});
  
  const { user } = useContext(UserContext);
  const { notify } = useContext(MessageContext);
  const router = useRouter();

  useEffect(() => {
    if(!user._id) {
      router.push("/login?redirect=projects/submit")
    }
  }, [user, router])

  const handleChange = (evt) => {
    let modified = { ...project };
    modified[evt.target.name] = evt.target.value;
    setProject(modified);
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    try{
      const res = await fetch(`/api/projects/submit`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(project)
      });
      const data = await res.json();
      if(data.success) {
        notify("Project Saved!", 'success');
        setTimeout(() => router.push(`/project/${data.data._id}`), 1400);
      } else { 
        throw data.errors
      }
    } catch(err) {
      notify(err, 'error');
    }
  }
  return (
    <Layout>
      <>
      <Head>
          <title>Submit a Project | Project-Explorer</title>
      </Head>
      <h2 className="mt-4 mx-4 themed form-header"><span className='mx-auto'>Submit Project</span></h2>
        <Form id='createProjectForm' className='text-white mx-4' onSubmit={handleSubmit}>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Project Name</Form.Label>
              <Form.Control size='sm' type="text" name='name' value={project.name}  onChange={handleChange} placeholder="Project Title"/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Project Abstract</Form.Label>
              <Form.Control size='sm' as='textarea' name='abstract' value={project.abstract}  onChange={handleChange} rows={8} placeholder='Summarise the scope, objectives and findings of the project'/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Author(s)</Form.Label>
              <Form.Control size='sm' type="text" name='authors' value={project.authors} onChange={handleChange} placeholder="Enter author names (separated by comma)"/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Form.Label className='small'>Tags</Form.Label>
              <Form.Control size='sm' type="text" name='tags' value={project.tags}  onChange={handleChange} placeholder='#topic1 #topic2'/>
            </Form.Group>
            <Form.Group className='mx-auto'>
              <Button type='submit' size='sm' className='mx-auto'>Continue</Button>
            </Form.Group>      
        </Form>
      </>
    </Layout>
  );
}

// export async function getServerSideProps({req}) {
//   const cookies = req.headers.cookie;
//   const sid = cookies
//     .split(';')
//     .filter(cookie => 
//       cookie.trim()
//       .startsWith(`sid=`))[0]
//       ?.split('=')[1] || null;
//   if(!sid) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login?redirect=projects/submit"
//       }
//     }
//   }
//   return { 
//     props: {}
//   }
// }