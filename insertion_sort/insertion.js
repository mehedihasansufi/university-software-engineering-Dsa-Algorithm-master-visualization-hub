
  /* ── State ── */
  let arr = [], steps = [], stepIdx = 0;
  let autoTimer = null, isRunning = false;

  const SPEEDS       = {1:1500, 2:950, 3:570, 4:310, 5:150};
  const SPEED_LABELS = {1:'ধীর', 2:'মোটামুটি', 3:'Normal', 4:'দ্রুত', 5:'খুব দ্রুত'};

  /* ── Speed label ── */
  document.getElementById('speedInput').addEventListener('input', function(){
    document.getElementById('speedLabel').textContent = SPEED_LABELS[this.value];
  });

  /* ── Mobile menu ── */
  document.getElementById('menuBtn').addEventListener('click', ()=>{
    document.getElementById('navLinks').classList.toggle('show-menu');
  });

  /* ── Build Array ── */
  function buildArray(){
    stopAuto();
    const size = parseInt(document.getElementById('sizeInput').value);
    if(isNaN(size)||size<2||size>10){ alert('Array size ২ থেকে ১০ এর মধ্যে দাও!'); return; }

    const raw = document.getElementById('valInput').value.trim();
    let values = [];

    if(raw === ''){
      for(let i=0;i<size;i++) values.push(Math.floor(Math.random()*89)+10);
    } else {
      values = raw.split(',').map(v=>parseInt(v.trim())).filter(v=>!isNaN(v));
      if(values.length !== size){
        alert(`Size দিয়েছ ${size} কিন্তু value দিয়েছ ${values.length}টি — মিলিয়ে দাও!`);
        return;
      }
      for(let v of values){
        if(v<1||v>999){ alert('Values ১–৯৯৯ এর মধ্যে দাও!'); return; }
      }
    }

    arr = [...values];
    steps = computeSteps([...arr]);
    stepIdx = 0; isRunning = false;

    renderBars(arr,{sortedUpto:0});
    setMsg('Array তৈরি হয়েছে! Sort শুরু করো 🎯');
    clearLog();
    logAdd('📋 Initial array: ['+arr.join(', ')+']','log-key');

    document.getElementById('startBtn').disabled = false;
    document.getElementById('stepBtn').disabled  = false;
    document.getElementById('resetBtn').disabled = false;
  }

  /* ── Pre-compute every step ── */
  function computeSteps(a){
    const list = [];
    const n = a.length;

    list.push({arr:[...a], keyIdx:-1, cmpIdx:-1, sortedUpto:1, insertIdx:-1,
      msg:'📋 Initial array: ['+a.join(', ')+'] — Index 0 ইতিমধ্যে sorted ধরা হয়',
      logType:'', logMsg:''});

    for(let i=1;i<n;i++){
      const key = a[i];

      /* pick key */
      list.push({arr:[...a], keyIdx:i, cmpIdx:-1, sortedUpto:i, insertIdx:-1,
        msg:`🔑 key = <b>${key}</b>  (index ${i})  — এই element টি সঠিক জায়গায় বসাতে হবে`,
        logType:'log-key', logMsg:`🔑 key = ${key}  (index ${i})`});

      let j = i-1;
      let placed = false;

      while(j>=0 && a[j]>key){

        /* compare */
        list.push({arr:[...a], keyIdx:i, cmpIdx:j, sortedUpto:i, insertIdx:-1,
          msg:`🔍 <b>${a[j]}</b> (index ${j})  >  <b>${key}</b> — ডানে সরাতে হবে`,
          logType:'log-compare', logMsg:`🔍 ${a[j]} > ${key} → shift right`});

        /* shift */
        a[j+1] = a[j];
        list.push({arr:[...a], keyIdx:-1, cmpIdx:j, sortedUpto:i, insertIdx:j+1,
          msg:`↔️  <b>${a[j+1]}</b>  কে  index ${j}  →  index ${j+1}  তে সরানো হলো`,
          logType:'log-shift', logMsg:`↔️  ${a[j+1]} → index ${j+1}`});

        j--;
        placed = true;
      }

      if(!placed){
        /* already in place */
        list.push({arr:[...a], keyIdx:i, cmpIdx:j>=0?j:-1, sortedUpto:i, insertIdx:-1,
          msg:`✅ <b>${key}</b> ইতিমধ্যে সঠিক অবস্থানে — কোনো shift দরকার নেই`,
          logType:'log-insert', logMsg:`✅ ${key} — no shift needed`});
      }

      /* insert key */
      a[j+1] = key;
      list.push({arr:[...a], keyIdx:-1, cmpIdx:-1, sortedUpto:i+1, insertIdx:j+1,
        msg:`📍 <b>${key}</b>  index <b>${j+1}</b>  তে স্থাপিত হলো ✓`,
        logType:'log-insert', logMsg:`📍 ${key} → index ${j+1} তে বসলো`});
    }

    /* done */
    list.push({arr:[...a], keyIdx:-1, cmpIdx:-1, sortedUpto:n, insertIdx:-1,
      msg:'🎉 Sorting সম্পন্ন!  Sorted array: ['+a.join(', ')+']',
      logType:'log-done', logMsg:'🎉 সম্পন্ন!  ['+a.join(', ')+']'});

    return list;
  }

  /* ── Apply one step ── */
  function applyStep(s){
    renderBars(s.arr,{
      keyIdx:    s.keyIdx,
      cmpIdx:    s.cmpIdx,
      sortedUpto:s.sortedUpto,
      insertIdx: s.insertIdx,
      total:     s.arr.length
    });
    setMsg(s.msg);
    if(s.logMsg) logAdd(s.logMsg, s.logType||'');
  }

  /* ── Step button ── */
  function stepSort(){
    if(stepIdx>=steps.length) return;
    applyStep(steps[stepIdx]); stepIdx++;
    checkDone();
  }

  /* ── Auto toggle ── */
  function toggleAuto(){
    if(isRunning){ stopAuto(); return; }
    if(stepIdx>=steps.length) return;
    isRunning = true;
    document.getElementById('playIcon').className  = 'fa fa-pause';
    document.getElementById('startLabel').textContent = 'Pause';
    document.getElementById('stepBtn').disabled = true;

    const speed = SPEEDS[document.getElementById('speedInput').value]||570;
    function tick(){
      if(stepIdx>=steps.length){ stopAuto(); checkDone(); return; }
      applyStep(steps[stepIdx]); stepIdx++;
      autoTimer = setTimeout(tick, speed);
    }
    tick();
  }

  function stopAuto(){
    clearTimeout(autoTimer); isRunning = false;
    document.getElementById('playIcon').className  = 'fa fa-play';
    document.getElementById('startLabel').textContent = 'Auto Sort';
    if(stepIdx<steps.length) document.getElementById('stepBtn').disabled = false;
  }

  function checkDone(){
    if(stepIdx>=steps.length){
      document.getElementById('startBtn').disabled = true;
      document.getElementById('stepBtn').disabled  = true;
    }
  }

  /* ── Reset ── */
  function resetAll(){
    stopAuto();
    arr=[]; steps=[]; stepIdx=0;
    document.getElementById('barsArea').innerHTML =
      '<div style="color:#A2A4A0;font-size:.92rem;margin:auto;">⬆ আগে Array তৈরি করো</div>';
    setMsg('Array তৈরি করে Sort শুরু করো 🚀');
    clearLog();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stepBtn').disabled  = true;
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('valInput').value = '';
    document.getElementById('sizeInput').value = '6';
  }

  /* ── Render bars ── */
  function renderBars(a, state={}){
    const area = document.getElementById('barsArea');
    area.innerHTML = '';
    const maxVal = Math.max(...a,1);
    const n = a.length;
    /* dynamic bar width */
    const bw = Math.max(28, Math.min(60, Math.floor(720/n)-12));

    a.forEach((val,i)=>{
      const wrap = document.createElement('div');
      wrap.className = 'bar-wrap';

      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.width  = bw+'px';
      const h = Math.max(10, Math.round((val/maxVal)*175));
      bar.style.height = h+'px';

      const allSorted = state.sortedUpto === state.total;

      if(allSorted){
        bar.classList.add('sorted');
      } else if(i===state.insertIdx){
        bar.classList.add('inserting');
      } else if(i===state.keyIdx){
        bar.classList.add('key-bar');
      } else if(i===state.cmpIdx){
        bar.classList.add('comparing');
      } else if(i < (state.sortedUpto||0)){
        bar.classList.add('sorted');
      }

      const lbl = document.createElement('div');
      lbl.className = 'bar-label';
      lbl.textContent = val;

      const idx = document.createElement('div');
      idx.className = 'bar-index';
      idx.textContent = i;

      wrap.appendChild(bar);
      wrap.appendChild(lbl);
      wrap.appendChild(idx);
      area.appendChild(wrap);
    });
  }

  /* ── Log ── */
  function logAdd(msg,cls){
    const box = document.getElementById('logBox');
    const e = document.createElement('div');
    e.className = 'log-entry '+(cls||'');
    e.textContent = msg;
    box.appendChild(e);
    box.scrollTop = box.scrollHeight;
  }
  function clearLog(){
    document.getElementById('logBox').innerHTML='';
  }
  function setMsg(html){
    document.getElementById('stepMsg').innerHTML = html;
  }
