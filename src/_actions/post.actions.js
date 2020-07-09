import { postConstants } from '../_constants';
import { postService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const postActions = {
    logout,
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function logout() {
    postService.logout();
    history.push('/login');
    return { type: postConstants.LOGOUT };
}

function create(post) {
    return dispatch => {
        dispatch(request(post));

        postService.create(post)
            .then(
                post => { 
                    dispatch(success(post));
                    dispatch(alertActions.success('Post successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(post) { return { type: postConstants.POST_REQUEST, post } }
    function success(post) { return { type: postConstants.POST_SUCCESS, post } }
    function failure(error) { return { type: postConstants.POST_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        postService.getById(id)
            .then(
                post => dispatch(success(post)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETBYID_REQUEST } }
    function success(post) { return { type: postConstants.GETBYID_SUCCESS, post } }
    function failure(error) { return { type: postConstants.GETBYID_FAILURE, error } }
}

function update(post) {
    return dispatch => {
        dispatch(request(post));

        postService.update(post)
            .then(
                post => { 
                    dispatch(success(post));
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(post) { return { type: postConstants.UPDATE_REQUEST, post } }
    function success(post) { return { type: postConstants.UPDATE_SUCCESS, post } }
    function failure(error) { return { type: postConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                post => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: postConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: postConstants.DELETE_FAILURE, id, error } }
}