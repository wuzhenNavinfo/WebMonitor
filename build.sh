echo "build WebMonitor page begin"
pwd
npm install
echo "build start ---"
npm run build
echo "build finish ---"
pwd

cd dist
zip -rq WebMonitor.zip ./*

cp -r WebMonitor.zip ../

echo "build WebMonitor page end"

echo "build WebMonitor service begin"
cd server

zip -rq ../server.zip ./*
cd ../



echo "build WebMonitor service end"
