echo "build WebMonitor begin"
pwd
npm install
npm run build

mkdir -p build
cp -r server/public/dist/index.html build
cp -r server/public/dist/static build

cd build
zip -rq ../WebMonitor.zip ./*

echo "build WebMonitor end"
