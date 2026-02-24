(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const u={},c=u?.VITE_API_BASE??"http://localhost:8787",p=document.getElementById("app");if(!p)throw new Error("no root");const f=p;let i="",a=0;async function m(){const t=await(await fetch(`${c}/session/init`,{method:"POST"})).json();i=t.sessionId,a=t.balance,d("Session initialized")}async function b(){const t=await(await fetch(`${c}/spin`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:i,bet:5})})).json();t.ok&&(a=t.balance,d(`Spin done. Stops: ${t.stops.join(", ")} Matrix mid: ${t.matrix.map(s=>s[1]).join(" | ")}`))}function d(o){f.innerHTML=`
    <h1>Slot Client-Server Prototype</h1>
    <p><b>API:</b> ${c}</p>
    <p><b>Session:</b> ${i||"-"}</p>
    <p><b>Balance:</b> ${a}</p>
    <p>${o}</p>
    <button id="init">Init Session</button>
    <button id="spin" ${i?"":"disabled"}>Spin (bet=5)</button>
  `,document.getElementById("init")?.addEventListener("click",()=>{m()}),document.getElementById("spin")?.addEventListener("click",()=>{b()})}d("Ready");
