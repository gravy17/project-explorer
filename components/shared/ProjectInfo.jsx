import Card from 'react-bootstrap/Card';
import ProjectTag from './ProjectTag';
import Link from 'next/link';

const ProjectInfo = ({_id, name, abstract, authors, tags, last_view }) => {
  return (
    <Link href={`/project/${String(_id)}`} passHref>
    <Card className='p-0 m-1 col-lg-3 hoverable small rounded bg-theme project-info' style={{ minWidth: '40ch', marginBottom: "0% !important", maxWidth: '500px' }}>
      <div style={{ display: 'flex', minHeight: '100% !important', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
      <Card.Body>
        <Card.Title className='themed headerFont'>{name.length>65?name.slice(0, 65)+"...":name}</Card.Title>
        <Card.Subtitle className='weak-text headerFont'>{authors.join(', ')}</Card.Subtitle>
        <Card.Text className='mt-2 strong-text' style={{ fontSize: '0.8rem'}}>{abstract.length>350?abstract.slice(0, 350)+"...":abstract}</Card.Text>
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
    </Link>
  );
}

export default ProjectInfo;