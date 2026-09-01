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

    renderBars(arr,{sortedFromIdx:arr.length, total:arr.length});
    setMsg('Array তৈরি হয়েছে! Sort শুরু করো 🎯');
    clearLog();
    logAdd('📋 Initial array: ['+arr.join(', ')+']','log-pass');

    document.getElementById('startBtn').disabled = false;
    document.getElementById('stepBtn').disabled  = false;
    document.getElementById('resetBtn').disabled = false;
  }

  /* ── Pre-compute every step ──
     Bubble sort pushes the largest remaining value to the right on each
     pass, so "sortedFromIdx" marks the index from which everything to the
     right (inclusive) is already in its final place. */
  function computeSteps(a){
    const list = [];
    const n = a.length;

    list.push({arr:[...a], cmp1:-1, cmp2:-1, swap1:-1, swap2:-1, sortedFromIdx:n,
      msg:'📋 Initial array: ['+a.join(', ')+'] — কোনো element এখনো sorted নয়',
      logType:'', logMsg:''});

    let sortedFromIdx = n;

    for(let i=0; i<n-1; i++){
      let swapped = false;
      const lastUnsorted = n-1-i; // index of last element still being bubbled this pass

      for(let j=0; j<lastUnsorted; j++){

        /* compare */
        list.push({arr:[...a], cmp1:j, cmp2:j+1, swap1:-1, swap2:-1, sortedFromIdx,
          msg:`🔍 <b>${a[j]}</b> (index ${j})  বনাম  <b>${a[j+1]}</b> (index ${j+1})`,
          logType:'log-compare', logMsg:`🔍 ${a[j]} vs ${a[j+1]}`});

        if(a[j] > a[j+1]){
          /* swap */
          [a[j], a[j+1]] = [a[j+1], a[j]];
          swapped = true;
          list.push({arr:[...a], cmp1:-1, cmp2:-1, swap1:j, swap2:j+1, sortedFromIdx,
            msg:`🔄  <b>${a[j]}</b>  ও  <b>${a[j+1]}</b>  অদল-বদল হলো (index ${j} ↔ ${j+1})`,
            logType:'log-swap', logMsg:`🔄 swap: index ${j} ↔ ${j+1}`});
        } else {
          list.push({arr:[...a], cmp1:-1, cmp2:-1, swap1:-1, swap2:-1, sortedFromIdx,
            msg:`✅ ঠিক ক্রমেই আছে — swap দরকার নেই`,
            logType:'', logMsg:''});
        }
      }

      sortedFromIdx = lastUnsorted; // index lastUnsorted now holds its final (largest remaining) value
      list.push({arr:[...a], cmp1:-1, cmp2:-1, swap1:-1, swap2:-1, sortedFromIdx,
        msg:`🏁 Pass ${i+1} শেষ — <b>${a[lastUnsorted]}</b>  index ${lastUnsorted}  তে স্থায়ী হলো ✓`,
        logType:'log-pass', logMsg:`🏁 Pass ${i+1} সম্পন্ন — index ${lastUnsorted} sorted`});

      if(!swapped){
        /* no swaps this pass → already fully sorted, stop early */
        sortedFromIdx = 0;
        break;
      }
    }

    /* done */
    list.push({arr:[...a], cmp1:-1, cmp2:-1, swap1:-1, swap2:-1, sortedFromIdx:0,
      msg:'🎉 Sorting সম্পন্ন!  Sorted array: ['+a.join(', ')+']',
      logType:'log-done', logMsg:'🎉 সম্পন্ন!  ['+a.join(', ')+']'});

    return list;
  }

  /* ── Apply one step ── */
  function applyStep(s){
    renderBars(s.arr,{
      cmp1: s.cmp1, cmp2: s.cmp2,
      swap1: s.swap1, swap2: s.swap2,
      sortedFromIdx: s.sortedFromIdx,
      total: s.arr.length
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

      const allSorted = state.sortedFromIdx === 0;

      if(allSorted){
        bar.classList.add('sorted');
      } else if(i===state.swap1 || i===state.swap2){
        bar.classList.add('swapping');
      } else if(i===state.cmp1 || i===state.cmp2){
        bar.classList.add('comparing');
      } else if(i >= (state.sortedFromIdx ?? state.total)){
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