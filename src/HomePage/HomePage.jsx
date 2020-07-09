import React from 'react';
import { connect } from 'react-redux';

import { postActions } from '../_actions';
import moment from 'moment';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            show: false,
            selectedPostId: '',
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.displayModal = this.displayModal.bind(this);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    handleClose() {
		this.setState({ show: false });
	}

	handleShow(id) {
		this.setState({ show: true, selectedPostId: id });
    }
    
    deletePost(id) {
        this.props.deletePost(id);
        this.handleClose();
        // TODO Refresh page
    }

    displayModal() {
        const { show, selectedPostId } = this.state;
        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post? {selectedPostId}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => this.deletePost(selectedPostId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const { user, posts } = this.props;
        return (
            <div className="col-md-12">
                <h1>Hi {user.firstName}!</h1>
                <p><a href="/profile">My Profile</a></p>
                <p><a href="/logout">Logout</a></p>

                <p><a href="/add-post">Add New Post</a></p>
                {posts.items && 
                    <div className="col-md-offset-6">
                        {posts.items.map((post, index) =>
                            <div className="card mb-2" key={index}>
                                <div className="card-header">
                                    Post
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                    <p>{post.post}</p>
                                    {
                                        post.authorId === user.id && (
                                            <div>
                                                <button type="button" className="btn btn-warning">
                                                    <a href={"/edit-post/" + post.id}>Edit Post</a>
                                                </button> &nbsp;
                                                <button type="button" className="btn btn-danger" onClick={(e) => this.handleShow(post.id)}>
                                                    Delete Post
                                                </button>
                                                
                                            </div>
                                        )
                                    }
                                    <footer className="blockquote-footer">Posted by <a href={'/user-profile/' + post.authorId}>{post.authorId}</a> on {post.createdDate ? moment(new Date(post.createdDate)).format("MMM DD, YYYY HH:mm:ss") : post.createdDate}</footer>
                                    </blockquote>
                                </div>
                            </div>
                        )} <br />
                    </div>
                }
                { this.displayModal() }
            </div> 
            // End of div
        );
    }
}

function mapState(state) {
    const { posts, authentication } = state;
    const { user } = authentication;
    return { user, posts };
}

const actionCreators = {
    getPosts: postActions.getAll,
    deletePost: postActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };