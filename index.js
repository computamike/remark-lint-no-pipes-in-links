/**
 * @author Mike Hingley
 * @copyright 2020 Mike Hingley
 * @license MIT
 * @module remark-lint-no-pipes-in-links
 * @fileoverview
 *  Warn when a link has a pipe within a link.
 *  
 *  see [free-programming-books issue 5176](https://github.com/EbookFoundation/free-programming-books/issues/5176) 
 * 
 *  ## Example
 *  ###### In
 *   ```markdown
 *   [This is a link | with a pipe](https://unifiedjs.com/)
 *   ```
 *  
 *  ###### Out
 *
 *   ```text
 *    1:1  warning  link contains an unescaped |              link-escape       remark-lint
 *   ```
 * 
 *  ###### In
 *   ```markdown
 *   [This is a link /| with a pipe](https://unifiedjs.com/)
 *   ```
 *  
 *  ###### Out
 *
 *   ```text
 *    no messages
 *   ```
 */

'use strict'

var rule = require('unified-lint-rule')
const visit = require('unist-util-visit');
module.exports = rule('remark-lint:link-escape', linkEscape)

function linkEscape(tree, file, option) {
  visit(tree, 'link', node => {
    visit(node, 'text', LinkText =>{
      const regex = /(?<!\/)\|/g;
      var result;
      while (result = regex.exec(LinkText.value)) {
        file.message('link contains an unescaped | ',node);
      }
    })
  })
}
