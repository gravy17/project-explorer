import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../UserContext';

const Header = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  }
  const router = useRouter();
  const goToSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/search/${searchTerm}`);
  }

  let firstname;
  if(typeof user === 'object' && user.hasOwnProperty('firstname')){
    ({firstname} = user);
  }
  if(typeof user === 'string'){
    firstname = user;
  }

  const { setAuthContext } = useContext(UserContext);
  const logout = (event) => {
    event.preventDefault();
    setAuthContext({});
    router.push('/');
  }

  return (
    <Navbar className='my-0 py-0 bg-theme' expand='lg'>
      <Link href='/' passHref>
      <Navbar.Brand className='d-inline-flex align-items-center'>  
        <Image src='/favicon.svg' alt='Project-Explorer Logo' width={35} height={35}></Image>
        <h1 className='h4 ml-2 mb-0 weak-text site-home bolder'>Project Explorer</h1>
      </Navbar.Brand>
      </Link>
      <Navbar.Toggle  aria-controls='responsive-nav' className="themed-btn nav-menu-btn "/>
      <Navbar.Collapse id='responsive-nav' className="d-lg-flex flex-lg-row flex-grow-1 justify-content-lg-between">
        <Form inline onSubmit={goToSearch} >
          <FormControl size="sm" type='text' name="term" value={searchTerm} onChange={handleSearchInput} placeholder='Search Projects' className='mr-2 my-2 my-lg-0 bg-theme themed-input'/>
          <Button size="sm" type="submit" variant='outline-light' className='mr-sm-2 themed themed-outline'>Search</Button>
        </Form>
        <Nav className='my-2 my-lg-0 '>
          <Link href='/search' passHref><Nav.Link>Find Projects</Nav.Link></Link>
          <Link href='/projects/submit' passHref><Nav.Link>Submit Project</Nav.Link></Link>
        </Nav>
          {firstname?
          <Nav className='justify-content-end my-2 my-lg-0 '>
            <Link href='/logout' onClick={logout} passHref><Nav.Link>Logout</Nav.Link></Link>
            <Nav.Link id='username'>Hi {firstname}</Nav.Link>
          </Nav> :
          <Nav className='justify-content-end my-2 my-lg-0 '>
            <Link href='/signup' passHref><Nav.Link>Sign Up</Nav.Link></Link>
            <Link href='/login' passHref><Nav.Link>Login</Nav.Link></Link>
          </Nav>
          }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
