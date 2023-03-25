let converter = new showdown.Converter()

main();
async function main(){
    let res = await fetch("https://raw.githubusercontent.com/RPLSaci/Event_Osis/main/events/list.json")
    let id = new URLSearchParams(window.location.search).get("id")
    if(!id){
        document.querySelector("#nama").innerText = "Event tidak ditemukan"
        document.querySelector("#fallback").classList.toggle("hidden")
        return
    }
    let data = await res.json()
    let event = data.find(e => e.id.toLowerCase()===id.toLowerCase())
    if(!event){
        document.querySelector("#nama").innerText = "Event tidak ditemukan"
        document.querySelector("#fallback").classList.toggle("hidden")
        return 
    }
    console.log(event)
    document.querySelector("#nama").innerText = event.nama

    let CurrentEvent = await fetch(`https://raw.githubusercontent.com/RPLSaci/Event_Osis/main/events/${event.file}`)
    let text = await CurrentEvent.text()
    let Converted = converter.makeHtml(text)
    let el = document.querySelector("#main")
    el.innerHTML += Converted
}