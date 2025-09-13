// ai.js - Lightweight AI helpers for personalization, anomaly detection, and auto-updates
(function(){
  // Personalization: rank products by category affinity and recency
  function rankProducts(products){
    const history = JSON.parse(localStorage.getItem('browsingHistory')||'[]');
    const viewsByCat = {};
    history.forEach(h => { viewsByCat[h.category] = (viewsByCat[h.category]||0) + 1; });
    const now = Date.now();
    return [...products].sort((a,b)=>score(b)-score(a));
    function score(p){
      const catScore = (viewsByCat[p.category]||0) * 2;
      const recent = history.find(h=>h.id===p.id);
      const recency = recent ? Math.max(0, 1 - ((now - recent.viewedAt||now)/ (7*24*3600*1000))) * 3 : 0;
      const rating = (p.rating||0) * 0.5;
      return catScore + recency + rating;
    }
  }

  // Anomaly detection: capture console errors and bad UI states
  const bugQueueKey = 'ai_bug_queue';
  const origError = console.error;
  console.error = function(){
    try{
      const entry = { time:new Date().toISOString(), args:[...arguments].map(String).slice(0,3) };
      const q = JSON.parse(localStorage.getItem(bugQueueKey)||'[]');
      q.push(entry); localStorage.setItem(bugQueueKey, JSON.stringify(q));
    }catch(e){}
    origError.apply(console, arguments);
  };
  function readBugQueue(){ return JSON.parse(localStorage.getItem(bugQueueKey)||'[]'); }
  function clearBugQueue(){ localStorage.removeItem(bugQueueKey); }

  // Auto-fix minor issues
  function autoFixUI(){
    document.querySelectorAll('img').forEach(img=>{
      img.addEventListener('error', ()=>{ img.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available'; });
    });
  }

  // PWA update check
  async function checkForUpdates(){
    if (!('serviceWorker' in navigator)) return;
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return;
    if (reg.waiting){ promptUpdate(reg); return; }
    reg.update();
    reg.addEventListener('updatefound', ()=>{
      const newWorker = reg.installing;
      newWorker && newWorker.addEventListener('statechange', ()=>{
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller){
          promptUpdate(reg);
        }
      });
    });
  }
  function promptUpdate(reg){
    const ok = confirm('A new version is available. Update now?');
    if (ok){ reg.waiting && reg.waiting.postMessage({ type: 'SKIP_WAITING' }); window.location.reload(); }
  }

  // Public API
  window.ai = { rankProducts, readBugQueue, clearBugQueue, autoFixUI, checkForUpdates };

  // Bootstrap
  document.addEventListener('DOMContentLoaded', ()=>{ autoFixUI(); checkForUpdates(); });
})();
