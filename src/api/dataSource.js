import parseLink from 'parse-link-header'


const REMOTE_API_ROOT = "https://api.github.com";

// Retrieve all issues in a page

export function getIssues(owner, repo, page = 1) {
  let pageLinks, pageCount;
  const url = `${REMOTE_API_ROOT}/repos/${owner}/${repo}/issues?page=${page}`;
  return fetch(url)
        .then(response => {
                pageLinks = parseLink(response.headers.get("Link"));
                pageCount = getPageCount(pageLinks);
                return response.json();
              })
        .then(json =>{ return {pageLinks, pageCount, data: json}; })
        .catch(error => Promise.reject(error));
}


// Retrieve a single issue using its identifying number

export function getIssue(owner, repo, number) {
  const url = `${REMOTE_API_ROOT}/repos/${owner}/${repo}/issues/${number}`;

  return fetch(url)
        .then(response => response.json())
        .then(json => json)
        .catch(error => Promise.reject(error));
}

export function getComments(commentsUrl) {

  return fetch(commentsUrl)
        .then(response => response.json())
        .then(json => json)
        .catch(error => Promise.reject(error));
}


//////////////////////////////
//          helpers         //
//////////////////////////////



// The pagination page info is deduced from the 
// "Link" field in HTTP header 

const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 2 &&
    pageLinks.first && pageLinks.prev;
}

const getPageCount = (pageLinks) => {
  if(!pageLinks) {
    return 0;
  }
  if(isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if(pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0;
  }
}