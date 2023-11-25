import {
  FieldNode,
  FragmentSpreadNode,
  GraphQLObjectType,
  GraphQLResolveInfo,
  InlineFragmentNode,
} from 'graphql';

const isFieldNode = (
  node: FieldNode | FragmentSpreadNode | InlineFragmentNode,
): node is FieldNode => {
  return node.kind === 'Field';
};

export default function getFieldsFromInfo(info: GraphQLResolveInfo) {
  const fields = info.fieldNodes[0]?.selectionSet?.selections
    .filter(isFieldNode)
    .reduce((acc: Record<string, boolean>, field: FieldNode) => {
      const returnType = info.returnType;

      // field is a relationship
      if (returnType instanceof GraphQLObjectType) {
        return { ...acc, [field.name.value]: true };
      } else {
        return acc;
      }
    }, {});
  return fields;
}
