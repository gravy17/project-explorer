import Link from 'next/link';
import Badge from 'react-bootstrap/Badge';

const ProjectTag = ({value}) => {
  return (
    <Link href={`/search/${value}?criteria=tags`} passHref>
    <Badge pill className="themed-tag m-1 px-2 py-1">
      <a className='tag-link bolder headerFont' style={{ fontSize: '0.75rem', fontWeight: 'bold'}}>
        {value}
      </a>
    </Badge>
    </Link>
    
  );
}

export default ProjectTag;