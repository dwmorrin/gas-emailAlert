# Email Alert

Google Apps Script solution for getting emails from an internet-of-things
device without storing Gmail credentials or token on the device.

## Usage

Deploy this as a public web app. Not commited to git is a file named `env.js`
that should look like

```js
var env = {
  email: {
    to: "your_email@gmail.com",
  },
};
```

and any other private info and customization can be placed in there.

Just store the URL on your device you want to be alerted with and have it
make a HTTP POST request with a JSON body to the URL.
