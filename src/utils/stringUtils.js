
// Replace the plain user mention (e.g. "@user") in string into
// markdown link 
export function insertMentionLinks(markdown) {
    return markdown.replace(/\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g, `**[$1](https://github.com/$2)**`);
  }