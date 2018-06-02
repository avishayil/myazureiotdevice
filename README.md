## Synopsis

This is the firmware that runs as a service on the IoT device (such as Raspberry PI 3)

## Installation

1. Deploy this firmware to your IoT device.
2. Install NodeJS on your server by running the following command: `wget -O - https://raw.githubusercontent.com/audstanley/NodeJs-Raspberry-Pi/master/Install-Node.sh | sudo bash`.
3. Run `npm install`.
4. Run `cp .env.default .env` and change the environment variables according to your DocumentDB credentials.
5. Make sure you have `task.sh` executable by running: `chmod +x task.sh`.
6. run `node index.js` as a cronjob, that runs every hour, by adding the following line to `crontab -e`: `0 * * * * /home/pi/~yourpath~/task.sh`.

## License

MIT