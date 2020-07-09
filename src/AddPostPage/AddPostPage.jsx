import React from 'react';
import { connect } from 'react-redux';

import { postActions } from '../_actions';

class AddPostPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: {
                post: '',
                likes: 0,
                authorId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { post } = this.state;
        if (post.post) {
            this.props.create(post);
        }
    }

    render() {
        const { adding } = this.props;
        const { post, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add New Post</li>
                    </ol>
                </nav>
                <h2>Add New Post</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !post.post ? ' has-error' : '')}>
                        <label htmlFor="postFormControlTextarea1">Post Title</label>
                        <textarea className="form-control" id="postFormControlTextarea1" rows="3" name="post" value={post.post} placeholder="Write your post here..." onChange={this.handleChange}></textarea>
                        {submitted && !post.post &&
                            <div className="help-block">Post is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {adding && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <button type="submit" className="btn btn-primary">Submit Post</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { adding } = state;
    return { adding };
}

const actionCreators = {
    create: postActions.create
}

const connectedAddPostPage = connect(mapState, actionCreators)(AddPostPage);
export { connectedAddPostPage as AddPostPage };