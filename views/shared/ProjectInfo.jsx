import React from 'react';
import Card from 'react-bootstrap/Card';
import ProjectTag from './ProjectTag';

const ProjectInfo = ({_id, name, abstract, authors, tags, pastVisit}) => {
    let last_view;
    if(pastVisit && pastVisit.last_view) {
        last_view = pastVisit.last_view;
    }
    const openDetails = () => {
        window.location.href=`/project/${String(_id)}`;
    }

    return (
        <Card onClick={openDetails} className='project-info p-0 m-1 col-lg-3 hoverable small border border-muted rounded' style={{ minWidth: '40ch', marginBottom: "0% !important", maxWidth: '500px' }}>
            <div style={{ display: 'flex', minHeight: '100% !important', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Card.Body>
            <Card.Title className='text-primary' style={{ fontSize: '1.1rem' }}>{name}</Card.Title>
            <Card.Subtitle className='text-secondary' style={{ fontSize: '0.8rem' }}>{authors.join(', ')}</Card.Subtitle>
            <Card.Text className='mt-2' style={{ fontSize: '0.7rem' }}>{abstract}...</Card.Text>
            </Card.Body>
            <Card.Footer className="text-secondary smaller">
            {last_view?
            <div>
                {`Last Visited: ${new Date(last_view).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'})}`}
            </div>: null}
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