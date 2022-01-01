import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({user, children}) => {
  return (
    <>
      <Header user={user}/>
      <main className="p-5 container-fluid">
      {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout;
