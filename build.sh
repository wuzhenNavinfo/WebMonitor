echo "build WebMonitor begin"
pwd
npm install
echo "build start ---"
npm run build
echo "build finish ---"
pwd


zip -rq ./WebMonitor.zip ./dist/*

echo "build WebMonitor end"
