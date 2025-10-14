// Top-level attribute (any identifier + optional args)
[[metal_version(3)]]

// Struct with field declarations inside a compound block
struct VertexOut {
  float4 position;
  float3 color;
}

// Top-level variable declaration (with storage qualifier)
constant float intensity = 1.0;

// Function with qualifier, parameters (with storage qualifiers/attributes),
// function attributes after the parameter list, and a simple body.
vertex float main_vertex(float3 pos, float4 col [[user(0)]]) [[position(0)]] {
  float v = 0.5;
  v = v + intensity;  // expression statements are allowed
  return v;           // return with a simple expression
}

// Another function variant with a different qualifier and attribute
fragment float main_fragment() [[early_fragment_tests]] {
  return 0.0;
}