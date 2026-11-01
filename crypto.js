export const b64 = value => btoa(String.fromCharCode(...new Uint8Array(value)));
export const unb64 = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
export async function makeKeys(mode) {
  return mode === 'symmetric' ? crypto.subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt','decrypt']) : crypto.subtle.generateKey({name:'RSA-OAEP',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['encrypt','decrypt']);
}
export async function seal(mode, keys, message) {
  const bytes = new TextEncoder().encode(message);
  if (!bytes.length) throw new Error('Write a message first.');
  if (bytes.length > (mode === 'asymmetric' ? 190 : 8000)) throw new Error(mode === 'asymmetric' ? 'RSA in this lab accepts up to 190 UTF-8 bytes. Shorten your message.' : 'Keep your classroom message under 8,000 UTF-8 bytes.');
  const iv = mode === 'symmetric' ? crypto.getRandomValues(new Uint8Array(12)) : undefined;
  const data = await crypto.subtle.encrypt(iv ? {name:'AES-GCM',iv} : {name:'RSA-OAEP'}, mode === 'symmetric' ? keys : keys.publicKey, bytes);
  return JSON.stringify({v:1,mode,...(iv ? {iv:b64(iv)} : {}),data:b64(data)},null,2);
}
export async function open(mode, keys, packet) {
  let parsed;
  try { parsed = JSON.parse(packet); } catch { throw new Error('Paste a complete encrypted JSON packet from this lab.'); }
  if (parsed.v !== 1 || parsed.mode !== mode || typeof parsed.data !== 'string') throw new Error('This packet does not match the selected encryption method.');
  const params = mode === 'symmetric' ? {name:'AES-GCM',iv:unb64(parsed.iv)} : {name:'RSA-OAEP'};
  const plain = await crypto.subtle.decrypt(params,mode === 'symmetric' ? keys : keys.privateKey,unb64(parsed.data));
  return new TextDecoder('utf-8',{fatal:true}).decode(plain);
}
