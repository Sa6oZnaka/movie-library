import { Navbar, Nav, Form, FormControl} from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

const AppNavbar = () => {

    let history = useHistory();
    const [data, setData]=useState(null);
    function getInput(val){
        setData(val.target.value)
    }

    function submit(){
        console.warn(data);
        history.push("/movies/" + data);
    }

    return (
        <div className = "navbar">
            <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="/">My Movie Collection</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Form inline>
                    <FormControl type="text"onChange={getInput} placeholder="Search by movie title..."/>
                    <Button onClick={submit} type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


export default AppNavbar;