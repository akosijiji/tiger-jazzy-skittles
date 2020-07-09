import React from 'react';
import { connect } from 'react-redux';

import { postActions } from '../_actions';

class EditPostPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {
                post: '',
                likes: 0,
                authorId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
                id: this.props.match.params ? this.props.match.params.id : '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getById(id);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { item } = this.state;
        this.setState({
            item: {
                ...item,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { item } = this.state;
        if (item.post) {
            this.props.update(item);
        }
    }

    render() {
        const { post, updating } = this.props;
        const { item, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Post</li>
                    </ol>
                </nav>
                <h2>Edit Post</h2>
                {post && (
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !item.post ? ' has-error' : '')}>
                            <label htmlFor="postFormControlTextarea1">Post Title</label>
                            <textarea className="form-control" id="postFormControlTextarea1" rows="3" name="post" value={item.post || ''} placeholder="Write your post here..." onChange={this.handleChange}></textarea>
                            {submitted && !item.post &&
                                <div className="help-block">Post is required</div>
                            }
                        </div>
                        <div className="form-group">
                            {updating && 
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <button type="submit" className="btn btn-primary">Submit Post</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { post, updating } = state.posts;
    return { post, updating };
}

const actionCreators = {
    getById: postActions.getById,
    update: postActions.update,
}

const connectedEditPostPage = connect(mapState, actionCreators)(EditPostPage);
export { connectedEditPostPage as EditPostPage };