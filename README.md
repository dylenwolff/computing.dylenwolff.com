# Cipher Lab

Classroom encryption demo for computing.dylenwolff.com.

## Local use
Run npm start and open http://localhost:4173. Run npm test to check encryption round trips, randomization, wrong keys, tampering, and RSA message limits. Requires Node.js 20 or later. No dependencies or build step.

## Hosting
Publish index.html, style.css, app.js, and crypto.js on an HTTPS static host. For Git-integrated hosting use branch main, no build command, and the repository root as the publish directory. Add computing.dylenwolff.com in your host's domain settings and follow its DNS instructions. Pushing to GitHub does not itself configure hosting or DNS.

## Classroom use
Compare one shared AES-256-GCM key with a public/private RSA-OAEP key pair. Encrypt and decrypt a message, encrypt it again to observe randomness, try a wrong key, and tamper with the ciphertext. Switching modes or refreshing clears keys. Generating a new key prevents decrypting earlier packets in this tab.

RSA uses 2048-bit keys and SHA-256; messages are limited to 190 UTF-8 bytes. AES-GCM uses a new random 96-bit IV each time. Base64 encodes bytes for display; it is not encryption. Real systems often combine asymmetric key establishment with symmetric data encryption. Encryption alone does not authenticate the sender.

All encryption happens locally through Web Crypto. No messages or keys are uploaded or saved. Fonts load from Google Fonts with local fallbacks. Keys are exportable for teaching; this is a learning tool, not a production key manager.

## SSH deploy key
The separate SSH deployment key is unrelated to the demo encryption keys. Add its public .pub half to this repository under Settings > Deploy keys, with read-only access. Install the private half only on your hosting machine. Never commit it. Clone using git@github.com:dylenwolff/computing.dylenwolff.com.git. This key enables repository access, not website hosting or DNS.

Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
