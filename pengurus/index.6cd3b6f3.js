async function main(){const t=await fetch("https://raw.githubusercontent.com/RPLSaci/mosansa/main/data/pengurus.txt"),e=(await t.text()).split("\n").filter((t=>t.length>1)).filter((t=>!t.includes("//"))).filter((t=>!t.includes("--")));console.log(e);let n=[];for(let t=0;t<e.length;t++){const i=e[t],[s,l,a]=i.split(" - ");n.includes(a.replace(" ",""))||n.push(a.replace(" ",""))}let i="mpk";n.sort(((t,e)=>t-e));for(let t=0;t<n.length;t++){const s=n[t];let l="",a=e.filter((t=>t.includes(s)));for(let t=0;t<a.length;t++){const e=a[t],[n,s,r]=e.split(" - ");l+=`\n        <div class="card lg:w-96 w-80 bg-${i} shadow-xl m-auto">\n           <div class="card-body items-center text-center">\n                <h2 class="card-title">${n}</h2>\n                <p>${s} ${r}</p>\n           </div>\n        </div>\n    `}i="osis"===i?"mpk":"osis",document.querySelector("#data-struktur").innerHTML+=`\n    <div class="swiper-slide bg-${i}">\n    <div class="text-3xl text-white text-center z-1 pt-12">Angkatan ${s}</div>\n      <div class="grid grid-rows-1 gap-4 h-[50vh] overflow-x-scroll text-white grid-flow-col z-1">\n        ${l}\n      </div>\n    </div>\n    </div>\n  `}new Swiper("#data-struktur",{horizontal:!0})}main();
//# sourceMappingURL=index.6cd3b6f3.js.map
