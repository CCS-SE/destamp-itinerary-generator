import {
  BigIntResolver,
  DateTimeResolver,
  JSONResolver,
} from 'graphql-scalars';
import { asNexusMethod, makeSchema } from 'nexus';
import { validatePlugin } from 'nexus-validate';

import Enum from './enum';
import Input from './input';
import Models from './models';
import Mutation from './mutation';
import Query from './query';

const DateTime = asNexusMethod(DateTimeResolver, 'date');
const BigInt = asNexusMethod(BigIntResolver, 'bigInt');
const Json = asNexusMethod(JSONResolver, 'json');

const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [Models, Input, Enum, Query, Mutation, DateTime, BigInt, Json],
  outputs: {
    schema: `${__dirname}/../../../schema.graphql`,
    typegen: `${__dirname}/../generated/nexus.ts`,
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  plugins: [validatePlugin()],
});

export { schema };
