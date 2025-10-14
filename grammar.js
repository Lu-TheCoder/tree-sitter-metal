/**
 * @file Metal tree-sitter
 * @author LuTheCoder <luthecoder@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// grammar.js — pure Metal Shading Language grammar

module.exports = grammar({
  name: "metal",

  extras: $ => [
    /\s|\/\/.*|\/\*[\s\S]*?\*\//, // whitespace and comments
  ],

  rules: {
    source_file: $ => repeat($._top_level_item),

    // -------------------------------
    // Top-level items
    // -------------------------------
    _top_level_item: $ => choice(
      $.function_definition,
      $.struct_declaration,
      $.variable_declaration,
      $.attribute_annotation
    ),

    // -------------------------------
    // Function definitions
    // -------------------------------
    function_definition: $ => seq(
      optional($.function_qualifier),
      $.type,
      $.identifier,
      "(",
      optional($.parameter_list),
      ")",
      repeat($.attribute_annotation),
      $.compound_statement
    ),

    function_qualifier: _ => choice("vertex", "fragment", "kernel", "compute"),

    // -------------------------------
    // Attributes [[...]]
    // -------------------------------
    attribute_annotation: $ => seq(
      "[[",
      $.identifier,
      optional(seq("(", $.argument_list, ")")),
      "]]"
    ),

    argument_list: $ => seq($.expression, repeat(seq(",", $.expression))),

    // -------------------------------
    // Structs
    // -------------------------------
    struct_declaration: $ => seq(
      "struct",
      $.identifier,
      $.compound_statement
    ),

    // -------------------------------
    // Types
    // -------------------------------
    type: _ => choice(
      "void","bool","char","int","uint","half","float",
      "float2","float3","float4",
      "int2","int3","int4",
      "uint2","uint3","uint4",
      "half2","half3","half4",
      "float2x2","float3x3","float4x4"
    ),

    // -------------------------------
    // Variable declarations
    // -------------------------------
    variable_declaration: $ => seq(
      repeat($.storage_qualifier),
      $.type,
      $.identifier,
      optional(seq("=", $.expression)),
      ";"
    ),

    storage_qualifier: _ => choice(
      "device", "constant", "threadgroup", "thread", "uniform"
    ),

    parameter_list: $ => seq($.parameter, repeat(seq(",", $.parameter))),

    parameter: $ => seq(
      repeat($.storage_qualifier),
      $.type,
      $.identifier,
      optional(repeat($.attribute_annotation))
    ),

    // -------------------------------
    // Statements
    // -------------------------------
    _statement: $ => choice(
      $.variable_declaration,
      $.expression_statement,
      $.compound_statement,
      $.return_statement
    ),

    compound_statement: $ => seq("{", repeat($._statement), "}"),

    return_statement: $ => seq("return", optional($.expression), ";"),

    expression_statement: $ => seq($.expression, ";"),

    expression: _ => /[^;\[\]\(\)]+/, // very basic placeholder

    // -------------------------------
    // Identifiers
    // -------------------------------
    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,
  }
});