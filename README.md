# eosjs-light
#### A lightweight alternative to EOSJS for reading from the blockchain

## How To Install:

### Install Method 1: NPM Module
#### You can install using npm
```npm install --save eosjs-light```
#### And then import using require or import
```javascript
const eosjsLight = require('eosjs-light');
```

## How to Use:
### Create an Instance in a web browser
```javascript
const eosRpc = new eosjsLight.JsonRpc("https://api.eosrapid.com"); // replace the api url with your eos api url, or use ours =)
```

### Create an Instance in node
```javascript
// in node, you must bring your own fetch client: eg. node-fetch
const eosRpc = new eosjsLight.JsonRpc("https://api.eosrapid.com", {fetch: fetchClient});
```

### Get Chain Info:
```javascript
eosRpc.get_info()
.then((result)=>console.log("Result: ", result))
.then((error)=>console.errror("ERROR: ", error))
```
