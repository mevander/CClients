import React from "react";
import {
  Container,
  Menu} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class CustomLayout extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <Menu fixed="top" inverted style={{position:'relative'}}>
          <Container>
            {authenticated ? (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header onClick={() => this.props.logout()}>
                      Logout
                    </Menu.Item>
                  </Link>
                  <Link to="/lista">
                    <Menu.Item header onClick={() => this.props}>Lista</Menu.Item >
                  </Link>
                  <Link to="/cadastro">
                    <Menu.Item header onClick={() => this.props}>Cadastro</Menu.Item>
                  </Link>
                </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item header onClick={() => this.props}>Login</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header onClick={() => this.props}>Signup</Menu.Item>
                </Link>
              </React.Fragment>
            )}
          </Container>
        </Menu>

        {this.props.children}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
