import { Link } from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-solid-svg-icons';
import SpeechtoText from '../pages/SpeechtoText';
// import { LinkContainer } from 'react-router-bootstrap';
<SpeechtoText/>

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/"style={{fontSize:'20px',marginLeft:'780px',color:'white'}}>Sign to Text</Nav.Link>
            <Nav.Link href="/SpeechtoText" style={{fontSize:'20px',marginLeft:'10px',color:'white'}}>Speech to Text </Nav.Link>
           
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;