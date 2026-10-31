require('dotenv').config();
const express=require('express');
const path=require('path');
const app=express();
const PORT=Number(process.env.PORT||3000);
app.use(express.json({limit:'30kb'}));
app.use(express.static(path.join(__dirname,'public')));

const system=`You are NOVA, a helpful, safe AI studio for students and creators. Give practical, age-appropriate, original answers. Never claim you generated an image file if you only wrote an image prompt. For code, provide runnable, clearly labelled code and explain where it goes. Do not request personal or sensitive information.`;
async function askAI(input, max=1200){
  if(!process.env.OPENAI_API_KEY){const e=new Error('AI is not configured. Copy .env.example to .env and add your API key.');e.status=503;throw e;}
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',instructions:system,input,max_output_tokens:max})});
  const data=await r.json();
  if(!r.ok){const e=new Error(data.error?.message||'AI provider request failed');e.status=502;throw e;}
  const answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n').trim();
  if(!answer)throw new Error('AI returned no text.');
  return answer;
}
app.post('/api/generate',async(req,res)=>{
  const {mode,prompt,details}=req.body||{};
  if(typeof prompt!=='string'||!prompt.trim()||prompt.length>6000)return res.status(400).json({error:'Enter a prompt up to 6,000 characters.'});
  const tasks={
    tutor:'Explain this learning question clearly. Include an example and a short recap.',
    app:'Act as a senior app designer and developer. Create an app concept for the request. Include name, target users, problem, key features, screen-by-screen UI plan, visual style, tech stack, data model, accessibility, safety, and a step-by-step MVP roadmap. If code is requested, include starter code.',
    image:'Create a detailed original image-generation prompt for an image model. Include subject, composition, lighting, palette, camera/art style, background, aspect ratio, and a negative prompt. Clearly label it as a prompt, not a generated image file.',
    poster:'Create a polished poster concept and exact poster copy. Include headline, subheading, key points, call to action, layout, palette, typography, and an image-generation prompt.',
    invention:'Create a student-safe invention/project plan: title, problem, solution, components, how it works, build stages, testing, expected impact, and demo script. Avoid unsafe electrical or chemical instructions.',
    knowledge:'Create a Knowledge Booster set: 5 age-appropriate general-knowledge questions with four options each, mark the correct answer after each question, add one fun fact and one study tip.',
    quiz:'Create 5 original quiz questions on the requested subject, each with four options, answers and brief explanations.',
    code:'Design a practical web app solution. Return a file/folder structure, then clearly labelled starter code for HTML, CSS and JavaScript. Explain how to run it.',
    flashcards:'Create 12 concise study flashcards. Format each as FRONT: question or term, BACK: answer or definition. End with a 5-point quick revision summary.',
    pitch:'Create a student science-fair pitch pack: project title, 100-word abstract, problem, solution, novelty, components, workflow, benefits, limitations, 60-second pitch, demo script and 5 likely judge questions with answers. Keep claims realistic.',
    circuit:'Create a student-safe IoT project plan with objective, component list, role of each component, high-level connection table, logic flow, sample pseudocode, calibration, testing checklist and troubleshooting. For mains electricity, high voltage, batteries, motors or soldering, advise adult supervision and avoid unsafe step-by-step instructions.',
    wireframe:'Create a screen-by-screen UI wireframe specification. For each screen list layout zones from top to bottom, components, button labels, navigation, empty/loading/error states, accessibility notes and a user journey. Use text wireframes where helpful.',
    robotics:'Act as an educational AI robotics mentor. Create a safe robotics plan with purpose, system architecture, sensors, actuators, controller choices, data flow, simulation steps, testing, accessibility, limitations and adult-supervision notes. Never provide dangerous high-voltage or weaponized robot instructions.',
    revolution:'Explain the AI Revolution for a student project: key technologies, timeline, real-world use cases, benefits, limitations, responsible AI, privacy, bias, misinformation, jobs and future possibilities. Distinguish current capabilities from speculation.',
    healthcare:'Explain responsible AI uses in healthcare, examples, benefits, limits, privacy concerns, human oversight and a student-friendly demonstration idea. Do not diagnose or replace medical professionals.',
    agriculture:'Design a student-safe AI agriculture concept covering soil/weather sensing, crop monitoring, water conservation, data flow, testing, limits and environmental impact.',
    smartcity:'Design an AI smart-city concept covering traffic, energy, waste, public services, accessibility, privacy safeguards, evaluation metrics and a safe demo simulation.',
    automation:'Plan a safe AI automation workflow with trigger, input data, decision logic, action, human approval points, failure handling and testing checklist.',
    ethics:'Create an AI responsibility review covering privacy, consent, fairness, explainability, safety, misinformation, copyright, security and a practical checklist.',
    voice:'Design a privacy-conscious voice assistant prototype: speech input, transcription, intent detection, response generation, optional speech output, permissions, error handling and accessibility.',
    research:'Create a structured research brief on the requested AI topic with overview, current applications, evidence to verify, benefits, limitations, risks, glossary and presentation outline. Clearly flag claims that need citations.',
    all:'Create a unified product plan combining AI study assistant, image-prompt studio, poster maker, app designer, quiz centre, Knowledge Booster, study planner and Innovation Lab. Explain shared navigation, data, user flow, MVP features, and a phased build plan.'
  };
  const modeKey=tasks[mode]?mode:'all';
  try{const result=await askAI(`${tasks[modeKey]}\n\nUser request: ${prompt.trim()}\nAdditional details: ${typeof details==='string'?details.slice(0,1500):'None'}`,1500);res.json({result,mode:modeKey});}
  catch(e){res.status(e.status||500).json({error:e.status===503?e.message:'AI generation failed. Check server logs and try again.'});}
});
app.get('/api/health',(_req,res)=>res.json({status:'ok',aiConfigured:Boolean(process.env.OPENAI_API_KEY)}));
app.get('*',(_req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log(`NOVA All-in-One Studio: http://localhost:${PORT}`));