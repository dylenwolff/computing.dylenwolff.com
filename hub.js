const hub=document.getElementById('hub'),demo=document.getElementById('demo');
const back=document.getElementById('back'),launch=document.getElementById('launch'),full=document.getElementById('fullscreen');
let step=0;
const panels=[...document.querySelectorAll('.workspace > .panel')];
const names=['Create the keys','Write the message','Encrypt & decrypt'];
function showStep(next){step=Math.max(0,Math.min(2,next));panels.forEach((panel,i)=>panel.hidden=i!==step);document.getElementById('step-label').textContent=`${step+1} / 3 · ${names[step]}`;document.getElementById('previous-step').disabled=step===0;document.getElementById('next-step').disabled=step===2;}
async function enterFullscreen(){if(!document.fullscreenElement){try{await document.documentElement.requestFullscreen();}catch{/* Focused view remains available when fullscreen is unavailable. */}}}
function route(){const active=location.hash==='#encryption';hub.hidden=active;demo.hidden=!active;document.title=active?'Encryption Demo · Computing':'Computing · Classroom Demos';if(active){showStep(0);back.focus();}else{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});launch.focus();}window.scrollTo(0,0);}
launch.onclick=()=>{location.hash='encryption';enterFullscreen();};
back.onclick=()=>{location.hash='';};
full.onclick=()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else enterFullscreen();};
document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement?'Exit full screen':'Enter full screen';});
document.getElementById('previous-step').onclick=()=>showStep(step-1);
document.getElementById('next-step').onclick=()=>showStep(step+1);
window.addEventListener('hashchange',route);
route();
document.addEventListener('cipher-encrypted',()=>showStep(2));
