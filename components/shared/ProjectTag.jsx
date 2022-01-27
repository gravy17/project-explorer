import { useRouter } from 'next/router';
import Badge from 'react-bootstrap/Badge';

const ProjectTag = ({value}) => {
  const router = useRouter();
  const openSearch = () => {
    router.push(`/search/${value}?criteria=tags`);
  }
  return (
    <Badge pill className="themed-tag m-1 px-2 py-1 hoverable">
      <a onClick={openSearch} className='tag-link bolder headerFont' style={{ fontSize: '0.75rem', fontWeight: 'bold'}}>
        {value}
      </a>
    </Badge>
  );
}

export default ProjectTag;