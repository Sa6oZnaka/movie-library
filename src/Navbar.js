import { Navbar, Nav , NavItem, NavDropdown, Form, FormControl} from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {

    return (
        <div className = "navbar">
            <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="#home">My Movie Collection</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search by movie title..." className=" mr-sm-2" />
                    <Button type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


export default AppNavbar;