pm2 stop all
pm2 delete all
git pull origin main
npm install
pm2 start prod.pm2.json
pm2 save