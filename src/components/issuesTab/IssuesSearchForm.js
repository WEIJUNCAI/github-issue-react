import React from 'react';
import PropTypes from 'prop-types';

class IssuesSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchStr: props.initialSearchStr};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({searchStr: event.target.value});
  }

  // on submitting, invoke parent's submit handler
  // and pass it the current search string
  handleSubmit(event) {
    this.props.handleSearchFormSubmit(this.state.searchStr);
    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button">Filter</button>
          </div>
          <input
            type="text"
            className="form-control pl-4"
            placeholder="Search all issues"
            value={this.state.searchStr}
            onChange={this.handleChange} />
        </div>
      </form>
    );
  }
}

IssuesSearchForm.propTypes = {
  initialSearchStr: PropTypes.string.isRequired,
  handleSearchFormSubmit: PropTypes.func.isRequired
};

export default IssuesSearchForm;