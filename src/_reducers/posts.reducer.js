import { postConstants } from '../_constants';

export function posts(state = {}, action) {
  switch (action.type) {
    case postConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case postConstants.GETALL_SUCCESS:
      return {
        items: action.posts
      };
    case postConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case postConstants.DELETE_REQUEST:
      // add 'deleting:true' property to post being deleted
      return {
        ...state,
        items: state.items.map(post =>
          post.id === action.id
            ? { ...post, deleting: true }
            : post
        )
      };
    case postConstants.DELETE_SUCCESS:
      // remove deleted post from state
      return {
        items: state.items.filter(post => post.id !== action.id)
      };
    case postConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to post
      return {
        ...state,
        items: state.items.map(post => {
          if (post.id === action.id) {
            // make copy of post without 'deleting:true' property
            const { deleting, ...postCopy } = post;
            // return copy of post with 'deleteError:[error]' property
            return { ...postCopy, deleteError: action.error };
          }

          return post;
        })
      };
    
    case postConstants.POST_REQUEST:
      return {
        adding: true
      };
    case postConstants.POST_SUCCESS:
      return {
        post: action.post
      };
    case postConstants.POST_FAILURE:
      return { 
        error: action.error
      };

    case postConstants.GETBYID_REQUEST:
      return {
        loading: true
      };
    case postConstants.GETBYID_SUCCESS:
      return {
        post: action.post
      };
    case postConstants.GETBYID_FAILURE:
      return { 
        error: action.error
      };

    case postConstants.UPDATE_REQUEST:
      return {
        updating: true
      };
    case postConstants.UPDATE_SUCCESS:
      return {
        item: action.post
      };
    case postConstants.UPDATE_FAILURE:
      return { 
        error: action.error
      };
    
    default:
      return state
  }
}