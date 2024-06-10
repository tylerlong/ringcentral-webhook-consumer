import { run } from 'shell-commands';

const main = async () => {
  await run(`
rm -rf ngrok.zip ngrok
curl -o ngrok.zip https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-${process.arch === 'arm64' ? 'arm64' : 'amd64'}.zip
unzip ngrok.zip
rm ngrok.zip
chmod a+x ngrok
`);
};

main();
