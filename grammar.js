/**
 * @file Metal grammar for tree-sitter
 * @author LuTheCoder <luthecoder@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "metal",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
