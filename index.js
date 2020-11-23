/**
 * @author Mike Hingley
 * @copyright 2020 Mike Hingley
 * @license MIT
 * @module remark-link-escape
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

module.exports = rule('remark-lint:link-escape', linkEscape)

function matchLineNumber(m) {
    let line = 1
    for (let i = 0; i < m.index; i++) {
      if (m.input[i] == '\n') {
        line++;
      }
    }
    return line;
  }

function linkEscape(tree, file, option) {
    var contents = String(file)
    const regex = /((\[)(.*)((?<!\/)\|)+(.*)(\]))/gm;
    let m;
    while ((m = regex.exec(contents)) !== null) {
        var x =         matchLineNumber(m)
        var pos = {
            line:x,
        }
        file.message('link contains an unescaped | ',pos);
    }  
}
