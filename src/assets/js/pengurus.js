async function main() {
	const response = await fetch(
		"https://raw.githubusercontent.com/RPLSaci/mosansa/main/data/pengurus.txt"
	);
	const text = await response.text();
	const data = text
		.split("\n")
		.filter((a) => a.length > 1)
		.filter((a) => !a.includes("//"))
		.filter((a) => !a.includes("--"));
	let html = "";

  console.log(data)
  let angkatanList = []
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		const [nama, tipe, angkatan] = element.split(" - ");

    if(!angkatanList.includes(angkatan.replace(" ",""))){
      angkatanList.push(angkatan.replace(" ",""))
    }
	}
    // resort to be from higher to lower
    angkatanList.sort((a, b) => b - a);
	for (let i = 0; i < angkatanList.length; i++) {
    const element = angkatanList[i];
    let curHtml = ""
    let showing = data.filter((a) => a.includes(element))
	  for (let j = 0; j < showing.length; j++) {
      const element = showing[j];
      const [nama, tipe, angkatan] = element.split(" - ");
      curHtml += `
        <div class="card lg:w-96 w-80 bg-base-100 shadow-xl m-auto">
           <div class="card-body items-center text-center">
                <h2 class="card-title">${nama}</h2>
                <p>${tipe} ${angkatan}</p>
           </div>
        </div>
    `;
    }
    
    document.querySelector("#data-struktur").innerHTML += `
    <div class="text-3xl text-white text-center z-1 pt-12">Angkatan ${element}</div>
    <div class="grid grid-rows-1 gap-4 h-[50vh] overflow-x-scroll grid-flow-col z-1">
  ${curHtml}
  </div>
  `;

  }
	// document.querySelector("#data-struktur").innerHTML += `
  // <div class="grid grid-rows-2 lg:grid-rows-3 gap-4 h-screen overflow-x-scroll grid-flow-col">
  // ${html}
  // </div>
  // `;
	const swiper = new Swiper("#data-struktur", {
		horizontal: true,
	});
}

main();
