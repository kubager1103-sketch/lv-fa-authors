const STORAGE_KEY = "lvfa_authors_private_v4";

const state = { authors: [], selectedId: null, query: "" };
const $ = s => document.querySelector(s);
const els = {
  search: $("#authorSearch"), count: $("#authorCount"), list: $("#authorList"), emptyList: $("#authorListEmpty"),
  add: $("#addAuthorButton"), emptyDetail: $("#authorEmptyState"), detail: $("#authorDetail"), name: $("#detailName"),
  instagram: $("#detailInstagram"), notesSection: $("#notesSection"), notes: $("#detailNotes"), contactSection: $("#contactSection"), contact: $("#detailContact"),
  sources: $("#detailSources"), sourcesCount: $("#detailSourcesCount"),
  edit: $("#editAuthorButton"), del: $("#deleteAuthorButton"), modal: $("#authorModal"), modalClose: $("#authorModalClose"),
  modalTitle: $("#authorModalTitle"), modalEyebrow: $("#authorModalEyebrow"), form: $("#authorForm"), sourceRows: $("#sourceRows"),
  addSource: $("#addSourceButton"), cancel: $("#cancelAuthorButton"), formMessage: $("#formMessage"),
  dataMenuButton: $("#dataMenuButton"), dataMenu: $("#dataMenu"), exportButton: $("#exportButton"), importButton: $("#importButton"),
  importFile: $("#importFile"), toast: $("#toast")
};

function fullName(a){ return String(a.name || [a.firstName,a.lastName].filter(Boolean).join(" ")).trim(); }
function handle(v=""){ return String(v).trim().replace(/^@/,"").replace(/^https?:\/\/(www\.)?instagram\.com\//i,"").replace(/\/$/,""); }
function safeUrl(v=""){ const x=String(v).trim(); if(!x) return ""; try{return new URL(/^https?:\/\//i.test(x)?x:`https://${x}`).href;}catch{return x;} }
function sortAuthors(items){ return [...items].sort((a,b)=>fullName(a).localeCompare(fullName(b),"cs",{sensitivity:"base"})); }
function uid(){ return `author-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
function esc(v=""){ return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function load(){
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    state.authors = raw ? JSON.parse(raw) : [];
  } catch { state.authors=[]; }
  state.authors = Array.isArray(state.authors) ? state.authors : [];
  state.selectedId = sortAuthors(state.authors)[0]?.id || null;
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state.authors)); }
function filtered(){
  const q=state.query.trim().toLocaleLowerCase("cs");
  if(!q) return sortAuthors(state.authors);
  return sortAuthors(state.authors.filter(a=>{
    const hay=[fullName(a),a.instagram,a.contact,a.notes,...(a.sourceLinks||[]).flatMap(s=>[s.label,s.url,s.credit])].join(" ").toLocaleLowerCase("cs");
    return hay.includes(q);
  }));
}
function renderList(){
  const items=filtered(); els.count.textContent=`${items.length} / ${state.authors.length}`; els.emptyList.classList.toggle("hidden",items.length>0);
  els.list.innerHTML=items.map(a=>`<button class="author-list-item ${a.id===state.selectedId?"active":""}" data-id="${esc(a.id)}" type="button"><span class="author-list-name">${esc(fullName(a))}</span><span class="author-list-arrow">›</span></button>`).join("");
  els.list.querySelectorAll("[data-id]").forEach(b=>b.addEventListener("click",()=>{state.selectedId=b.dataset.id;render();}));
}
function renderDetail(){
  const a=state.authors.find(x=>x.id===state.selectedId);
  els.emptyDetail.classList.toggle("hidden",!!a); els.detail.classList.toggle("hidden",!a); if(!a)return;
  els.name.textContent=fullName(a);
  const ig=handle(a.instagram); els.instagram.classList.toggle("hidden",!ig); if(ig){els.instagram.textContent=`@${ig}`;els.instagram.href=`https://www.instagram.com/${encodeURIComponent(ig)}/`;}
  els.notesSection.classList.toggle("hidden",!a.notes); els.notes.textContent=a.notes||"";
  els.contactSection.classList.toggle("hidden",!a.contact); els.contact.textContent=a.contact||"";
  const sources=a.sourceLinks||[]; els.sourcesCount.textContent=`${sources.length} ${sources.length===1?"zdroj":"zdrojů"}`;
  els.sources.innerHTML=sources.length?sources.map((s,i)=>`<div class="source-credit-card">
    <div class="source-credit-top"><div><div class="source-link-label">${esc(s.label||"Zdroj")}</div><div class="source-link-url">${esc(s.url||"")}</div></div><a class="source-open-button" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener" title="Otevřít zdroj" aria-label="Otevřít ${esc(s.label||"zdroj")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M10 8h6v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>
    <button class="credit-copy-button" type="button" data-credit-index="${i}"><strong>${esc(s.credit||defaultCredit(a,s))}</strong><span class="credit-copy-icon">⧉</span></button>
  </div>`).join(""):`<div class="source-empty">Zatím bez zdrojových stránek.</div>`;
  els.sources.querySelectorAll("[data-credit-index]").forEach(b=>b.addEventListener("click",()=>copyCredit((sources[Number(b.dataset.creditIndex)]||{}).credit||defaultCredit(a,sources[Number(b.dataset.creditIndex)]||{}),b)));
}
function defaultCredit(a,s){ return [fullName(a),a.instagram?`@${handle(a.instagram)}`:"",s.label||""].filter(Boolean).join(" | "); }
function render(){ renderList(); renderDetail(); }

async function copyCredit(text,button){
  try { await navigator.clipboard.writeText(text); }
  catch { const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove(); }
  const old=button.querySelector(".credit-copy-icon").textContent; button.classList.add("copied"); button.querySelector(".credit-copy-icon").textContent="✓"; showToast("Kredit zkopírován"); setTimeout(()=>{button.classList.remove("copied");button.querySelector(".credit-copy-icon").textContent=old;},1100);
}
function showToast(msg){ els.toast.textContent=msg;els.toast.classList.remove("hidden");clearTimeout(showToast.t);showToast.t=setTimeout(()=>els.toast.classList.add("hidden"),1400); }

function sourceRow(source={}){
  const row=document.createElement("div"); row.className="source-row offline-source-row";
  row.innerHTML=`<label class="field"><span>Web</span><input name="sourceLabel" value="${esc(source.label||"")}"></label><label class="field"><span>Odkaz</span><input name="sourceUrl" value="${esc(source.url||"")}"></label><label class="field source-credit-field"><span>Kredit</span><input name="sourceCredit" value="${esc(source.credit||"")}"></label><button class="source-remove" type="button" aria-label="Odebrat odkaz">×</button>`;
  row.querySelector(".source-remove").addEventListener("click",()=>row.remove()); return row;
}
function openModal(a=null){
  els.form.reset(); els.sourceRows.innerHTML=""; els.formMessage.classList.add("hidden");
  els.modalTitle.textContent=a?"Upravit autora":"Přidat autora"; els.modalEyebrow.textContent=a?"Editace":"Databáze";
  els.form.elements.id.value=a?.id||""; els.form.elements.name.value=a?fullName(a):""; els.form.elements.instagram.value=a?.instagram||""; els.form.elements.notes.value=a?.notes||""; els.form.elements.contact.value=a?.contact||"";
  (a?.sourceLinks?.length?a.sourceLinks:[{}]).forEach(s=>els.sourceRows.appendChild(sourceRow(s))); els.modal.classList.remove("hidden"); setTimeout(()=>els.form.elements.name.focus(),0);
}
function closeModal(){ els.modal.classList.add("hidden"); }
function collectSources(a){
  return [...els.sourceRows.querySelectorAll(".source-row")].map(row=>({label:row.querySelector('[name="sourceLabel"]').value.trim(),url:row.querySelector('[name="sourceUrl"]').value.trim(),credit:row.querySelector('[name="sourceCredit"]').value.trim()})).filter(s=>s.label||s.url||s.credit).map(s=>({...s,credit:s.credit||defaultCredit(a,s)}));
}
els.form.addEventListener("submit",e=>{
  e.preventDefault(); const fd=new FormData(els.form); const draft={id:fd.get("id")||uid(),name:String(fd.get("name")||"").trim(),instagram:handle(fd.get("instagram")||""),notes:String(fd.get("notes")||"").trim(),contact:String(fd.get("contact")||"").trim(),sourceLinks:[]}; draft.sourceLinks=collectSources(draft);
  const idx=state.authors.findIndex(a=>a.id===draft.id); if(idx>=0)state.authors[idx]=draft;else state.authors.push(draft); state.selectedId=draft.id; save(); closeModal(); render(); showToast("Autor uložen");
});

els.search.addEventListener("input",()=>{state.query=els.search.value;renderList();});
els.add.addEventListener("click",()=>openModal()); els.edit.addEventListener("click",()=>{const a=state.authors.find(x=>x.id===state.selectedId);if(a)openModal(a);});
els.del.addEventListener("click",()=>{const a=state.authors.find(x=>x.id===state.selectedId);if(!a)return;if(confirm(`Opravdu smazat autora ${fullName(a)}?`)){state.authors=state.authors.filter(x=>x.id!==a.id);state.selectedId=sortAuthors(state.authors)[0]?.id||null;save();render();showToast("Autor smazán");}});
els.addSource.addEventListener("click",()=>els.sourceRows.appendChild(sourceRow())); els.modalClose.addEventListener("click",closeModal); els.cancel.addEventListener("click",closeModal); els.modal.addEventListener("click",e=>{if(e.target===els.modal)closeModal();});

els.dataMenuButton.addEventListener("click",e=>{e.stopPropagation();els.dataMenu.classList.toggle("hidden");}); document.addEventListener("click",e=>{if(!els.dataMenu.contains(e.target)&&e.target!==els.dataMenuButton)els.dataMenu.classList.add("hidden");});
els.exportButton.addEventListener("click",()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),authors:state.authors},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`lv-fa-authors-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);els.dataMenu.classList.add("hidden");showToast("Databáze exportována");});
els.importButton.addEventListener("click",()=>els.importFile.click()); els.importFile.addEventListener("change",async()=>{const file=els.importFile.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());const authors=Array.isArray(data)?data:data.authors;if(!Array.isArray(authors))throw new Error();if(!confirm(`Importovat ${authors.length} autorů a nahradit současná data?`))return;state.authors=authors;state.selectedId=sortAuthors(state.authors)[0]?.id||null;save();render();showToast("Databáze importována");}catch{alert("Soubor se nepodařilo importovat. Zkontroluj, že jde o JSON export z této aplikace.");}finally{els.importFile.value="";els.dataMenu.classList.add("hidden");}});

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();els.dataMenu.classList.add("hidden");}});

load(); render();
if("serviceWorker" in navigator && location.protocol!=="file:"){ window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(r=>r.update()).catch(()=>{})); }
