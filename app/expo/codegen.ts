import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "src/graphql/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typed-document-node",
      ],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
