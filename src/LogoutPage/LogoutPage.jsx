import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        this.handleLogOut();
    }

    handleLogOut() {
        // reset login status
        this.props.dispatch(userActions.logout(null));
    }

    render() {
        return (
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                
            </div>
            // <!-- page-body-wrapper ends -->
        );
    }
}

function mapStateToProps(state) {
    return null;
}

const connectedLogoutPage = connect(mapStateToProps, null, null, {
    pure: false
  })(LogoutPage);
export { connectedLogoutPage as LogoutPage }; 