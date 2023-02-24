async function main(){let n=await fetch("https://raw.githubusercontent.com/MoonLGH/templateTailwind/main/package.json");for(var e in n=await n.json(),n=n.dependencies,n)n.hasOwnProperty(e)&&(console.log(e+" -> "+n[e]),document.querySelector("#Deps").innerHTML+=`<span>${e} Version ${n[e]}</span><br>`)}main();
//# sourceMappingURL=index.0fbeb79d.js.map
