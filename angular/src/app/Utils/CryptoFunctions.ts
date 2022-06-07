import { environment } from "@AppConfigs/environment";

var CryptoJS = require("crypto-js");
export function EncryptValue(value: string) {

    // Encrypt
    return CryptoJS.AES.encrypt(value, environment.EncyptionKey).toString();
}
export function DecryptValue(value: string) {

    // Encrypt
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(value, environment.EncyptionKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText; // 'my message'
}

export function EncryptApiData(value: string) {
    // random salt for derivation
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2(environment.EncyptionKey, salt, {
        keySize: keySize / 32,
        iterations: 100
    });
    // random IV
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    // specify everything explicitly
    var encrypted = CryptoJS.AES.encrypt(value, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    // combine everything together in base64 string
    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
}