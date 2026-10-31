const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const modes={
 app:{title:'AI App Designer',desc:'Turn your app idea into screens, features, user flows and a build plan.',placeholder:'Describe the app you want to design: audience, purpose, main features, platform...',eyebrow:'DESIGN YOUR NEXT APP'},
 image:{title:'Image Prompt Studio',desc:'Write detailed prompts for AI image generators. This tool creates a prompt, not an image file.',placeholder:'Example: cinematic futuristic city at night, neon blue and purple, wide angle...',eyebrow:'CREATE VISUAL IDEAS'},
 poster:{title:'Poster Maker',desc:'Create poster copy, layout direction, colors and a ready-to-use image prompt.',placeholder:'Example: HCL science exhibition poster for NOVA AI inventions...',eyebrow:'MAKE IT STAND OUT'},
 tutor:{title:'AI Study Assistant',desc:'Ask about school topics and get explanations with examples and a recap.',placeholder:'Example: Explain photosynthesis in simple words...',eyebrow:'LEARN WITH NOVA'},
 quiz:{title:'Quiz Center',desc:'Generate original multiple-choice questions and explanations for any subject.',placeholder:'Example: Class 6 science — electricity and magnets...',eyebrow:'TEST YOUR KNOWLEDGE'},
 knowledge:{title:'Knowledge Booster',desc:'Get GK challenges, fun facts, brain teasers and study tips.',placeholder:'Example: daily GK for a Class 6 student, with answers...',eyebrow:'GROW A LITTLE EVERY DAY'},
 invention:{title:'Innovation Lab',desc:'Turn a real-world problem into a safe, testable invention or school project.',placeholder:'Example: an IoT idea to reduce water waste at school...',eyebrow:'INVENT FOR THE REAL WORLD'},
 code:{title:'Code Generator',desc:'Plan a web app and get starter HTML, CSS and JavaScript code.',placeholder:'Example: create a responsive portfolio website with a quiz...',eyebrow:'BUILD WITH CODE'},
 flashcards:{title:'AI Flashcards',desc:'Generate question-and-answer cards for quick revision.',placeholder:'Example: Make Class 6 flashcards on electricity, magnets and circuits...',eyebrow:'REVISE SMARTER'},
 pitch:{title:'Project Pitch Builder',desc:'Prepare a science-expo abstract, presentation pitch, demo script and judging Q&A.',placeholder:'Example: Project NOVA — an AI learning and invention studio for students...',eyebrow:'PRESENT YOUR IDEA'},
 circuit:{title:'IoT & Circuit Lab',desc:'Plan a student-friendly sensor project with a component list, wiring overview and safe testing checklist.',placeholder:'Example: ESP32 with LDR, DHT11, ultrasonic sensor, buzzer and LEDs...',eyebrow:'TURN SENSORS INTO SOLUTIONS'},
 wireframe:{title:'UI Wireframe Planner',desc:'Plan app screens, navigation, component placement and user journeys before coding.',placeholder:'Example: Design a mobile dashboard for an AI study app...',eyebrow:'DESIGN THE EXPERIENCE'},
 robotics:{title:'AI Robotics Lab',desc:'Plan educational robots, sensors, control logic and safe simulations.',placeholder:'Example: ESP32 robot car with ultrasonic obstacle avoidance...',eyebrow:'BUILD INTELLIGENT MACHINES'},
 revolution:{title:'AI Revolution Explorer',desc:'Explore AI history, applications, opportunities and challenges.',placeholder:'Example: Explain how AI is changing education, jobs and daily life...',eyebrow:'UNDERSTAND THE AI REVOLUTION'},
 healthcare:{title:'AI in Healthcare',desc:'Explore health technology with privacy, evidence and human oversight.',placeholder:'Example: A school presentation about AI-assisted medical imaging...',eyebrow:'AI FOR HUMAN WELLBEING'},
 agriculture:{title:'AI in Agriculture',desc:'Plan smart farming concepts for crops, soil, weather and water.',placeholder:'Example: Smart irrigation idea using soil moisture readings...',eyebrow:'GROW SMARTER'},
 smartcity:{title:'Smart City Lab',desc:'Design responsible AI concepts for traffic, energy, waste and services.',placeholder:'Example: Simulate traffic signal timing using vehicle counts...',eyebrow:'DESIGN BETTER CITIES'},
 automation:{title:'Automation Studio',desc:'Map triggers, decisions, actions, approvals and failure handling.',placeholder:'Example: An automated school energy-saving workflow...',eyebrow:'MAKE WORKFLOWS SMARTER'},
 ethics:{title:'Responsible AI',desc:'Review privacy, fairness, safety, transparency and misinformation.',placeholder:'Example: Evaluate risks of AI cameras in public spaces...',eyebrow:'INNOVATE WITH CARE'},
 voice:{title:'Voice Assistant Planner',desc:'Plan a privacy-conscious voice assistant prototype.',placeholder:'Example: A voice-controlled study helper with user permission...',eyebrow:'SPEAK TO TECHNOLOGY'},
 research:{title:'AI Research Brief',desc:'Create a structured, student-friendly research brief and presentation outline.',placeholder:'Example: Generative AI in education: benefits, risks and examples...',eyebrow:'RESEARCH THE FUTURE'},
 all:{title:'All-in-One AI Builder',desc:'Plan a connected app that brings all NOVA tools together.',placeholder:'Describe your all-in-one app vision...',eyebrow:'UNIFY YOUR IDEAS'}
};
let activeMode='app',lastResult='';
function showHome(){ $$('.view').forEach(v=>v.classList.remove('active'));$('#home').classList.add('active');$$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.mode==='home'));$('#heading').innerHTML='Imagine it. Build it. <em>With NOVA.</em>'; }
function openMode(mode){
 if(mode==='home'){showHome();return;}
 if(mode==='planner' || mode==='notes' || mode==='focus'){ $$('.view').forEach(v=>v.classList.remove('active'));$('#'+mode).classList.add('active');$$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.mode===mode));$('#heading').textContent=mode==='planner'?'Make progress, one task at a time.':mode==='notes'?'Keep your best ideas close.':'Protect your focus.';return;}
 activeMode=modes[mode]?mode:'all';const m=modes[activeMode];
 $$('.view').forEach(v=>v.classList.remove('active'));$('#generator').classList.add('active');
 $$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.mode===activeMode));
 $('#heading').textContent=m.title;$('#tool-title').textContent=m.title;$('#tool-desc').textContent=m.desc;$('#tool-eyebrow').textContent=m.eyebrow;$('#prompt').placeholder=m.placeholder;
 $('#output').innerHTML='<div class="empty"><span>✧</span><b>Your idea goes here</b><p>Enter a prompt and press Generate to see your AI result.</p></div>';$('#copy').disabled=true;$('#result-foot').textContent='Ready when you are';lastResult='';
 window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>openMode(b.dataset.mode)));
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>openMode(b.dataset.open)));
$$('.example').forEach(b=>b.addEventListener('click',()=>{$('#prompt').value=b.textContent==='Student study app'?'Design a student study app with AI explanations, quizzes, Knowledge Booster, progress tracking and Innovation Lab.':b.textContent==='Neon science fair poster'?'Create a futuristic neon poster for Project NOVA: AI learning, creative image prompts and student inventions.':'Design a student-safe smart water-saving invention for a school science exhibition.';}));
$('#generate').addEventListener('click',async()=>{
 const prompt=$('#prompt').value.trim();if(!prompt){$('#prompt').focus();return;}
 const btn=$('#generate');btn.disabled=true;btn.textContent='Generating…';$('#output').textContent='NOVA is working on your request…';$('#copy').disabled=true;$('#result-foot').textContent='Generating';
 try{
  const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:activeMode,prompt,details:$('#details').value})});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed');lastResult=data.result;$('#output').textContent=lastResult;$('#copy').disabled=false;$('#result-foot').textContent='Generated by NOVA · Review important details before using.';
 }catch(e){$('#output').textContent='Could not generate with live AI. '+e.message+'\n\nYou can still use the app interface. To enable AI, run the Node server and add your API key to the private .env file. Never put the key in frontend JavaScript.';$('#result-foot').textContent='Setup required';}
 finally{btn.disabled=false;btn.textContent='Generate with NOVA ✦';}
});
$('#copy').addEventListener('click',async()=>{if(!lastResult)return;try{await navigator.clipboard.writeText(lastResult);$('#copy').textContent='Copied ✓';setTimeout(()=>$('#copy').textContent='Copy text',1300);}catch(e){$('#copy').textContent='Select and copy';}});
let tasks=JSON.parse(localStorage.getItem('nova_all_tasks')||'[]');
function saveTasks(){localStorage.setItem('nova_all_tasks',JSON.stringify(tasks));renderTasks();}
function renderTasks(){
 $('#tasks').innerHTML='';$('#task-count').textContent=tasks.length+' task'+(tasks.length===1?'':'s');
 if(!tasks.length){const p=document.createElement('p');p.className='small';p.textContent='No tasks yet — add a small learning goal above.';$('#tasks').append(p);return;}
 tasks.forEach(t=>{const row=document.createElement('div');row.className='task';const cb=document.createElement('input');cb.type='checkbox';cb.checked=t.done;cb.addEventListener('change',()=>{t.done=cb.checked;saveTasks();});const name=document.createElement('span');name.className='task-name'+(t.done?' done':'');name.textContent=t.name;const tag=document.createElement('span');tag.className='task-tag';tag.textContent=t.subject;const del=document.createElement('button');del.className='delete';del.textContent='×';del.setAttribute('aria-label','Delete task');del.addEventListener('click',()=>{tasks=tasks.filter(x=>x.id!==t.id);saveTasks();});row.append(cb,name,tag,del);$('#tasks').append(row);});
}
$('#task-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#task-input').value.trim();if(!name)return;tasks.unshift({id:Date.now(),name,subject:$('#task-subject').value,done:false});$('#task-input').value='';saveTasks();});
renderTasks();

// Notes Vault: local-only storage in this browser.
let notes = JSON.parse(localStorage.getItem('nova_notes_v1') || '[]');
function saveNotes(){ localStorage.setItem('nova_notes_v1', JSON.stringify(notes)); renderNotes(); }
function renderNotes(){
 const list=$('#notes-list'); if(!list) return; list.innerHTML='';
 $('#note-count').textContent=notes.length+' note'+(notes.length===1?'':'s');
 if(!notes.length){const p=document.createElement('p');p.className='small';p.textContent='Your saved notes will appear here.';list.append(p);return;}
 notes.forEach(n=>{
  const card=document.createElement('article');card.className='note-item';
  const head=document.createElement('div');head.className='note-item-head';
  const title=document.createElement('b');title.textContent=n.title;
  const tag=document.createElement('span');tag.className='task-tag';tag.textContent=n.category;
  const del=document.createElement('button');del.className='delete';del.textContent='×';del.setAttribute('aria-label','Delete note');del.addEventListener('click',()=>{notes=notes.filter(x=>x.id!==n.id);saveNotes();});
  const body=document.createElement('p');body.textContent=n.body;
  head.append(title,tag,del);card.append(head,body);list.append(card);
 });
}
$('#note-form')?.addEventListener('submit',e=>{
 e.preventDefault();const title=$('#note-title').value.trim(),body=$('#note-body').value.trim();if(!title||!body)return;
 notes.unshift({id:Date.now(),title,body,category:$('#note-category').value,created:new Date().toISOString()});
 $('#note-title').value='';$('#note-body').value='';saveNotes();
});
$('#export-notes')?.addEventListener('click',()=>{
 const blob=new Blob([JSON.stringify(notes,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='nova-notes-backup.json';a.click();URL.revokeObjectURL(url);
});
renderNotes();

// Focus timer with selectable sessions.
let timerSeconds=25*60, timerRemaining=timerSeconds, timerInterval=null;
function drawTimer(){const m=String(Math.floor(timerRemaining/60)).padStart(2,'0'),s=String(timerRemaining%60).padStart(2,'0');$('#timer-display').textContent=m+':'+s;}
function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}}
$$('[data-minutes]').forEach(b=>b.addEventListener('click',()=>{stopTimer();timerSeconds=Number(b.dataset.minutes)*60;timerRemaining=timerSeconds;drawTimer();$('#timer-status').textContent='Selected '+b.textContent+'. Ready when you are.';$('#timer-start').textContent='Start';}));
$('#timer-start')?.addEventListener('click',()=>{
 if(timerInterval){stopTimer();$('#timer-start').textContent='Resume';$('#timer-status').textContent='Paused — take your time.';return;}
 if(timerRemaining<=0){timerRemaining=timerSeconds;}
 $('#timer-start').textContent='Pause';$('#timer-status').textContent='You are in focus mode. One step at a time.';
 timerInterval=setInterval(()=>{timerRemaining--;drawTimer();if(timerRemaining<=0){stopTimer();$('#timer-start').textContent='Start again';$('#timer-status').textContent='Session complete! Take a stretch or water break.';}},1000);
});
$('#timer-reset')?.addEventListener('click',()=>{stopTimer();timerRemaining=timerSeconds;drawTimer();$('#timer-start').textContent='Start';$('#timer-status').textContent='Timer reset.';});
drawTimer();

