const hub=document.getElementById('hub'),demo=document.getElementById('demo');
const back=document.getElementById('back'),launch=document.getElementById('launch');
let step=0;
const panels=[...document.querySelectorAll('.workspace > .panel')];
const names=['Understand the journey','Prepare the keys','Write the plaintext','Encrypt the message','Send the encrypted code','Enter the decryption key','Reveal the message'];
function showStep(next){step=Math.max(0,Math.min(panels.length-1,next));panels.forEach((panel,i)=>panel.hidden=i!==step);document.getElementById('step-label').textContent=`${step+1} / ${panels.length} · ${names[step]}`;document.getElementById('previous-step').disabled=step===0;document.getElementById('next-step').disabled=step===panels.length-1;document.getElementById('message-preview').textContent=document.getElementById('message').value||'Write a message in the previous step.';}
function route(){const active=location.hash==='#encryption';hub.hidden=active;demo.hidden=!active;document.title=active?'Encryption Demo · Computing':'Computing · Classroom Demos';if(active){showStep(0);back.focus();}else launch.focus();window.scrollTo(0,0);}
launch.onclick=()=>{location.hash='encryption';};back.onclick=()=>{location.hash='';};
document.getElementById('previous-step').onclick=()=>showStep(step-1);
document.getElementById('next-step').onclick=()=>showStep(step+1);
document.getElementById('restart').onclick=()=>showStep(0);
window.addEventListener('hashchange',route);
document.addEventListener('cipher-encrypted',()=>showStep(4));
document.addEventListener('cipher-decrypted',()=>showStep(6));
document.addEventListener('cipher-mode-changed',()=>showStep(0));
route();
