// search.js - Voice Search and Barcode Scanning utilities

(function(){
  function attachVoiceSearch(inputId, triggerId){
    const input = document.getElementById(inputId);
    const trigger = document.getElementById(triggerId);
    if(!input || !trigger) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
      trigger.disabled = true;
      trigger.title = 'Voice search not supported on this browser';
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    trigger.addEventListener('click', () => {
      rec.start();
      trigger.classList.add('animate-bounce-in');
      setTimeout(()=>trigger.classList.remove('animate-bounce-in'), 800);
    });
    rec.addEventListener('result', (e) => {
      const transcript = e.results[0][0].transcript;
      input.value = transcript;
      input.dispatchEvent(new Event('input'));
    });
  }

  // Barcode scanning using BarcodeDetector (Chrome/Edge) with fallback message
  async function startBarcodeScan(videoId, resultCallback){
    const video = document.getElementById(videoId);
    if(!video) return { stop: ()=>{} };
    const constraints = { video: { facingMode: 'environment' } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints).catch(()=>null);
    if(!stream){
      alert('Camera permission denied or unavailable.');
      return { stop: ()=>{} };
    }
    video.srcObject = stream;
    await video.play();

    let detector = null;
    if('BarcodeDetector' in window){
      const formats = ['qr_code','ean_13','code_128','upc_a','upc_e'];
      detector = new BarcodeDetector({ formats });
    }

    let stopped = false;
    async function tick(){
      if(stopped) return;
      try{
        if(detector){
          const codes = await detector.detect(video);
          if(codes && codes.length){
            const raw = codes[0].rawValue;
            resultCallback && resultCallback(raw);
            stop();
            return;
          }
        }
      }catch(err){/* ignore loop errors */}
      requestAnimationFrame(tick);
    }
    tick();

    function stop(){
      stopped = true;
      if(stream){ stream.getTracks().forEach(t=>t.stop()); }
      if(video){ video.pause(); video.srcObject = null; }
    }
    return { stop };
  }

  window.attachVoiceSearch = attachVoiceSearch;
  window.startBarcodeScan = startBarcodeScan;
})();
