import Header from './Header';
import Footer from './Footer';
import {ThemeContext} from '../ThemeContext';
import {UserContext} from '../UserContext';

const Layout = ({children}) => {
  return (
    <>
      <header className='sticky-top'>
        <UserContext.Consumer>
          {({user, updateUser}) => (
            <Header user={user} updateUser={updateUser}/>
          )}
        </UserContext.Consumer>
      </header>
      <main className="pt-5 px-0 container-fluid bg-gradient flex-grow-1 h-100">
      {children}
      </main>
      <footer>
        <ThemeContext.Consumer>
          {({toggle, dark}) => (
            <Footer toggle={toggle} dark={dark} />
          )}
        </ThemeContext.Consumer>
      </footer>
    </>
  )
}

export default Layout;
