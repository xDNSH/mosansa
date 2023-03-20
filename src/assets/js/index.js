


async function main() {
	const response = await fetch(
		"https://raw.githubusercontent.com/RPLSaci/mosansa/main/data/pengurus.txt"
	);
	const text = await response.text();
  load(text)
	const data = text
		.split("\n")
		.filter((a) => a.length > 1)
    .filter((a) => !a.includes("//"))
    .filter((a) => !a.includes("--"));
    let html = ""

  let showingPengurus = text.split("\n").filter((a) => a.includes("INTI"))
  const inti = showingPengurus[0].split("-")[5].trim()
  let htmlmpk = ``
  let htmlosis = ``
  for (let i = 0; i < data.length; i++) {
		const element = data[i];
		const [nama, tipe, angkatan, jabatan] = element.split(" - ");
		if (jabatan && angkatan === inti && tipe === "MPK") {
			htmlmpk += `
      <div class="swiper-slide flex">
      <div class="card w-96 bg-mpk shadow-xl m-auto">
          <div class="card-body items-center text-center">
              <h2 class="card-title">${nama}</h2>
              <p>${jabatan} ${tipe} ${angkatan}</p>
          </div>
      </div>
  </div>`;
		} else if (jabatan && angkatan === inti && tipe === "OSIS") {
      htmlosis += `
      <div class="swiper-slide flex">
      <div class="card w-96 bg-mpk shadow-xl m-auto">
          <div class="card-body items-center text-center">
              <h2 class="card-title">${nama}</h2>
              <p>${jabatan} ${tipe} ${angkatan}</p>
          </div>
      </div>
  </div>`;
    }
	}
  document.querySelector("#pengurus-mpk > #data-struktur").innerHTML += htmlmpk;
  const swiper2 = new Swiper("#pengurus-mpk", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    slidesPerView: "auto",
    pagination: {
      el: "#pengurus-mpk > .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
  
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: "#pengurus-mpk > .swiper-button-next",
      prevEl: "#pengurus-mpk > .swiper-button-prev",
    },
  });
  document.querySelector("#pengurus-osis > #data-struktur").innerHTML += htmlosis;
  const swiper3 = new Swiper("#pengurus-osis", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    slidesPerView: "auto",
    pagination: {
      el: "#pengurus-osis > .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
  
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: "#pengurus-osis > .swiper-button-next",
      prevEl: "#pengurus-osis > .swiper-button-prev",
    },
  });
}
main();


async function load(data) {
  data = data.split("\n")
  .filter((a) => a.length > 1)
  .filter((a) => !a.includes("--"))
  .filter((a) => !a.includes("//"));


  let ammoutMPK = data.filter((a) => a.includes("MPK")).length
  let ammoutOsis = data.filter((a) => a.includes("OSIS")).length
  let masabakti = (new Date().getFullYear() - 1) + " - " + new Date().getFullYear()
  document.querySelector("#info").innerHTML +=`
  <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
  <div class="text-center p-4">
      <span class="block text-4xl font-bold">${masabakti}</span>
      <p class="text-base">Masa Bakti</p>
  </div>

  <div class="text-center p-4">
  <span data-purecounter-start="0" data-purecounter-end="${ammoutMPK}"
      class="purecounter block text-4xl font-bold">${ammoutMPK}</span>
  <p class="text-base">Pengurus MPK</p>
</div>
<div class="text-center p-4">
  <span data-purecounter-start="0" data-purecounter-end="${ammoutOsis}"
      class="purecounter block text-4xl font-bold">${ammoutOsis}</span>
  <p class="text-base">Pengurus Osis</p>
</div>


  <div class="text-center p-4">
      <span data-purecounter-start="0" data-purecounter-end="10"
          class="purecounter block text-4xl font-bold">10</span>
      <p class="text-base">Total Sekbid Osis</p>
  </div>

</div>
`
}

Berita()
async function Berita() {
  let data = await fetch("https://raw.githubusercontent.com/RPLSaci/featOsis-Event/main/events/mainMenu.json")
  let json = await data.json()

  let html = ""
  for(let i =0;i < json.length;i++){
    let item = json[i]
    console.log(item)
    html+=`
    <div class="swiper-slide flex w-96">
    <div class="card w-96 bg-osis shadow-xl m-auto">
        <figure class="">
            <img src="https://raw.githubusercontent.com/RPLSaci/featOsis-Event/main/events/${item.img}" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <a class="card-title" href="./event/baca?id=${item.id}">${item.nama}</a>
        </div>
    </div>
</div>`
  }
  document.querySelector("#berita-slide").innerHTML += html 
  const swiper = new Swiper("#beritaswip", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    slidesPerView: "auto",
    pagination: {
      el: "#beritaswip > .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
  
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: "#beritaswip > .swiper-button-next",
      prevEl: "#beritaswip > .swiper-button-prev",
    },
  });
}