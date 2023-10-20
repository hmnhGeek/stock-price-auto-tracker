import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

const Header = props => {
  return (
    <>
      <Navbar className='header' bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Stock Price Tracker</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;