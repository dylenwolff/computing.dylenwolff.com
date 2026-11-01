# Computing classroom demos

Static classroom tool hub for computing.dylenwolff.com. Run npm start for local preview at http://localhost:4173; run npm test for cryptographic checks. Node.js 20+ is only needed for development. The deployed app has no application backend or database.

## Deployment
Publish index.html, style.css, app.js, crypto.js and hub.js to the HTTPS document root. The server checkout is /home/dylenaw/web/computing.dylenwolff.com/source; public files are in the sibling public_html folder. Keep Git metadata and private SSH keys outside public_html.

## Seven-step encryption lesson
1. Understand Alice and Bob's message journey and select a method.
2. Prepare keys; copy the decryption key for later.
3. Write the plaintext.
4. Encrypt using the displayed encryption key.
5. Copy/send the single encrypted code.
6. Supply a decryption key. The field starts empty; paste a saved key or explicitly load the matching/wrong demo key.
7. Reveal the decrypted message after successful decryption.

The encryption key is displayed on every slide. Launch stays in the ordinary browser window; no Fullscreen API is used. Back returns to the hub. The route is /#encryption.

## Cryptography
Symmetric: AES-256-GCM, fresh random 96-bit IV for each encryption. Asymmetric: RSA-OAEP, 2048-bit keys, SHA-256, 190 UTF-8 byte plaintext limit. Keys are shown in Base64 (raw shared key, SPKI public key, PKCS8 private key). Decryption imports the supplied key rather than silently using the generated key.

The encrypted code is one Base64 string containing a binary envelope: version byte 1, method byte (1=AES, 2=RSA), then the AES IV where applicable and ciphertext. It contains no secret key. Base64 is display encoding, not encryption. Earlier JSON packets are not compatible; re-encrypt old examples. The envelope keeps decryption information inside the copyable code without showing JSON to students.

All cryptography happens locally through Web Crypto. Keys and messages are not uploaded or persisted. Refreshing or switching methods clears the generated keys; a saved code can still be decrypted by pasting its matching saved key. Keys are intentionally exportable for teaching; this is not a production key manager. Google Fonts is used with local fallbacks.

A backend is only needed later for accounts, saved lessons, or synchronized classroom sessions. Encryption alone does not authenticate a sender. Real systems often combine asymmetric key establishment with symmetric encryption.

Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
