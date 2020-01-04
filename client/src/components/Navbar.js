import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Grid, Dropdown, Image, Button} from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import logo from "../images/logo.png"
import userImage from "../images/user.png"

const Navbar = (props) => {



  // const clickUser = () => {
  //   this.setState({ toggleUser: !this.state.toggleUser}); 
  // }

  const rightNavItems = (auth) => {
    // const  { location } = props;

    if (auth.user) {
      return (
        <>
        <Menu.Menu position='right'>
          <Grid>
            <Grid.Row>
              {/* { this.state.toggleUser ? 
                <> 
                <Menu vertical position='right'>
                <Dropdown item>
                <Dropdown.Menu>
                <Dropdown.item onClick={() => handleLogout(this.props.history)}>Logout</Dropdown.item>
                <Dropdown.Item>My Profile</Dropdown.Item>
                <Dropdown.Item>Liked Videos</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </Menu>
                </>
                : */}
                <Menu.Item onClick={() => auth.handleLogout(props.history)}>
                  <Image src={userImage} width={50} height={40}/>
                </Menu.Item>
                <Menu.Item><Link to="/videos/new"><Button>Add Videos</Button></Link></Menu.Item>
              {/* } */}
            </Grid.Row>
          </Grid>
        </Menu.Menu>
        </>
      )
    }  else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item name="login"
            active={props.location.pathname === "/login"}
            />
          </Link>
          <Link to="/register">
            <Menu.Item name="register"
            active={props.location.pathname === "/register"}
            />
          </Link>
        </Menu.Menu>
      )
    }
  };

    return (
      <div>
        <AuthConsumer>
          { auth =>
          <Grid.Row>
            <Menu pointing secondary>
              <Link to='/'>
                <Menu.Item icon><Image src={logo} width={100} height={40}/></Menu.Item>
              </Link>
              { rightNavItems(auth) }
            </Menu>
          </Grid.Row>
          }
        </AuthConsumer>
      </div>
    );
  };


export default withRouter(Navbar);
