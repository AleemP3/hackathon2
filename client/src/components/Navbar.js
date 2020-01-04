import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Grid, Dropdown, Image} from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import logo from "../images/logo.png"
import userImage from "../images/user.png"

class Navbar extends React.Component {

  state = { toggleUser: false }


  clickUser = () => {
    this.setState({ toggleUser: !this.state.toggleUser}); 
  }

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <>
        <Menu.Menu vertical position='right'>
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
                <Menu.Item onClick={() => handleLogout(this.props.history)}>
                  <Image src={userImage} width={50} height={40}/>
                </Menu.Item>
              {/* } */}
            </Grid.Row>
          </Grid>
        </Menu.Menu>
        </>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Menu pointing secondary>
            <Link to='/'>
              <Menu.Item icon><Image src={logo} width={100} height={40}/></Menu.Item>
            </Link>
            { this.rightNavItems() }
          </Menu>
        </Grid.Row>
      </div>
    );
  };
};

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Navbar {...this.props} auth={auth} />
        }
      </AuthConsumer>
    );
  };
};

export default withRouter(ConnectedNavbar);
