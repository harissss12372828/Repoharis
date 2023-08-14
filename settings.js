const fs = require('fs')
const chalk = require('chalk')

global.owner = ['6283865380586'] 
global.bugrup = ['6283865380586'] 
global.packname = '𝙵𝙰𝚄𝚉𝙰𝙽' //nama lu
global.author = '𝙵𝙰𝚄𝚉𝙰𝙽 𝚂𝚃𝙾𝚁𝙴 ✓' //nama lu
global.domain = "https://murah.panelbotwa.my.id" // domain lu (pakai https)
global.apikey = 'ptla_KSv0j0WBr8GwiMyLC5aRYvmjeZKkGIyJlAGZqEtQAen' //apikey ptla lu
global.capikey = 'ptlc_ZP35Lup1huQkmwkZrFsJKonhnz7yAdNYxFFrwdsIubu' // apikey ptlc lu

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})

// SILAHKAN SETTING SESUAI PERINTAH //