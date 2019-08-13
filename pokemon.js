if(process.argv.length < 3) {
    console.log("pcatch <url>");
    process.exit(0);
}

const urlPokemon = process.argv[2];

const fetch = require('node-fetch');
const ks = require('node-key-sender');
const processWindows = require("node-process-windows");
processWindows.focusWindow("discord");
processWindows.focusWindow("chrome");


fetch("https://pokecord.exchange/identify-check", 
{"credentials":"include",
"headers":{"accept":"*/*","accept-language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
"content-type":"application/x-www-form-urlencoded; charset=UTF-8","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-requested-with":"XMLHttpRequest"},
"referrer":"https://pokecord.exchange/identify",
"referrerPolicy":"no-referrer-when-downgrade","body":
`parseurl=${encodeURIComponent(urlPokemon)}`,
"method":"POST","mode":"cors"})
.then(res => res.text())
.then(res => res.replace("<div class='typewriter'>", "").replace("</div>", ""))
.then(res => `p!catch ${res}`)
.then(res =>  { 
    require('child_process').spawn('clip').stdin.end(res)
    ks.sendCombination(['control', 'v']);
    setTimeout(() => {
        ks.sendKey('enter');
    }, 100);
});