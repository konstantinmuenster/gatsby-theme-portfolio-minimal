module.exports = ({ createResolvers }) => {
    createResolvers({
        ArticleMarkdown: {
            body: { resolve: parentResolverPassthrough('html') },
        },
    });
};

function parentResolverPassthrough(field, defaultValue) {
    return async function (source, args, context, info) {
        const fieldName = field || info.fieldName;
        const parentNode = context.nodeModel.getNodeById({ id: source.parent });
        const schemaType = info.schema.getType(parentNode.internal.type);
        const resolver = schemaType.getFields()[fieldName].resolve;
        const result = await resolver(parentNode, args, context, { fieldName });
        return result || defaultValue;
    };
}

// function parentPassthrough(field, defaultValue) {
//     return async function (source, args, context, info) {
//         const node = context.nodeModel.getNodeById({ id: source.parent });
//         const fields = field.split('.');
//         const value = fields.reduce((prev, key) => prev[key], node);
//         return value || defaultValue;
//     };
// }
