module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '*.blob.vercel-storage.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]},
                use: ['@svgr/webpack'],
            }
        )
        fileLoaderRule.exclude = /\.svg$/i
        return config
    }
}
