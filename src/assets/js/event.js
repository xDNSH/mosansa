Berita()
async function Berita() {
  let data = await fetch("https://raw.githubusercontent.com/RPLSaci/featOsis-Event/main/events/mainMenu.json")
  let json = await data.json()

  let html = ""
  for(let i =0;i < json.length;i++){
    let item = json[i]
    console.log(item)
    html+=`
    <div class="card w-96 mt-12 text-white bg-base-100 shadow-xl image-full m-auto">
    <figure>
    <img src="https://raw.githubusercontent.com/RPLSaci/featOsis-Event/main/events/${item.img}" class="rounded-xl" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-white">${item.nama}</h2>
      <div class="card-actions justify-end">
        <a class="btn btn-osis" href="./fullData.html?id=${item.id}">Buka</a>
      </div>
    </div>
  </div>    `
  }
  document.querySelector("#grid-galeri").innerHTML += html 

}