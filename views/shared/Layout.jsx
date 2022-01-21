import Header from './Header';
import Footer from './Footer';

const Layout = ({user, children}) => {
  return (
    <>
      <header className='sticky-top'>
        <Header user={user}/>
      </header>
      <main className="pt-5 px-0 container-fluid bg-gradient flex-grow-1 h-100">
      {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Layout;
