/* ══════════════════════════════════════════════
   CYBERVAULT PRO — ANALYTICS.JS
══════════════════════════════════════════════ */
let analyticsReady = false;

window.renderAnalytics = async function() {
  if (!window.CV_USER) return;
  if (analyticsReady) { await refreshAnalytics(); return; }
  analyticsReady = true;
  await refreshAnalytics();
};

async function refreshAnalytics() {
  const uid = CV_USER.uid;
  const stats = FS.getStats(uid);
  const [pwScans, urlScans, bookmarks] = await Promise.all([
    FS.getRecords(uid,'pw_scans',50), FS.getRecords(uid,'url_scans',50), FS.getRecords(uid,'bookmarks',100)
  ]);
  buildAnalyticsUI(stats, pwScans, urlScans, bookmarks);
}

function buildAnalyticsUI(stats, pwScans, urlScans, bookmarks) {
  const el = document.getElementById('analyticsBody'); if (!el) return;
  const pwCount   = stats.pw_check   || pwScans.length  || 0;
  const urlCount  = stats.url_scan   || urlScans.length || 0;
  const aiViews   = stats.ai_view    || 0;
  const bmCount   = stats.bookmark   || bookmarks.length|| 0;
  const cvViews   = stats.course_view|| 0;
  const nvViews   = stats.news_view  || 0;
  const total     = stats.total      || 0;
  const joined    = CV_USER.createdAt ? new Date(CV_USER.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Today';
  const daily     = stats.daily || {};
  const last7     = getLast7Days();
  const dailyVals = last7.map(d => daily[d] || 0);
  const maxDaily  = Math.max(...dailyVals, 1);
  const dangerous  = urlScans.filter(s=>s.danger).length;
  const suspicious = urlScans.filter(s=>s.suspicious).length;
  const safe       = urlCount - dangerous - suspicious;
  const pwS = { weak:0,fair:0,strong:0,vstrong:0 };
  pwScans.forEach(s=>{ if(pwS[s.strength]!==undefined) pwS[s.strength]++; });

  el.innerHTML = `
    <div class="an-stats-grid">
      ${sc('⚡','Total Actions',    total,    'var(--accent)',  '+'+total+' lifetime')}
      ${sc('🔐','Passwords Checked',pwCount,  '#10b981',       dangerous+' threats found')}
      ${sc('🕵️','URLs Scanned',     urlCount, '#f59e0b',       dangerous+' dangers')}
      ${sc('🤖','AI Tools Viewed',    aiViews,  '#a78bfa',       bmCount+' bookmarked')}
      ${sc('📚','Resources Explored', cvViews,  '#60a5fa',       '30+ curated tools')}
      ${sc('📅','Member Since',       joined,   '#f87171',       CV_USER.role||'user')}
    </div>

    <div class="an-charts-row">
      <div class="an-chart-card">
        <div class="an-chart-title"><span>📊 ACTIVITY — LAST 7 DAYS</span><span class="an-chart-sub">actions/day</span></div>
        <div class="an-bar-chart">
          ${last7.map((d,i)=>{const v=dailyVals[i];const pct=maxDaily>0?(v/maxDaily)*100:0;const day=new Date(d).toLocaleDateString('en',{weekday:'short'});return`<div class="an-bar-col"><div class="an-bar-val">${v||''}</div><div class="an-bar-wrap"><div class="an-bar-fill" style="height:${pct}%;background:linear-gradient(to top,var(--accent),var(--accent2))"></div></div><div class="an-bar-label">${day}</div></div>`;}).join('')}
        </div>
      </div>
      <div class="an-chart-card">
        <div class="an-chart-title"><span>🕵️ URL SCAN RESULTS</span></div>
        ${urlCount>0?donut([{label:'Safe',val:safe,color:'#10b981'},{label:'Suspicious',val:suspicious,color:'#f59e0b'},{label:'Dangerous',val:dangerous,color:'#ef4444'}],urlCount):emptyC('No URL scans yet')}
      </div>
      <div class="an-chart-card">
        <div class="an-chart-title"><span>🔐 PASSWORD STRENGTH</span></div>
        ${pwCount>0?donut([{label:'Very Strong',val:pwS.vstrong,color:'#00d4ff'},{label:'Strong',val:pwS.strong,color:'#10b981'},{label:'Fair',val:pwS.fair,color:'#f59e0b'},{label:'Weak',val:pwS.weak,color:'#ef4444'}],pwCount):emptyC('No pw checks yet')}
      </div>
    </div>

    <div class="an-section">
      <div class="an-section-title">🔐 RECENT PASSWORD SCANS</div>
      ${pwScans.length>0?`<div class="an-table"><div class="an-table-head"><span>PASSWORD</span><span>STRENGTH</span><span>ENTROPY</span><span>DATE</span></div>${pwScans.slice(0,10).map(s=>`<div class="an-table-row"><span class="an-mono">${maskPw(s.pw||'●●●●●●')}</span><span class="an-badge ${s.strength||'fair'}">${s.strength||'analyzed'}</span><span class="an-mono" style="color:var(--text3)">${s.entropy||'–'} bits</span><span style="color:var(--text3);font-size:0.72rem">${fDate(s.createdAt)}</span></div>`).join('')}</div>`:emptyT('No password scans yet. Use the Tools page!')}
    </div>

    <div class="an-section">
      <div class="an-section-title">🌐 RECENT URL SCANS</div>
      ${urlScans.length>0?`<div class="an-table"><div class="an-table-head"><span>URL</span><span>VERDICT</span><span>FLAGS</span><span>DATE</span></div>${urlScans.slice(0,10).map(s=>`<div class="an-table-row"><span class="an-mono" style="color:var(--text2);font-size:0.72rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${s.url||''}">${trunc(s.url||'N/A',28)}</span><span class="an-badge ${s.danger?'danger':s.suspicious?'warn':'safe'}">${s.danger?'🚨 DANGER':s.suspicious?'⚠️ SUSPECT':'✅ SAFE'}</span><span style="color:var(--text3);font-size:0.72rem">${s.triggers||0}</span><span style="color:var(--text3);font-size:0.72rem">${fDate(s.createdAt)}</span></div>`).join('')}</div>`:emptyT('No URL scans yet. Use the Tools page!')}
    </div>

    <div class="an-section">
      <div class="an-section-title">⭐ BOOKMARKS <span class="an-count">${bookmarks.length}</span></div>
      ${bookmarks.length>0?`<div class="an-bookmarks-grid">${bookmarks.slice(0,12).map(b=>`<div class="an-bookmark"><div class="an-bm-top"><span class="an-bm-name">${b.name||'Tool'}</span><button class="an-bm-del" onclick="removeBookmark('${b.id}')">×</button></div><div class="an-bm-cat">${b.cat||'AI Tool'}</div><a href="${b.url||'#'}" target="_blank" class="an-bm-link">Open ↗</a></div>`).join('')}</div>`:emptyT('No bookmarks yet. Bookmark AI tools from the Finder!')}
    </div>

    <div class="an-section">
      <div class="an-section-title">🛡️ SECURITY SCORE</div>
      <div>${buildScore(pwCount,urlCount,bmCount,cvViews)}</div>
    </div>`;

  setTimeout(()=>{ document.querySelectorAll('.an-bar-fill').forEach(b=>b.style.transition='height 0.8s ease'); },100);
}

function sc(icon,label,val,color,sub) {
  return `<div class="an-stat-card"><div class="an-stat-icon" style="color:${color}">${icon}</div><div class="an-stat-num" style="color:${color}">${typeof val==='number'?val.toLocaleString():val}</div><div class="an-stat-label">${label}</div><div class="an-stat-sub">${sub}</div></div>`;
}

function donut(segments, total) {
  const r=60,cx=80,cy=80,stroke=22,circ=2*Math.PI*r;
  let offset=0;
  const paths=segments.filter(s=>s.val>0).map(s=>{const pct=s.val/total,dash=pct*circ,gap=circ-dash,rot=offset*360;offset+=pct;return`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${stroke}" stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${circ*0.25}" transform="rotate(${rot} ${cx} ${cy})"/>`;}).join('');
  const legend=segments.filter(s=>s.val>0).map(s=>`<div class="donut-leg-item"><span style="width:10px;height:10px;border-radius:50%;background:${s.color};display:inline-block"></span><span>${s.label}</span><span style="margin-left:auto;color:var(--text2)">${s.val}</span></div>`).join('');
  return `<div class="donut-wrap"><svg width="160" height="160" viewBox="0 0 160 160"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="${stroke}"/>${paths}<text x="${cx}" y="${cy}" text-anchor="middle" dy="0.35em" fill="var(--text)" font-family="Orbitron,monospace" font-size="16" font-weight="700">${total}</text></svg><div class="donut-legend">${legend}</div></div>`;
}

function buildScore(pw,url,bm,cv) {
  const checks=[
    {label:'Password analyzer used',done:pw>0,pts:20},
    {label:'URLs scanned for phishing',done:url>0,pts:20},
    {label:'AI tools bookmarked',done:bm>0,pts:15},
    {label:'Resources explored',done:cv>0,pts:15},
    {label:'5+ passwords analyzed',done:pw>=5,pts:15},
    {label:'Account created',done:true,pts:15},
  ];
  const score=checks.reduce((s,c)=>c.done?s+c.pts:s,0);
  const color=score>=80?'#10b981':score>=50?'#f59e0b':'#ef4444';
  const lbl=score>=80?'EXCELLENT':score>=50?'GOOD':'NEEDS WORK';
  return `<div class="an-score-card"><div class="an-score-circle"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/><circle cx="60" cy="60" r="50" fill="none" stroke="${color}" stroke-width="10" stroke-dasharray="${score*3.14} 314" stroke-dashoffset="78.5" stroke-linecap="round"/><text x="60" y="55" text-anchor="middle" fill="${color}" font-family="Orbitron,monospace" font-size="20" font-weight="700">${score}</text><text x="60" y="72" text-anchor="middle" fill="var(--text3)" font-family="Share Tech Mono,monospace" font-size="9" letter-spacing="1">${lbl}</text></svg></div><div class="an-score-checks">${checks.map(c=>`<div class="an-score-item"><span class="an-score-dot" style="background:${c.done?'#10b981':'var(--text3)'}"></span><span style="color:${c.done?'var(--text)':'var(--text3)'};font-size:0.82rem">${c.label}</span><span style="margin-left:auto;font-family:var(--font-m);font-size:0.7rem;color:${c.done?'#10b981':'var(--text3)'}">+${c.pts}pts</span></div>`).join('')}</div></div>`;
}

function getLast7Days(){const d=[];for(let i=6;i>=0;i--){const x=new Date();x.setDate(x.getDate()-i);d.push(x.toISOString().split('T')[0]);}return d;}
function maskPw(pw){if(!pw)return'●●●●●●';return pw.slice(0,1)+'●'.repeat(Math.min(5,pw.length-2))+(pw.length>2?pw.slice(-1):'');}
function trunc(s,n){return s.length>n?s.slice(0,n)+'...':s;}
function fDate(d){if(!d)return'now';const date=new Date(d.seconds?d.seconds*1000:d);return date.toLocaleDateString('en-IN',{day:'numeric',month:'short'});}
function emptyC(msg){return`<div class="an-empty-chart">${msg}</div>`;}
function emptyT(msg){return`<div class="an-empty-table">${msg}</div>`;}

window.removeBookmark = async function(id) {
  await FS.deleteRecord(CV_USER.uid,'bookmarks',id);
  analyticsReady=false; await renderAnalytics();
};

window.bookmarkTool = async function(tool) {
  if (!window.CV_USER) { showToast('⚠️ Login to bookmark tools'); return; }
  await FS.addRecord(CV_USER.uid,'bookmarks',{name:tool.n,cat:tool.cat,url:tool.url});
  await FS.incStat(CV_USER.uid,'bookmark');
  showToast('⭐ Bookmarked: '+tool.n);
};

window.trackAIView    = async()=>{ if(window.CV_USER) await FS.incStat(CV_USER.uid,'ai_view'); };
window.trackCourseView= async()=>{ if(window.CV_USER) await FS.incStat(CV_USER.uid,'course_view'); };
window.trackNewsView  = async()=>{ if(window.CV_USER) await FS.incStat(CV_USER.uid,'news_view'); };
