let api = "https://moonlgh-orange-space-chainsaw-j94649gpgq6frq6-8080.preview.app.github.dev/"

async function login(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let data = await fetch(api + "api/login",{
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    let json = await data.json()

    if(json.status == 200){
        alert("Login successful!")
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        document.location.href = "./galeri/index.html"
    } else {
        alert("Login failed!")
    }
}