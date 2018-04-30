import { combineReducers } from 'redux';
import {
  GET_ISSUE_BEGIN, GET_ISSUE_SUCCESS, GET_ISSUE_FAILURE,
  GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
} from './actions';


const initialIssueState = {
  currentIssue: null,
  isLoading: false,
  error: null
};

export function issueReducer(state = initialIssueState, action) {
  switch(action.type) {
    case GET_ISSUE_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        currentIssue: action.payload,
        isLoading: false,
        error: null
      };

    case GET_ISSUE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    
    default:
      return state;
  }
}

///////////////////////////////////////////
///////////////////////////////////////////

const initialIssuesState = {
  currentPageIssues: [],
  pageCount: 0,
  pageLinks: {},
  isLoading: false,
  error: null
};

export function issuesReducer(state = initialIssuesState, action) {
  switch(action.type) {
    case GET_ISSUES_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    
    case GET_ISSUES_SUCCESS:
      return {
        ...state,
        currentPageIssues: action.payload.issuesList,
        pageCount: action.payload.pageCount,
        pageLinks: action.payload.pageLinks,
        isLoading: false,
        error: null
      };

    case GET_ISSUES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}

///////////////////////////////////////////
///////////////////////////////////////////

const initialCommentsState = {
  currentIssueComments: [],
  isLoading: false,
  error: null
}

export function commentsReducer(state = initialCommentsState, action) {
  switch(action.type) {
    case GET_COMMENTS_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        currentIssueComments: action.payload.comments,
        isLoading: false,
        error: null 
      }

    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state;
  }
}

///////////////////////////////////

export default combineReducers({
  issuesState: issuesReducer,
  issueDetailState: issueReducer,
  issuesCommentsState: commentsReducer
});