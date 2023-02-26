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


async function main() {
	const response = await fetch(
		"https://raw.githubusercontent.com/RPLSaci/mosansa/main/data/pengurus.txt"
	);
	const text = await response.text();
	const data = text
		.split("\n")
		.filter((a) => a.length > 1)
		.filter((a) => !a.includes("--"));
    let html = ""

  let showingPengurus = text.split("\n").filter((a) => a.includes("INTI"))
  const inti = showingPengurus[0].split("-")[5].trim()
  for (let i = 0; i < data.length; i++) {
		const element = data[i];
		const [nama, tipe, angkatan, jabatan] = element.split(" - ");
		if (jabatan && angkatan === inti) {
			html += `
      <div class="swiper-slide flex">
      <div class="card w-96 bg-base-100 shadow-xl m-auto">
          <div class="card-body items-center text-center">
              <h2 class="card-title">${nama}</h2>
              <p>${jabatan} ${tipe} ${angkatan}</p>
          </div>
      </div>
  </div>`;
		}
	}
  document.querySelector("#data-struktur").innerHTML += html;
  const swiper2 = new Swiper("#pengurus", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    slidesPerView: "auto",
    pagination: {
      el: "#pengurus > .swiper-pagination",
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
      nextEl: "#pengurus > .swiper-button-next",
      prevEl: "#pengurus > .swiper-button-prev",
    },
  });
}
main();
