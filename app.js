const STORAGE_KEY = "lvfa_authors_offline_v1";

const DEFAULT_AUTHORS = [
  {id:"clement-alloing",firstName:"Clément",lastName:"Alloing",instagram:"",contact:"clement.alloing@gmail.com",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Flickr.com",url:"https://www.flickr.com/photos/bycac/",credit:"Clément Alloing | Flickr.com"}]},
  {id:"sean-noel-oconnell",firstName:"Seán Noel",lastName:"O'Connell",instagram:"seannoeloconnell",contact:"Instagram",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Flickr.com",url:"https://www.flickr.com/photos/134579296@N02/",credit:"Seán Noel O'Connell | @seannoeloconnell | Flickr.com"}]},
  {id:"petr-juris",firstName:"Petr",lastName:"Juriš",instagram:"petrjuris",contact:"E-mail; Instagram",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/276808/photos",credit:"Petr Juriš | @petrjuris | Jetphotos.com"},{label:"Flickr.com",url:"https://www.flickr.com/photos/197758286@N06/",credit:"Petr Juriš | @petrjuris | Flickr.com"}]},
  {id:"jan-jurecka",firstName:"Jan",lastName:"Jurečka",instagram:"",contact:"E-mail; Instagram",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/33386/photos",credit:"Jan Jurečka | Jetphotos.com"},{label:"Planespotters.net",url:"https://www.planespotters.net/photos/gallery/Metaxa",credit:"Jan Jurečka | Planespotters.net"},{label:"Planes.cz",url:"https://www.planes.cz/cs/photos?fulltext=Metaxa",credit:"Jan Jurečka | Planes.cz"}]},
  {id:"tomas-cibulka",firstName:"Tomáš",lastName:"Cibulka",instagram:"",contact:"/ (via Eliška Vykysalá)",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/58804/photos",credit:"Tomáš Cibulka | Jetphotos.com"}]},
  {id:"vinh-xuan-dinh",firstName:"Vinh Xuan",lastName:"Dinh",instagram:"",contact:"E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/403173/photos",credit:"Vinh Xuan Dinh | Jetphotos.com"},{label:"Planes.cz",url:"https://www.planes.cz/cs/photos?author_id=11217&author_name=Vinh+Xuan+Dinh",credit:"Vinh Xuan Dinh | Planes.cz"}]},
  {id:"maxim-weber",firstName:"Maxim",lastName:"Weber",instagram:"spotter.maxim",contact:"Instagram; Flickr",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Flickr.com",url:"https://www.flickr.com/photos/200642066@N03/",credit:"Maxim Weber | @spotter.maxim | Flickr.com"},{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/347412/photos",credit:"Maxim Weber | @spotter.maxim | Jetphotos.com"},{label:"Planespotters.net",url:"https://www.planespotters.net/photo/search?photographer=Maxim+Weber",credit:"Maxim Weber | @spotter.maxim | Planespotters.net"}]},
  {id:"stepan-bajger",firstName:"Štěpán",lastName:"Bajger",instagram:"stepan_bajger",contact:"Instagram; E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/193269/photos?term=Stepan%20Bajger",credit:"Štěpán Bajger | @stepan_bajger | Jetphotos.com"},{label:"Planes.cz",url:"https://www.planes.cz/cs/photos?author_id=10302&author_name=%C5%A0t%C4%9Bp%C3%A1n+Bajger",credit:"Štěpán Bajger | @stepan_bajger | Planes.cz"},{label:"Planespotters.net",url:"https://www.planespotters.net/photo/1759459/oe-lax-swiftair-airbus-a321-211-p2f",credit:"Štěpán Bajger | @stepan_bajger | Planespotters.net"}]},
  {id:"eliska-vykysala",firstName:"Eliška",lastName:"Vykysalá",instagram:"",contact:"E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/66806/photos",credit:"Eliška Vykysalá | Jetphotos.com"}]},
  {id:"dominik-schwab",firstName:"Dominik",lastName:"Schwab",instagram:"nickfromprg",contact:"Instagram; E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/206530/photos",credit:"Dominik Schwab | @nickfromprg | Jetphotos.com"}]},
  {id:"kornel-mierzwinski",firstName:"Kornel",lastName:"Mierzwiński",instagram:"",contact:"E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/39413/photos",credit:"Kornel Mierzwiński | Jetphotos.com"},{label:"Planespotters.net",url:"https://www.planespotters.net/photos/gallery/Kornel_Mierzwinski",credit:"Kornel Mierzwiński | Planespotters.net"},{label:"Airliners.net",url:"https://www.airliners.net/search?user=624323&sortBy=dateAccepted&sortOrder=desc&perPage=84&display=detail",credit:"Kornel Mierzwiński | Airliners.net"}]},
  {id:"waibibabu",firstName:"Waibibabu",lastName:"",instagram:"",contact:"E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/417682/photos",credit:"Waibibabu | Jetphotos.com"}]},
  {id:"vaclav-kudela",firstName:"Václav",lastName:"Kudela",instagram:"",contact:"Whatsapp; E-mail",photoDatabaseUrl:"",status:"S potvrzením",sourceLinks:[{label:"Jetphotos.com",url:"https://www.jetphotos.com/photographer/18437/photos",credit:"Václav Kudela | Jetphotos.com"},{label:"Planespotters.net",url:"https://www.planespotters.net/photo/search?photographer=V%C3%A1clav+Kudela",credit:"Václav Kudela | Planespotters.net"},{label:"Airliners.net",url:"https://www.airliners.net/user/VASEK/profile/photos",credit:"Václav Kudela | Airliners.net"},{label:"Flickr.com",url:"https://www.flickr.com/photos/186263525@N08/with/50183300633",credit:"Václav Kudela | Flickr.com"},{label:"Zonerama.com",url:"https://eu.zonerama.com/VaclavKudela/948337",credit:"Václav Kudela | Zonerama.com"}]}
];

const state = { authors: [], selectedId: null, query: "" };
const $ = s => document.querySelector(s);
const els = {
  search: $("#authorSearch"), count: $("#authorCount"), list: $("#authorList"), emptyList: $("#authorListEmpty"),
  add: $("#addAuthorButton"), emptyDetail: $("#authorEmptyState"), detail: $("#authorDetail"), name: $("#detailName"),
  instagram: $("#detailInstagram"), status: $("#detailStatus"), contactSection: $("#contactSection"), contact: $("#detailContact"),
  databaseSection: $("#databaseSection"), databaseUrl: $("#detailDatabaseUrl"), sources: $("#detailSources"), sourcesCount: $("#detailSourcesCount"),
  edit: $("#editAuthorButton"), del: $("#deleteAuthorButton"), modal: $("#authorModal"), modalClose: $("#authorModalClose"),
  modalTitle: $("#authorModalTitle"), modalEyebrow: $("#authorModalEyebrow"), form: $("#authorForm"), sourceRows: $("#sourceRows"),
  addSource: $("#addSourceButton"), cancel: $("#cancelAuthorButton"), formMessage: $("#formMessage"),
  dataMenuButton: $("#dataMenuButton"), dataMenu: $("#dataMenu"), exportButton: $("#exportButton"), importButton: $("#importButton"),
  importFile: $("#importFile"), resetButton: $("#resetButton"), toast: $("#toast"), storageStatus: $("#storageStatus")
};

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function fullName(a){ return [a.firstName,a.lastName].filter(Boolean).join(" ").trim(); }
function handle(v=""){ return String(v).trim().replace(/^@/,"").replace(/^https?:\/\/(www\.)?instagram\.com\//i,"").replace(/\/$/,""); }
function safeUrl(v=""){ const x=String(v).trim(); if(!x) return ""; try{return new URL(/^https?:\/\//i.test(x)?x:`https://${x}`).href;}catch{return x;} }
function sortAuthors(items){ return [...items].sort((a,b)=>fullName(a).localeCompare(fullName(b),"cs",{sensitivity:"base"})); }
function uid(){ return `author-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
function esc(v=""){ return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function load(){
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    state.authors = raw ? JSON.parse(raw) : clone(DEFAULT_AUTHORS);
    if(!raw) save();
  } catch { state.authors=clone(DEFAULT_AUTHORS); }
  state.authors = Array.isArray(state.authors) ? state.authors : clone(DEFAULT_AUTHORS);
  state.selectedId = state.authors[0]?.id || null;
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state.authors)); els.storageStatus.textContent="Uloženo lokálně"; }
function filtered(){
  const q=state.query.trim().toLocaleLowerCase("cs");
  if(!q) return sortAuthors(state.authors);
  return sortAuthors(state.authors.filter(a=>{
    const hay=[fullName(a),a.instagram,a.contact,a.photoDatabaseUrl,...(a.sourceLinks||[]).flatMap(s=>[s.label,s.url,s.credit])].join(" ").toLocaleLowerCase("cs");
    return hay.includes(q);
  }));
}
function renderList(){
  const items=filtered(); els.count.textContent=`${items.length} / ${state.authors.length}`; els.emptyList.classList.toggle("hidden",items.length>0);
  els.list.innerHTML=items.map(a=>`<button class="author-list-item ${a.id===state.selectedId?"active":""}" data-id="${esc(a.id)}" type="button"><span class="min-w-0"><span class="author-list-name">${esc(fullName(a))}</span><span class="author-list-ig">${a.instagram?`@${esc(handle(a.instagram))}`:esc(a.contact||"Bez Instagramu")}</span></span><span class="author-list-arrow">›</span></button>`).join("");
  els.list.querySelectorAll("[data-id]").forEach(b=>b.addEventListener("click",()=>{state.selectedId=b.dataset.id;render();}));
}
function renderDetail(){
  const a=state.authors.find(x=>x.id===state.selectedId);
  els.emptyDetail.classList.toggle("hidden",!!a); els.detail.classList.toggle("hidden",!a); if(!a)return;
  els.name.textContent=fullName(a); els.status.textContent=a.status||"S potvrzením";
  const ig=handle(a.instagram); els.instagram.classList.toggle("hidden",!ig); if(ig){els.instagram.textContent=`@${ig}`;els.instagram.href=`https://www.instagram.com/${encodeURIComponent(ig)}/`;}
  els.contactSection.classList.toggle("hidden",!a.contact); els.contact.textContent=a.contact||"";
  els.databaseSection.classList.toggle("hidden",!a.photoDatabaseUrl); if(a.photoDatabaseUrl){els.databaseUrl.href=safeUrl(a.photoDatabaseUrl);els.databaseUrl.textContent=a.photoDatabaseUrl;}
  const sources=a.sourceLinks||[]; els.sourcesCount.textContent=`${sources.length} ${sources.length===1?"zdroj":"zdrojů"}`;
  els.sources.innerHTML=sources.length?sources.map((s,i)=>`<div class="source-credit-card">
    <div class="source-credit-top"><div><div class="source-link-label">${esc(s.label||"Zdroj")}</div><div class="source-link-url">${esc(s.url||"")}</div></div><a class="source-open-button" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener" title="Otevřít zdroj" aria-label="Otevřít ${esc(s.label||"zdroj")}">↗</a></div>
    <button class="credit-copy-button" type="button" data-credit-index="${i}"><span class="credit-copy-label">Kredit</span><strong>${esc(s.credit||defaultCredit(a,s))}</strong><span class="credit-copy-icon">⧉</span></button>
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
  row.innerHTML=`<label class="field"><span>Web</span><input name="sourceLabel" value="${esc(source.label||"")}" placeholder="Jetphotos.com"></label><label class="field"><span>Odkaz</span><input name="sourceUrl" value="${esc(source.url||"")}" placeholder="https://…"></label><label class="field source-credit-field"><span>Kredit</span><input name="sourceCredit" value="${esc(source.credit||"")}" placeholder="Jméno | @instagram | Web"></label><button class="source-remove" type="button" aria-label="Odebrat odkaz">×</button>`;
  row.querySelector(".source-remove").addEventListener("click",()=>row.remove()); return row;
}
function openModal(a=null){
  els.form.reset(); els.sourceRows.innerHTML=""; els.formMessage.classList.add("hidden");
  els.modalTitle.textContent=a?"Upravit autora":"Přidat autora"; els.modalEyebrow.textContent=a?"Editace":"Databáze";
  els.form.elements.id.value=a?.id||""; els.form.elements.firstName.value=a?.firstName||""; els.form.elements.lastName.value=a?.lastName||""; els.form.elements.instagram.value=a?.instagram||""; els.form.elements.contact.value=a?.contact||""; els.form.elements.photoDatabaseUrl.value=a?.photoDatabaseUrl||"";
  (a?.sourceLinks?.length?a.sourceLinks:[{}]).forEach(s=>els.sourceRows.appendChild(sourceRow(s))); els.modal.classList.remove("hidden"); setTimeout(()=>els.form.elements.firstName.focus(),0);
}
function closeModal(){ els.modal.classList.add("hidden"); }
function collectSources(a){
  return [...els.sourceRows.querySelectorAll(".source-row")].map(row=>({label:row.querySelector('[name="sourceLabel"]').value.trim(),url:row.querySelector('[name="sourceUrl"]').value.trim(),credit:row.querySelector('[name="sourceCredit"]').value.trim()})).filter(s=>s.label||s.url||s.credit).map(s=>({...s,credit:s.credit||defaultCredit(a,s)}));
}
els.form.addEventListener("submit",e=>{
  e.preventDefault(); const fd=new FormData(els.form); const draft={id:fd.get("id")||uid(),firstName:String(fd.get("firstName")||"").trim(),lastName:String(fd.get("lastName")||"").trim(),instagram:handle(fd.get("instagram")||""),contact:String(fd.get("contact")||"").trim(),photoDatabaseUrl:String(fd.get("photoDatabaseUrl")||"").trim(),status:"S potvrzením",sourceLinks:[]}; draft.sourceLinks=collectSources(draft);
  const idx=state.authors.findIndex(a=>a.id===draft.id); if(idx>=0)state.authors[idx]=draft;else state.authors.push(draft); state.selectedId=draft.id; save(); closeModal(); render(); showToast("Autor uložen");
});

els.search.addEventListener("input",()=>{state.query=els.search.value;renderList();});
els.add.addEventListener("click",()=>openModal()); els.edit.addEventListener("click",()=>{const a=state.authors.find(x=>x.id===state.selectedId);if(a)openModal(a);});
els.del.addEventListener("click",()=>{const a=state.authors.find(x=>x.id===state.selectedId);if(!a)return;if(confirm(`Opravdu smazat autora ${fullName(a)}?`)){state.authors=state.authors.filter(x=>x.id!==a.id);state.selectedId=sortAuthors(state.authors)[0]?.id||null;save();render();showToast("Autor smazán");}});
els.addSource.addEventListener("click",()=>els.sourceRows.appendChild(sourceRow())); els.modalClose.addEventListener("click",closeModal); els.cancel.addEventListener("click",closeModal); els.modal.addEventListener("click",e=>{if(e.target===els.modal)closeModal();});

els.dataMenuButton.addEventListener("click",e=>{e.stopPropagation();els.dataMenu.classList.toggle("hidden");}); document.addEventListener("click",e=>{if(!els.dataMenu.contains(e.target)&&e.target!==els.dataMenuButton)els.dataMenu.classList.add("hidden");});
els.exportButton.addEventListener("click",()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),authors:state.authors},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`flyalert-autori-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);els.dataMenu.classList.add("hidden");showToast("Databáze exportována");});
els.importButton.addEventListener("click",()=>els.importFile.click()); els.importFile.addEventListener("change",async()=>{const file=els.importFile.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());const authors=Array.isArray(data)?data:data.authors;if(!Array.isArray(authors))throw new Error();if(!confirm(`Importovat ${authors.length} autorů a nahradit současná data?`))return;state.authors=authors;state.selectedId=sortAuthors(state.authors)[0]?.id||null;save();render();showToast("Databáze importována");}catch{alert("Soubor se nepodařilo importovat. Zkontroluj, že jde o JSON export z této aplikace.");}finally{els.importFile.value="";els.dataMenu.classList.add("hidden");}});
els.resetButton.addEventListener("click",()=>{if(confirm("Obnovit původní předvyplněné autory? Současná lokální data budou nahrazena.")){state.authors=clone(DEFAULT_AUTHORS);state.selectedId=sortAuthors(state.authors)[0]?.id||null;save();render();els.dataMenu.classList.add("hidden");showToast("Výchozí data obnovena");}});

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();els.dataMenu.classList.add("hidden");}});

load(); render();
if("serviceWorker" in navigator && location.protocol!=="file:"){ window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{})); }
