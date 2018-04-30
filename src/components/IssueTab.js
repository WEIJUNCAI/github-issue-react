import React from 'react';
import IssueTable from './IssueTable'
import Pagination from './Pagination'
import { getPageFromQuery } from '../utils/urlUtils';


class IssueTab extends React.Component {

  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { getIssues, owner, repo, location } = this.props;
    const computedPage = getPageFromQuery(location.search);
    const currentPageBaseOne = computedPage ? computedPage : 1;
    getIssues(owner, repo, currentPageBaseOne);
  }

  componentDidUpdate(prevProps) {
    const { getIssues, owner, repo, location } = this.props;

    // Fetch new issues whenever the page changes
    // The source of truth of current page is the browser url
    if(prevProps.location.search !== location.search) {
      const newPage = getPageFromQuery(location.search);
      getIssues(owner, repo, newPage);
    }
  }

  handlePageChange({ selected }) {

    // <********** NOTE  **********>
    // The "select" property that pagination exposed is 0 - based
    // However the page number to be displayed and remote API uses is usually 1 - based
    // need to convert first
    const currentPageOneBased = selected + 1;
    const { owner, repo, getIssues, history } = this.props;
    // pushes a new entry into the history stack and changes the browser displayed url
    // apparently doing this will cause this component to receive new props
    // and the new page fetching is handled by "componentWillReceiveProps"
    history.push(`?page=${currentPageOneBased}`)
    //getIssues(owner, repo, currentPageOneBased);
  }

  render() {

    const {
      owner, repo, isLoading, issues,
      pageCount, openIssuesCount, issuesError,
      location
    } = this.props;

    if (issuesError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <div>{issuesError.toString()}</div>
        </div>
      );
    }

    const computedPage = getPageFromQuery(location.search);
    const currentPageBaseOne = computedPage ? computedPage : 1;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <IssueTable issues={issues} owner={owner} repo={repo} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <Pagination
              currentPage={currentPageBaseOne - 1}
              pageCount={pageCount}
              handlePageChange={this.handlePageChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default IssueTab;