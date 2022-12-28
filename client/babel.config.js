module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 2 iOS versions',
            'last 1 Android version',
            'last 1 ChromeAndroid version',
            'ie 11',
          ],
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
      '@babel/preset-typescript',
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
