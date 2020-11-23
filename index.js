/**
 * @author Mike Hingley
 * @copyright 2020 Mike Hingley
 * @license MIT
 * @module remark-link-escape
 * @fileoverview
 *   Warn when a link has a pipe within a link.
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
