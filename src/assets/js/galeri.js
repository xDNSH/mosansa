let api = "https://mosansa-api.vercel.app/"


async function main(){
    if(localStorage.getItem("username") && localStorage.getItem("password") && document.querySelector("#user")){
        let user = localStorage.getItem('username');
        let pass = localStorage.getItem('password');
        let data = await fetch(api + "api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        })
        let json = await data.json()
        if(json.status == 200){
            showUser(user);
        }
    }
}


function showUser(user){
    document.querySelector("#user").classList.remove("hidden");
    document.querySelector("#name").innerText = `Selamat datang, ${user}!`;
}

main()

async function submit(){
    let date = document.getElementById("date").value
    let idAcara = document.getElementById("idAcara").value
    let namaAcara = document.getElementById("namaAcara").value
    let deskripsi = document.getElementById("deskripsi").value
    let link = document.getElementById("link").value
    let res = await fetch(api + "api/addFolder",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tanggal: date,
            idAcara,
            namaAcara,
            deskripsiAcara:deskripsi,
            url:link,
            user: localStorage.getItem("username"),
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
        })
    })

    let json = await res.json()
    console.log(json)
    if(json.status == 200){
        alert("Berhasil menambahkan acara!")
    } else {
        alert("Gagal menambahkan acara!")
    }

}

loadData()
async function loadData() {
    if(!document.querySelector("#acara-table")){
        return
    }
    console.log("Loading Data")
    let res = await fetch(api + "api/allFolders");
    let data = await res.json();
    console.log(data.message)
    // sort by date latest to oldest, by Date(data.message[i].tanggal)
    data.message = data.message.sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal))
    if (data.status === 200) {
        let table = document.getElementById("acara-table");
        let rows = "";
        for (let i = 0; i < data.message.length; i++) {
            let json = data.message[i]
            rows += `
            <tbody>
        <tr class="bg-white">
            <td class="px-4 py-2">${json.namaAcara}</td>
            <td class="px-4 py-2">${json.idAcara}</td>
            <td class="px-4 py-2"><button data-tooltip-target="tooltip-${json.idAcara}" type="button" class="text-white bg-mpk-700 hover:bg-mpk-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Link</button>
            <div id="tooltip-${json.idAcara}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                ${json.url}
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div></td>
            <td class="px-4 py-2">${json.tanggal}</td>
            <td class="px-4 py-2"><button onclick="deleteId('${json.idAcara}')" class="btn btn-primary">Delete</button></td>
        </tr>
        </tbody>
        `;
    }
    console.log(rows)
    table.innerHTML += rows;
    table.classList.add("table-auto")
}
}


async function deleteId(e){
    let confirmation = confirm("Yakin kah ?")
    if(!confirmation) return

    let res = await fetch(api + "api/remFolder", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            idAcara:e }),
    });

    let data = await res.json()
    console.log(data)
    if(data.status === 200) {
        alert(data.message)
        document.location.reload()
    } else {
        alert(data.message)
    }

}

loadGrid()
async function loadGrid(){
    if(!document.getElementById("grid-galeri")){
        return
    }
    let res = await fetch(api + "api/allFolders");
    let data = await res.json();
    console.log(data.message)
    data.message = data.message.sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal))
    if (data.status === 200) {
        for (let i = 0; i < data.message.length; i++) {
            let json = data.message[i]

            let folderId = getDriveIdFromUrl(json.url)
            console.log(folderId)
            let dataJson = await fetch(api + "api/getFiles",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    folderId
                })        
            })
            let dataImage = await dataJson.json()
            console.log(dataImage)
            // if dataImage.files[0].mimeType == "application/vnd.google-apps.folder", loop get files again
            if(dataImage.files[0].mimeType == "application/vnd.google-apps.folder"){
                let dataJson = await fetch(api + "api/getFiles",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        folderId: dataImage.files[0].id
                    })
                })
                dataImage = await dataJson.json()
            }

            console.log(dataImage)
            let preview = dataImage.files.find((e) => e.mimeType.startsWith("image/"))

            console.log(preview)
            let grid = document.getElementById("grid-galeri")
            grid.innerHTML += `
            <div class="card w-96 mt-12 bg-base-100 shadow-xl image-full m-auto">
  <figure><img src="https://drive.google.com/uc?id=${preview.id}&export=download" /></figure>
  <div class="card-body">
    <h2 class="card-title">${json.namaAcara}</h2>
    <p>Tanggal ${(new Date(json.tanggal)).toLocaleDateString('en-GB')}</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href="./fullData.html?id=${json.idAcara}">Buka</a>
    </div>
  </div>
</div>
            `

        }
    } else {
        alert("Gagal mengambil data")
    }
}

function getDriveIdFromUrl(url) {
    // Extract the file ID from the URL
    const match = url.match(/\/([a-zA-Z0-9_-]{25,})/);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }