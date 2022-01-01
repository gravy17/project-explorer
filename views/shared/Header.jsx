import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = ({user}) => {

  let firstname;
  if(typeof user === 'object' && user.hasOwnProperty('firstname')){
    ({firstname} = user);
  }

  return (
    <Navbar bg='primary' variant='dark' className='justify-content-between' expand='lg'>
      <Navbar.Brand href='/'>Project Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-nav'/>
      <Navbar.Collapse id='responsive-nav' className="d-lg-flex flex-lg-row justify-content-lg-between">
        <Form inline action="/search" >
          <FormControl type='text' name="term" placeholder='Search Projects' className='mr-sm-2'/>
          <Button type="submit" variant='outline-light' className='mr-sm-2'>Search</Button>
        </Form>
        <Nav>
          <Nav.Link href='/search'>Find Projects</Nav.Link>
          <Nav.Link href='/projects/submit'>Submit</Nav.Link>
        </Nav>
          {firstname?
          <Nav className='justify-content-end'>
            <Nav.Link href='/logout'>Logout</Nav.Link>
            <Nav.Link id='username'>Hi {firstname}</Nav.Link>
          </Nav> :
          <Nav className='justify-content-end'>
            <Nav.Link href='/signup'>Sign Up</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav>
          }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
