// @ts-nocheck
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot, '../..');

  // Create the default Metro config
  const config = getDefaultConfig(projectRoot);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  if (config.resolver) {
    // 1. Watch all files within the monorepo
    config.watchFolders = [workspaceRoot];
    // 2. Let Metro know where to resolve packages and in what order
    config.resolver.nodeModulesPaths = [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ];
    // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
    config.resolver.disableHierarchicalLookup = true;
  }

  return config;
})();
