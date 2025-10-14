; Tree-sitter highlights for Metal Shading Language (MSL)

; Top-level
(function_definition) @function
(struct_declaration) @type

; Types
(type) @type

; Keywords
(function_qualifier) @keyword
(storage_qualifier) @storageclass

; Attributes
(attribute_annotation) @attribute

; Variables
(variable_declaration) @variable

; Parameters
(parameter) @variable.parameter

; Statements
(return_statement) @keyword
(expression_statement) @expression
(compound_statement) @punctuation.bracket

; Identifiers
(identifier) @variable