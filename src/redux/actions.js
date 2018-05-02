import * as API from '../api/dataSource'

export const GET_ISSUE_BEGIN = 'GET_ISSUE_BEGIN';
export const GET_ISSUE_SUCCESS = 'GET_ISSUE_SUCCESS';
export const GET_ISSUE_FAILURE = 'GET_ISSUE_FAILURE';

export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';

export const GET_COMMENTS_BEGIN = 'GET_COMMENTS_BEGIN';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const GET_REPO_DETAILS_BEGIN = 'GET_REPO_DETAILS_BEGIN';
export const GET_REPO_DETAILS_SUCCESS = 'GET_REPO_DETAILS_SUCCESS';
export const GET_REPO_DETAILS_FAILURE = 'GET_REPO_DETAILS_FAILURE';


export function getIssueBegin() {
  return { type: GET_ISSUE_BEGIN };
}

export function getIssueSuccess(issue) {
  return {
    type: GET_ISSUE_SUCCESS,
    payload: issue
  }
}

export function getIssueFailure(error) {
  return {
    type: GET_ISSUE_FAILURE,
    error
  }
}

// Thunk action creator
// DO NOT use catch here
export function getIssue(owner, repo, number) {
  return dispatch => {
    dispatch(getIssueBegin());
    API.getIssue(owner, repo, number)
       .then(data => dispatch(getIssueSuccess(data)),
             error => dispatch(getIssueFailure(error)));
  }
}

///////////////////////////////////////////////
///////////////////////////////////////////////


export function getIssuesBegin() {
  return { type: GET_ISSUES_BEGIN };
}

export function getIssuesSuccess(issuesResponse) {
  return {
    type: GET_ISSUES_SUCCESS,
    payload: {
      // Total number of pagination pages
      pageCount: issuesResponse.pageCount,
      pageLinks: issuesResponse.pageLinks,
      // The array of all issues in this page
      issuesList: issuesResponse.data,
    }
  };
}

export function getIssuesFailure(error) {
  return {
    type: GET_ISSUES_FAILURE,
    error
  };
}

// Thunk action creator
export function getIssues(owner, repo, searchStr, page) {
 return dispatch => {
   dispatch(getIssuesBegin());
   API.getIssues(owner, repo, searchStr, page)
      // json data returned from API is an array of issues
      .then(data => dispatch(getIssuesSuccess(data)),
            error => dispatch(getIssuesFailure(error)));
 }
}


///////////////////////////////////////////////
///////////////////////////////////////////////


export function getCommentsBegin() {
  return { type: GET_COMMENTS_BEGIN };
}

export function getCommentsSuccess(issueNumber, comments) {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: {
      issueNumber,
      comments
    }
  }
}

export function getCommentsFailure(error) {
  return {
    type: GET_COMMENTS_FAILURE,
    error
  }
}

// Thunk action creator

export function getComments(issue) {
  return dispatch => {
    dispatch(getCommentsBegin());
    API.getComments(issue.comments_url)
       .then(comments => dispatch(getCommentsSuccess(issue.number, comments)),
             error => dispatch(getCommentsFailure(error)));
  }
}