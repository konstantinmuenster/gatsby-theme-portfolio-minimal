import { Node } from 'gatsby';
import { GatsbyNodeHelpers } from '../../types';

// function parentPassthrough(field: string, defaultValue?: unknown) {
//     return async function (source, args, context, info) {
//         const node = context.nodeModel.getNodeById({ id: source.parent });
//         const fields = field.split('.');
//         const value = fields.reduce((prev, key) => prev[key], node);
//         return value || defaultValue;
//     };
// }

function parentResolverPassthrough(field: string, defaultValue?: unknown) {
    /*eslint @typescript-eslint/no-explicit-any: */
    return async function (source: Node, args: any, context: any, info: any) {
        const fieldName = field || info.fieldName;
        const parentNode = context.nodeModel.getNodeById({ id: source.parent });
        const schemaType = info.schema.getType(parentNode.internal.type);
        const resolver = schemaType.getFields()[fieldName].resolve;
        const result = await resolver(parentNode, args, context, { fieldName });
        return result || defaultValue;
    };
}

export function createResolvers({ createResolvers }: GatsbyNodeHelpers): void {
    createResolvers({
        ArticleMarkdown: {
            body: { resolve: parentResolverPassthrough('html') },
        },
    });
}
