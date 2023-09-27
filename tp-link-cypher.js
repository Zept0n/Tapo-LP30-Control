const CryptoJS = require('crypto-js');

class TpLinkCipher {
  constructor(keyHex, ivHex) {
    this.key = CryptoJS.enc.Hex.parse(keyHex);
    this.iv = CryptoJS.enc.Hex.parse(ivHex);
  }

  encrypt(data) {
    const encrypted = CryptoJS.AES.encrypt(data, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // Convert the CipherParams object to a Base64 string
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decrypt(data) {
    // Convert the Base64 string back to a WordArray
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(data)
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}


// Initialize the TpLinkCipher instance with the key and IV
const keyHex = '00112233445566778899aabbccddeeff';
const ivHex = '112233445566778899aabbccddeeff00';
const cipher = new TpLinkCipher(keyHex, ivHex);

// Test encryption
const plaintext = 'Hello, world!';
const encrypted = cipher.encrypt(plaintext);
console.log('Encrypted:', encrypted);

// Test decryption
const decrypted = cipher.decrypt(encrypted);
console.log('Decrypted:', decrypted);


module.exports = TpLinkCipher;