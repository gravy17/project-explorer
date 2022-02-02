import Card from 'react-bootstrap/Card';
import ProjectTag from './ProjectTag';
import { useRouter } from 'next/router'; 

const ProjectInfo = ({_id, name, abstract, authors, tags, last_view }) => {
  const router = useRouter();
  
  const openDetails = () => {
    router.push(`/project/${String(_id)}`);
  }

  return (
    <Card onClick={openDetails} className='p-0 m-1 col-lg-3 hoverable small rounded bg-theme project-info' style={{ minWidth: '40ch', marginBottom: "0% !important", maxWidth: '500px' }}>
      <div style={{ display: 'flex', minHeight: '100% !important', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
      <Card.Body>
        <Card.Title className='themed headerFont'>{name}</Card.Title>
        <Card.Subtitle className='text-white-50 headerFont'>{authors.join(', ')}</Card.Subtitle>
        <Card.Text className='mt-2 text-white' style={{ fontSize: '0.8rem'}}>{abstract}...</Card.Text>
      </Card.Body>
      <Card.Footer className="themed smaller">
        {last_view?
          <div>
            {`Last Visited: ${new Date(last_view).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'})}`}
          </div>
        : null}
        <div>
          {tags.map((tag, index) => 
          <ProjectTag key={tag+index} value={tag}/> )}
        </div>
      </Card.Footer>
      </div>
    </Card>
  );
}

export default ProjectInfo;