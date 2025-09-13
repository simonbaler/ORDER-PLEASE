// qa.js - Q&A and Media Reviews (demo persistence via localStorage)
(function(){
  function storageKey(id){ return `qa_media_${id}`; }
  function load(id){ return JSON.parse(localStorage.getItem(storageKey(id)) || '{"qa":[],"media":[]}'); }
  function save(id, data){ localStorage.setItem(storageKey(id), JSON.stringify(data)); }

  function submitQuestion(productId, name, question){
    const data = load(productId);
    data.qa.unshift({ type:'q', name, text: question, time: new Date().toISOString(), answers: [] });
    save(productId, data);
  }
  function submitAnswer(productId, index, name, answer){
    const data = load(productId);
    data.qa[index].answers = data.qa[index].answers || [];
    data.qa[index].answers.push({ name, text: answer, time: new Date().toISOString() });
    save(productId, data);
  }
  function submitMediaReview(productId, name, rating, text, dataUrl){
    const data = load(productId);
    data.media.unshift({ name, rating, text, dataUrl, time: new Date().toISOString() });
    save(productId, data);
  }

  function renderQA(containerId, productId){
    const container = document.getElementById(containerId);
    const data = load(productId);
    container.innerHTML = data.qa.map((item, idx) => `
      <div class='mb-3 p-3 bg-gray-100 rounded'>
        <div class='font-semibold mb-1'>Q: ${item.text} <span class='text-xs text-gray-500'>by ${item.name}</span></div>
        ${(item.answers||[]).map(a => `<div class='pl-3 text-gray-700 mb-1'>A: ${a.text} <span class='text-xs text-gray-400'>— ${a.name}</span></div>`).join('')}
        <div class='flex gap-2 mt-2'>
          <input id='ans_${idx}' placeholder='Write an answer' class='border rounded px-2 py-1 flex-1'/>
          <button class='bg-pink-600 text-white px-3 rounded' onclick='answerQA(${productId}, ${idx})'>Answer</button>
        </div>
      </div>
    `).join('') || '<div class="text-gray-500">No questions yet. Be the first to ask.</div>';
  }

  function renderMedia(containerId, productId){
    const container = document.getElementById(containerId);
    const data = load(productId);
    container.innerHTML = data.media.map(m => `
      <div class='mb-3 p-3 bg-gray-100 rounded'>
        <div class='flex items-center mb-1'><div class='text-yellow-500 mr-2'>${'★'.repeat(m.rating)}${'☆'.repeat(5 - m.rating)}</div><div class='font-semibold'>${m.name}</div></div>
        <div class='text-gray-700 mb-2'>${m.text}</div>
        ${m.dataUrl ? `<img src='${m.dataUrl}' class='w-full max-h-48 object-cover rounded'/>` : ''}
      </div>
    `).join('') || '<div class="text-gray-500">No media reviews yet.</div>';
  }

  window.askQuestion = function(productId){
    const name = (JSON.parse(localStorage.getItem('user')||'{}').name)||'You';
    const q = document.getElementById('qa_question').value.trim();
    if(!q) return;
    submitQuestion(productId, name, q);
    document.getElementById('qa_question').value='';
    renderQA('qa_list', productId);
  };
  window.answerQA = function(productId, idx){
    const name = (JSON.parse(localStorage.getItem('user')||'{}').name)||'You';
    const ans = document.getElementById(`ans_${idx}`).value.trim();
    if(!ans) return;
    submitAnswer(productId, idx, name, ans);
    renderQA('qa_list', productId);
  };
  window.submitMedia = function(productId){
    const name = (JSON.parse(localStorage.getItem('user')||'{}').name)||'You';
    const rating = parseInt(document.getElementById('media_rating').value)||5;
    const text = document.getElementById('media_text').value.trim();
    const file = document.getElementById('media_file').files[0];
    if(!text && !file) return;
    if(file){
      const reader = new FileReader();
      reader.onload = () => { submitMediaReview(productId, name, rating, text, reader.result); renderMedia('media_list', productId); };
      reader.readAsDataURL(file);
    } else {
      submitMediaReview(productId, name, rating, text, '');
      renderMedia('media_list', productId);
    }
    document.getElementById('media_text').value='';
    document.getElementById('media_file').value='';
  };

  window.renderQA = renderQA;
  window.renderMedia = renderMedia;
})();
