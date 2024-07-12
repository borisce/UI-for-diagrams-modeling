module.exports = {
    resolve: {
        fallback: { "assert": require.resolve("assert/") },
        ffallback: { "util": require.resolve("util/") }
    }
}