const crypto = require('crypto')

function generateAccessToken(input) {
    return crypto.createHash('sha256')
      .update(input)
      .digest('hex');
  }

  const accessToken = generateAccessToken('myaccesstoken123456');
console.log('Access Token:', accessToken);