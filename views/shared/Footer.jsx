import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Footer = (props) => {

  return (
    <Navbar bg='light' expand='lg' className='d-flex flex-row-reverse pageFooter'>
      Project Explorer &copy; 2020 &#8729; Edconnect
    </Navbar>
  );
}

export default Footer;
