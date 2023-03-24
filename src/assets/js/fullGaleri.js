let api = "https://mosansa-api.vercel.app/"

async function main(){
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    // get data from api
    if(!id || id.length < 1){
        alert("Tidak ada id acara yang diberikan!")
        return
    }

    let model = (await loadModel(id)).message.find((e)=>e.idAcara === id)
    console.log(model)
    if(!model){
        alert("Tidak ada acara dengan id tersebut!")
        return
    }
    loadHtml(model)
    let data = await getAllImages(id)
    // console.log(data)
    // limit data to 20
    data = data.slice(0, 10)
    loadImages(data)
}


function loadImages(data){
    let html = ""
    for(let i = 0; i < data.length; i++){
        html += `<div class="col-sm-4">
        <div class="card">
          <img class="card-img-top" src="https://drive.google.com/uc?id=${data[i].id}&export=download"alt="Card image cap">
        </div>
      </div>`
    }
    document.querySelector("#images").innerHTML = html
}
function loadHtml(model){
    document.querySelector("#tgl").innerText = (new Date(model.tanggal)).toLocaleDateString()
    document.querySelector("#name").innerText = model.namaAcara
    document.querySelector("#link").setAttribute("href", model.url)
    document.querySelector("#data").classList.toggle("hidden")
}
main()


async function loadModel(id){
    let data = await fetch(api + "api/allFolders")
    let json = await data.json()
    return json
}

async function getAllImages(folderId) {
    const images = []
    let nextPageToken = null

    const response = await fetch(api + "api/getFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          folderId,
          pageToken: nextPageToken
        })
      })
  
      const { files } = await response.json()

      for (const file of files) {
        const { mimeType, id } = file
        if (mimeType.startsWith("image/")) {
          images.push(file)
        } else if (mimeType === "application/vnd.google-apps.folder") {
          const subfolderImages = await getAllImages(id)
          images.push(...subfolderImages)
        }
      }
    
      return images
  }
  