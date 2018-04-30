import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IssueLabels from './IssueLabels';
import { getTimeDiffFromNow } from '../utils/timeUtils';
import './css/IssueEntry.css';
import issueOpened from '../images/octicons/svg/issue-opened.svg';
import issueClosed from '../images/octicons/svg/issue-closed.svg';
import comment from '../images/octicons/svg/comment.svg';

const IssueEntry = ({ owner, repo, title, number, numComments, isOpen, timeStamp, user, labels }) => {
  const icon = isOpen ? issueOpened : issueClosed;
  const timeDiffStr = getTimeDiffFromNow(timeStamp);

  const commentLinkIcon = numComments !== 0 ? (
    <div className="col-1 pt-1">
      <Link className="text-muted" 
            to={`/${owner}/${repo}/issues/${number}`} >
        <img src={comment} alt="comments" />
        <small className="font-weight-bold ml-1">{numComments}</small>
      </Link>
    </div> ) : null;

  return (
    <li className="issue-entry list-group-item py-2">
      <img className="float-left pt-1 pl-1" src={icon} alt="" />
      <div className="row">
        <div className="col pl-2">
          <Link className="text-dark font-weight-bold"
            to={`/${owner}/${repo}/issues/${number}`}>{title}</Link>
          <IssueLabels labels={labels} />
          <div className="row">
            <div className="col">
              <small className="text-muted">
                <span>{`#${number}`}</span> opened&nbsp;
                <span>{timeDiffStr}</span> by&nbsp;
                <a className="text-muted" href={`https://github.com/${user.login}`}>{user.login}</a>
              </small>
            </div>
          </div>
        </div>

        {commentLinkIcon}
      </div>

    </li>
  );
};

IssueEntry.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  numComments: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string.isRequired,
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
};


export default IssueEntry;