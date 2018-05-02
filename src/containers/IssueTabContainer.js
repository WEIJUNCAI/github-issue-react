import { connect } from 'react-redux'
import { getIssues } from '../redux/actions';
import IssueTab from '../components/issuesTab/IssueTab'

function mapStateToProps(state, ownProps) {
    return {
        issues: state.issuesState.currentPageIssues,
        issuesError: state.issuesState.error,
        isLoading: state.issuesState.isLoading,
        pageCount: state.issuesState.pageCount,
        owner: ownProps.match.params.owner,
        repo: ownProps.match.params.repo,
        history: ownProps.history,
        location: ownProps.location
    }
}

const mapDispatchToProps = { getIssues };

export default connect(mapStateToProps, mapDispatchToProps)(IssueTab);