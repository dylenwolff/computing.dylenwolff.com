import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeKeys,seal,open,unb64,b64} from './crypto.js';
for(const mode of ['symmetric','asymmetric']){
 test(`${mode}: round trip, randomness, wrong key and tamper rejection`,async()=>{
 const keys=await makeKeys(mode),wrong=await makeKeys(mode),message='Hello students! 🔐 ආයුබෝවන්';
 const packet=await seal(mode,keys,message);
 assert.equal(await open(mode,keys,packet),message);
 assert.notEqual(await seal(mode,keys,message),packet);
 await assert.rejects(open(mode,wrong,packet));
 const altered=JSON.parse(packet),data=unb64(altered.data);data[0]^=1;altered.data=b64(data);
 await assert.rejects(open(mode,keys,JSON.stringify(altered)));
 await assert.rejects(open(mode,keys,'invalid'));
 await assert.rejects(open(mode,keys,JSON.stringify({...JSON.parse(packet),mode:'other'})));
 await assert.rejects(seal(mode,keys,''));
 });
}
test('RSA enforces UTF-8 byte limit',async()=>{const k=await makeKeys('asymmetric');assert.equal(await open('asymmetric',k,await seal('asymmetric',k,'a'.repeat(190))),'a'.repeat(190));await assert.rejects(seal('asymmetric',k,'a'.repeat(191)));await assert.rejects(seal('asymmetric',k,'🔐'.repeat(48)));});

