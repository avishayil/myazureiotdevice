const fs = require('fs');
const microsofComputerVision = require('microsoft-computer-vision');
const PiCamera = require('pi-camera');
const dbAdapter = require('./db');

function shootImage() {
  const myCamera = new PiCamera({
    mode: 'photo',
    output: `${__dirname}/pic.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
  });

  return new Promise(function (resolve, reject) {
    myCamera.snap()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function analyzeImage() {
  return new Promise(function (resolve, reject) {
    fs.readFile('./pic.jpg', function (err, data) {
      if (err)
        throw err;

      microsofComputerVision.analyzeImage({
        "Ocp-Apim-Subscription-Key": "a9eebe233e5e47bd99309567e6fcb6b0",
        "request-origin": "westcentralus",
        "content-type": "application/octet-stream",
        "body": data,
        "visual-features": "Tags, Categories, Description, Color"
      }).then((result) => {
        resolve(result);
      }).catch((err) => {
        throw err;
        reject(err);
      })
    });
  });
}

shootImage().then(result => {
  analyzeImage(result).then(res => {
    dbAdapter.getSnapshotDocument().then(() => dbAdapter.setSnapshot(res));
  })
})