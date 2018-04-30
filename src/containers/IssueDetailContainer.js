import { connect } from 'react-redux'
import { getIssue, getComments } from '../redux/actions';
import IssueDetailPage from '../components/IssueDetailPage'

function mapStateToProps(state, ownProps) {
    return {
        owner: ownProps.match.params.owner,
        repo: ownProps.match.params.repo,
        issueId: ownProps.match.params.issueId,
        issue: state.issueDetailState.currentIssue,
        comments: state.issuesCommentsState.currentIssueComments,
        isLoading: state.issuesCommentsState.isLoading || state.issueDetailState.isLoading,
        issueError: state.issueDetailState.error,
        commentsError: state.issuesCommentsState.error
    };
}

const mapDispatchToProps = { getIssue, getComments };

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailPage);