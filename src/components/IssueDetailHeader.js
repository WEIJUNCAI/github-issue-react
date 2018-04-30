import React from 'react';
import PropTypes from 'prop-types';
import { getTimeDiffFromNow } from '../utils/timeUtils';

import issueOpened from '../images/octicons/svg/issue-opened.svg';
import issueClosed from '../images/octicons/svg/issue-closed.svg';
import './css/IssueDetailHeader.css';


const IssueDetailHeader = ({ title, number, isOpen, timeStamp, numComments, user }) => {
  let icon, issueStatusText;
  if(isOpen){
    icon = issueOpened;
    issueStatusText = "Open";
  } else {
    icon = issueClosed;
    issueStatusText = "Closed";
  }

  const timeDiffStr = getTimeDiffFromNow(timeStamp);
  const singularOrPluralComment = numComments <= 1 ? "comment" : "comments";

  return (
    <div className="issue-page-header">
      <div className="row">
        <div className="col">
          <h2>
            {title}&nbsp;
            <span className="text-muted">#{number}</span>
          </h2>
        </div>
      </div>

      <div className="row my-2 pb-3">
        <div className="col">
          <div className="state state-green">
            <img className="align-baseline" src={icon} alt=""/>
            <span className="mx-1">{issueStatusText}</span>
          </div>
          <span className="text-secondary ml-2">
            <a href={`https://github.com/${user.login}`} 
               className="text-secondary font-weight-bold">{user.login}</a> 
               &nbsp;opened this issue&nbsp;
            <span>{timeDiffStr}</span>
            <span> · {numComments}</span> {singularOrPluralComment}
        </span>
        </div>
      </div>
      <hr />
    </div>
  );
};

IssueDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string
  }).isRequired
};

export default IssueDetailHeader;

