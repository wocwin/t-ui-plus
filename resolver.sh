set -e

cd packages/resolver
echo "build resolver..."
npm run build
echo "publish resolver..."
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published resolver"
cd -