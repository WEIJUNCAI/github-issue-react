import React from 'react';
import PropTypes from 'prop-types';
import IssueEntry from './IssueEntry';

const IssueTable = ({ owner, repo, issues }) => {

  return (
    <div className="card">
      <ul className="list-group">
        {issues.map(issue =>
          <IssueEntry key={issue.id}
            owner={owner}
            repo={repo}
            title={issue.title}
            number={issue.number}
            createdAt={issue.created_at}
            closedAt={issue.closed_at}
            user={issue.user}
            labels={issue.labels}
            numComments={issue.comments} />
        )
        }
      </ul>
    </div>
  );
};

IssueTable.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string
      }).isRequired,
      labels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          color: PropTypes.string
        })
      )
    })
  ).isRequired
};

export default IssueTable;