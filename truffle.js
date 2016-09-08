module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      //"javascripts/crypto-browser.js",
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    //"node_modules/" : [
    //  "javascripts/node_modules/"
    //],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
