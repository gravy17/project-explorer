import React from 'react';
import Badge from 'react-bootstrap/Badge';

const ProjectTag = ({value}) => {
  // provides tags throughout the app that link to search for projects containing the same tags
    return (
      <Badge pill className="bg-primary m-1 px-2 py-1 hoverable">
        <a href={`/search?term=${value}&criteria=tags&page=1`} className='text-white' style={{ fontSize: '0.7rem', fontWeight: 'bold'}}>
          {value}
        </a>
      </Badge>
    );
}

export default ProjectTag;