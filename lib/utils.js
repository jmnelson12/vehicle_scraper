/**
 * @param { Array } array
 */
const flattenArray = (array) => {
    return array.reduce(
        (prev, next) =>
            Array.isArray(next)
                ? prev.concat(flattenArray(next))
                : prev.concat(next),
        []
    );
}

module.exports = { flattenArray };
