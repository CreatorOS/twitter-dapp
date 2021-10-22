import { Navbar,Container, Nav } from "react-bootstrap";
import "../utils/App.css";
interface props {
  account: string|false;
}
function Navb(account?:props){
  return(
    <>
    {
      account?.account ? 
      (
        <>
          <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Dapps Twitter</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="side" href={`/${account?.account}`}>{account?.account}</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        </>
      ): (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#name" className="navbar-class">Dapps Twitter</Navbar.Brand>
            </Container>
          </Navbar>
    </>
      )
    }
    </>
  )
}
export default Navb;