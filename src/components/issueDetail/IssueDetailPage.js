import React from 'react';
import PropTypes from 'prop-types';
import IssueTimeline from './IssueTimeline';
import IssueDetailHeader from './IssueDetailHeader';

class IssueDetailPage extends React.Component {

  // Get issue when mounted
  // Navigating between pages will remount this node
  // and fetch new issue
  componentDidMount() {
    const { owner, repo, issueId, getIssue } = this.props;
    getIssue(owner, repo, issueId);
  }

  // Getting issue on mount will eventually trigger a store state update
  // then this will be called to retrieve comments of this issue
  componentDidUpdate(prevProps) {
    const { issue, getComments } = this.props;
    if(prevProps.issue !== issue) {
      getComments(issue);
    }
  }

  render() {

    const { issueId, issue, comments, issueError, commentsError } = this.props;

    if(!issue)
      return null;

    if(issueError) {
      return (
        <div className="issue-detail--error">
          <h1>There was a problem loading issue #{issueId}</h1>
          <p>{issueError.toString()}</p>
        </div>
      );
    }

    if(commentsError) {
      return (
        <div className="issue-detail--comments-error">
          There was a problem fetching the comments.
        </div>
      );
    }

    return (
      <div className="container">
        <IssueDetailHeader
          title={issue.title}
          number={issue.number}
          isOpen={issue.state === "open"}
          timeStamp={issue.created_at}
          numComments={issue.comments}
          user={issue.user} />

        <div className="row">
          <div className="col-10">
            <IssueTimeline
              post={issue}
              comments={comments} />
          </div>

          <div className="col-2">
          </div>
        </div>
      </div>
    );
  }
}

export default IssueDetailPage;