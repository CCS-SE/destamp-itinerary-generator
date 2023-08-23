import { BigIntResolver, DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, makeSchema } from "nexus";
import { validatePlugin } from "nexus-validate";

import Models from "./models";
import Query from "./query";

const DateTime = asNexusMethod(DateTimeResolver, "date");
const BigInt = asNexusMethod(BigIntResolver, "bigInt");

const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [Models, Query, DateTime, BigInt],
  outputs: {
    schema: `${__dirname}/../../../schema.graphql`,
    typegen: `${__dirname}/../generated/nexus.ts`,
  },
  contextType: {
    module: require.resolve("../../context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  plugins: [validatePlugin()],
});

export { schema };
