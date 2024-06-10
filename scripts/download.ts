import { run } from 'shell-commands';

const main = async () => {
  await run(`
rm -rf ngrok.zip ngrok
curl -o ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-amd64.zip
unzip ngrok.zip
rm ngrok.zip
chmod a+x ngrok
`);
};

main();
