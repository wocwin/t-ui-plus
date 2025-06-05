set -e

cd dist/t-ui-plus

npm publish --registry=https://registry.npmjs.org/

echo "Successfully published t-ui-plus"

cd -