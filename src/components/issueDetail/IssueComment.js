import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { getTimeDiffFromNow } from '../../utils/timeUtils';
import { insertMentionLinks } from '../../utils/stringUtils';
import '../css/IssueComment.css';

const IssueComment = ({user, timeStamp, authorAssociation, content}) => {
  const timeDiffStr = getTimeDiffFromNow(timeStamp);
  const authorAssociationDisplayName = authorAssociation.charAt(0).toUpperCase() + authorAssociation.toLowerCase().substring(1);
  const authorAssociationSpan = authorAssociation !== "NONE" ?
    (<span className="timeline-comment-label font-weight-bold ">
      {authorAssociationDisplayName}
      </span>) : null;

  return (
    <div className="timeline-comment-wrapper">

      <div className="avatar-parent-child timeline-comment-avatar">
        <a className="d-inline-block" href={user.html_url}>
          <img className="avatar" height="44" width="44" src={user.avatar_url} alt="avatar"/>
        </a>
      </div>

      <div className="card">
        <ul className="list-group">
          <li className="list-group-item timeline-comment-header">
            <span>
              <strong>
                <a className="text-secondary" href={user.html_url}>{user.login}</a>
              </strong>
              &nbsp;commented&nbsp;
              <span>{timeDiffStr}</span>
            </span>
            {authorAssociationSpan}
          </li>

          <li className="list-group-item">
            <div className="comment-body">
              <ReactMarkdown source={insertMentionLinks(content)} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

IssueComment.propTypes = {
  timeStamp: PropTypes.string.isRequired,
  authorAssociation: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired
}

export default IssueComment;