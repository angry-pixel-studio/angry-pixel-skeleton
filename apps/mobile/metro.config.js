const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('zip');

const mobileRoot = __dirname;
const webDistZip = path.join(mobileRoot, 'assets', 'web-dist.zip');
const webDistPlaceholder = path.join(mobileRoot, 'assets', 'web-dist.placeholder.zip');

const upstreamResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (typeof moduleName === 'string' && context.originModulePath) {
    const resolved = path.normalize(
      path.isAbsolute(moduleName)
        ? moduleName
        : path.join(path.dirname(context.originModulePath), moduleName),
    );
    if (resolved === webDistZip && !fs.existsSync(resolved)) {
      const resolve =
        upstreamResolveRequest ?? ((ctx, name, plat) => ctx.resolveRequest(ctx, name, plat));
      return resolve(context, webDistPlaceholder, platform);
    }
  }

  if (upstreamResolveRequest) {
    return upstreamResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
