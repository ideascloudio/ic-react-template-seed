IC_ACCESS_TOKEN=$1

npm install
npm run build
sudo npm install --global ideascloud-cli
IC_ACCESS_TOKEN=$IC_ACCESS_TOKEN ic-cli dev-community upload-webapp-template-version