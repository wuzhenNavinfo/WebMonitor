echo "build WebMonitor begin"
pwd
npm install
echo "build start ---"
npm run build
echo "build finish ---"
pwd

cd dist
zip -rq WebMonitor.zip ./*

cp -r WebMonitor.zip ../

echo "build WebMonitor end"
