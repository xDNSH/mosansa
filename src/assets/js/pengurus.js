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
    let html = ""

  let showingPengurus = text.split("\n").filter((a) => a.includes("INTI"))
  const inti = showingPengurus[0].split("-")[5].trim()
  for (let i = 0; i < data.length; i++) {
		const element = data[i];
		const [nama, tipe, angkatan] = element.split(" - ");
			html += `
      <div class="card lg:w-96 w-80 bg-base-100 shadow-xl m-auto">
          <div class="card-body items-center text-center">
              <h2 class="card-title">${nama}</h2>
              <p>${tipe} ${angkatan}</p>
          </div>
  </div>`;
	}
  document.querySelector("#data-struktur").innerHTML += html;
  const swiper = new Swiper("#data-struktur", {
    horizontal: true,
  });

}

main()