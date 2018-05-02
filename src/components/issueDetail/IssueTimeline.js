import React from 'react';
import PropTypes from 'prop-types';
import IssueComment from './IssueComment';

const IssueTimeline = ({ post, comments }) => {

  return (
    <React.Fragment>
      <IssueComment
        user={post.user}
        timeStamp={post.created_at}
        authorAssociation={post.author_association}
        content={post.body} />

      {comments.map(comment => (
        <div className="row" key={comment.id}>
          <div className="col">
            <IssueComment
              user={comment.user}
              timeStamp={comment.created_at}
              authorAssociation={comment.author_association}
              content={comment.body} />
          </div>
        </div>))}
    </React.Fragment>
  );
};



IssueTimeline.propTypes = {
  post: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
      author_association: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      author_association: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired
    })
  )
};

export default IssueTimeline;