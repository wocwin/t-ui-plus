#!/usr/bin/env bash
set -e

npm run clean

npm run build
cd dist/t-ui-plus
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published t-ui-plus"
cd -

cd packages/utils
echo "build utils..."
npm run build
echo "publish utils..."
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published utils"
cd -

cd packages/resolver
echo "build resolver..."
npm run build
echo "publish resolver..."
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published resolver"
cd -

cd packages/eslint-config
echo "build eslint-config..."
npm run build
echo "publish eslint-config..."
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published eslint-config"
cd -

echo "✅ Publish completed"
exit
