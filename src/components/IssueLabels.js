import React from 'react';
import PropTypes from 'prop-types';
import './css/IssueLabel.css';

const IssueLabels = ({ labels }) => {
  return (
    <span className="labels mx-2">
      {labels.map(label =>
        <a key={label.id}
           className="d-inline-block issue-label mx-1"
           href={label.url}
           style={{ backgroundColor: `#${label.color}`, color: "#000000" }}>
           {label.name}
        </a>
      )
      }
    </span>
  );
}

IssueLabels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string,
      url: PropTypes.string,
      name: PropTypes.string
    }).isRequired
  )
};

export default IssueLabels;