const mineflayer = require('mineflayer')
const dayjs = require('dayjs')
const fs = require('fs')
const config = require('./config.json')
let bot
let timer
let oldTimer
let introMessageSent = false
timer = null

const knownBots = [
  'uptime_check',
  '_shadowing',
  'bozo01001100',
  'Mr_Sus_',
  'GoofyAahhhhh',
  'wubblies',
  'e4t_',
  'matdoesdev',
  'N00bBot',
  'Live0verflow',
  'cat_test',
  'HonbraDev'
]

const whitelistedBots = ['Mr_Sus_', 'matdoesdev']

const blockedUsers = []

async function startBot () {
  if (config.server.online) {
    bot = mineflayer.createBot({
      host: config.server.host,
      port: config.server.port,
      username: config.server.username,
      auth: 'microsoft'
    })
  } else {
    bot = mineflayer.createBot({
      host: config.server.host,
      port: config.server.port,
      username: config.server.username
    })
  }
  bindEvents(bot)
}

async function bindEvents (bot) {
  // to allow the JavaScript code to run. This should never be undefined, but if it is it will error and then cleanly exit
  if (bot == (undefined || null)) {
    console.error(`bot is ${bot}. THIS SHOULD NEVER HAPPEN. exiting`)
    bot = function () {}
    bot.on = function () {}
  }

  bot.on('spawn', () => {
    bot.chat(
      `Hello, world! I'm online. Made by JBMagination#5512 - type ${config.prefix}help for a list of commands`
    )
    setTimeout(() => {
      introMessageSent = true
    }, 1)
  })

  bot.on('playerJoined', (player) => {
    if (player.username == 'uptime_check') {
      bot.chat(
        `Uptime check: I'm active! Type ${config.prefix}help for a list of commands`
      )
    }
  })

  async function commands (username, message, whisper) {
    if (message.startsWith(`${config.prefix} `)) return
    else if (
      knownBots.includes(username) &&
      !whitelistedBots.includes(username)
    ) {
    } else if (blockedUsers.includes(username)) return
    else {
      if (message.startsWith(`${config.prefix}`)) {
        message = message.substring(config.prefix.length)
        console.log(message)
      }
      console.log(message)
      if (message == 'help' || message.startsWith('help ')) {
        bot.whisper(
          username,
          `${config.prefix}online, ${config.prefix}hashcheck, ${config.prefix}seed, ${config.prefix}source`
        )
      } else if (message == 'seed' || message.startsWith('seed ')) {
        bot.whisper(
          username,
          "The seed of the server is LiveOverflow61374546 (or 64149200) - See the original video 'They Cracked My Server!' at https://youtu.be/gSxcDYCK_lY"
        )
      } else if (message == 'source' || message.startsWith('source ')) {
        bot.whisper(
          username,
          'The source code for the bot can be found at https://github.com/jbmagination/UnLagMachine'
        )
      }
      // #region | +hashcheck
      else if (message.startsWith('hashcheck')) {
        // #region | Known Honeypot Hashes
        const honeypotHashes = [
          '946C329913A360435724E3C587931A1900B47EEC1EFDA7BD9139AF923405A293',
          '18F3919235CED2C8791D6055D5CBF70C53F3E8BDD4FD5F0A6A9F6BCFF667F12D',
          '39AAD1340C9CDD1C6929546A30552AD22012091D73A54A1E7659D4125B905468',
          'AF2F265DB720BFB7AA2389C058F3E22A5D4191C4E92D4D194C672A9255E8143E',
          '8425C094A3FB2F5E27D73EE35B457F0D025440762C2F60E443BABD4A7B8664E4',
          '5D3CCA7E3B91E3D2B5F22311C34A42CB79CBBAF5EE193C90E94FDB7132CE7CDE',
          '12DCDFE2876AD581F9A621745168232890E1E6419002EAFC8142E6FDFCFC8A8D',
          'A51B3FAC4EAA3F4065295144EEFCCC78740AEDF70B24EC3CD2351A5055A3CEA6',
          '7D78BE52E6FE96206A4A6721EBCC8AD4DC179D1963A85B7FB6773A9E40569ABE',
          '90179D797613552C3943E246E10B36A74A02E4FA50E0777E2E3114AA02457DA5',
          '7905D501DB0E40971049AA1D7DA8D69A82DB72DA58F6ADE6CAEA0BB26A40A0FB',
          '6D9CD92A28C28768B28BFE398E1BDE832EDEFEE54B0DE55EA20DF89024FBB045',
          '20C245963E02E664F4314D4EB83F10AA4F84EA4B0AE81C45A33B28F3AB88578D',
          'CA0FF0CBE1C6F750DD9EB5D2147FBA350F35939609564B787B651EBBDF375C7F',
          'F1D33D26E541B69C79AB62382A73AE6CFD2C093A00E73856C696DA97DFE9EB4A',
          '274A4ABB4EA82B39ECF1DEEE83935E8C4F0108E1F7642DE9F7D58B36339E5553',
          '4CCBBAA426CC1159FA5FAA39C64F9AA29AFA182A7A181C151ECA26C390946AA4',
          '1E20634F14706FA289C674E6C870A61488A73D95B0E3A71F24E425C8E186F130',
          '7404DD22B4FEB4742588602FB77EA264F01B9DB6DC0AA14CBBEBA0D14F652D3B',
          '1C95C353DEF35E36A9C44AB533DCAD3AA03A1274A49C4EB6B47457272C772628',
          'F527346E831CD289D48CC86594722700DBDBFF6520B35273D78594EC4E9D4680',
          'AC55F6D09FF46609F31840ED1F7EE737181DA45B388327EB9E313DA2AA61B7A2',
          '7C8D67029DE6EEF1FABA7D7B540568B6A3DD63C24D9BA847775680B984AA32BA',
          'CAA6D539F541F84562FB2D5F3CF2D370AD336B25FA62C02EEB7D01348379C1BA',
          'C9EE4D31F9C7FBC481DD3D335CB90558A001910FF265D6B18342A95E2078BF5E',
          'C92083389B29B4F294A0F4D2283D001E31C01CC8B2F7F501DBCB02725C1F867F',
          'D5A5F67436CEE38CB00F7F3DF8F1B1781004C53BE2D299405E4B0EF5067485CE',
          'D43D0955907BBE80332F90CD52011C05AF9B763DC378F890F92347C4382E7DCD',
          '694C5570162B8E7394344BD3E79BDBE613F6A0B3F3C7DD7CB0C2D0F50210DCFF'
        ]
        // #endregion

        const args = message.slice('hashcheck'.length).trim().split(' ')
        if (args[0]) {
          if (
            args[0].toUpperCase() ==
              '52BD67D817FD3A62ACF32E4EDC84A5210C160F63A9323C13FDE213FAF5E1A7B7' ||
            args[0].toUpperCase() ==
              'C712BF5213704EC4D11790730480579B3FD9E20F8B4F38D61ABE9D2D76499746'
          ) {
            console.log(`${username} scanned the real IP hash`)
            bot.whisper(
              username,
              "This hash matches the real IP! If this hash is of the IP you're connected with, then you're safe."
            )
          } else if (
            args[0].toUpperCase() ==
              '099FDEAF848A3286FF6EBDB082283571F8DC72B0F3F692A666940BB3C2B4F371' ||
            args[0].toUpperCase() ==
              'C7D7E3CDD244865B043519E47AE0D923E4C8BD8DDB8934E110B5C0E3E8006774'
          ) {
            console.log(`${username} scanned the old IP hash`)
            bot.whisper(
              username,
              "This hash matches the *old* IP! If this hash is of the IP you're connected with, then you may be connected through a honeypot."
            )
          } else if (
            args[0].toUpperCase() ==
              '12CA17B49AF2289436F303E0166030A21E525D266E209267433801A8FD4071A0' ||
            args[0].toUpperCase() ==
              '723EC3738011F5417ABC2CFCD0AB6DA6ECC67E97918FC189EE4E5C98152CEA2A'
          ) {
            console.log(`${username} scanned the loopback hash`)
            bot.whisper(
              username,
              "This hash is a loopback! You're definitely not connecting through this IP (...probably)"
            )
          } else if (honeypotHashes.includes(args[0].toUpperCase())) {
            console.log(`${username} scanned a known honeypot IP hash`)
            bot.whisper(
              username,
              'This hash matches a known honeypot IP. You may experience frequent disconnects and timeouts, although you will still be able to play on the server. Your public IP will be made known to the honeypot (although this applies to the real server too!)'
            )
          } else {
            console.log(
              `${username} scanned an unknown hash - ${args[0].toUpperCase()}`
            )
            bot.whisper(
              username,
              "This hash is not known, but if this hash is of the IP you're connected with, then it's almost guaranteed that you're connected through a honeypot."
            )
            bot.whisper(
              username,
              'You may experience frequent disconnects and timeouts, although you will still be able to play on the server. Your public IP will be made known to the honeypot (although this applies to the real server too!)'
            )
          }
        } else {
          bot.whisper(
            username,
            `Put the IP you're connecting to this server with in https://coding.tools/sha256 - then paste the "hash" it gives back to you as an argument for this command: ${config.prefix}hashcheck <hash>`
          )
        }
      }
      // #endregion

      // #region | +online
      else if (message === 'online') {
        let botCount
        let playerCount
        let playerList
        let players = 'players'
        let bots = 'bots'
        botCount = 0
        playerCount = 0
        playerList = []

        Object.keys(bot.players).forEach((player) => {
          if (knownBots.includes(player) || player == bot.username) {
            console.log(`Adding ${player} to bot count`)
            botCount = botCount + 1
            if (botCount == 1) bots = 'bot'
          } else {
            console.log(`Adding ${player} to player count`)
            playerCount = playerCount + 1
            console.log(`Adding ${player} to player list`)
            playerList.push(player)
            if (playerCount == 1) players = 'player'
          }
        })
        bot.whisper(
          username,
          `${playerCount} ${players} (excluding ${botCount} ${bots}, ${
            Object.keys(bot.players).length
          } members total): ${playerList.join(', ')}`
        )
      }
      // #endregion
      else if (whisper == true) {
        bot.whisper(
          username,
          `Hi, ${username}! I'm a bot. Whisper me '${config.prefix}help'  or 'help' to get a list of commands.`
        )
      }
    }
  }

  bot.on('chat', (username, message) => {
    oldTimer = timer
    timer = dayjs()
    if (dayjs(oldTimer).unix() == dayjs(timer).unix()) return
    if (message.startsWith(`${config.prefix}`)) {
      commands(username, message, false)
    } else if (message.startsWith('!bot')) {
      bot.chat(
        `Hello, ${username}! Run ${config.prefix}help to get a list of commands.`
      )
    } else if (
      (message.includes('timeouts') || message.includes('timed out')) &&
      username !== bot.username
    ) {
      bot.chat(
        `This is an automated response. ${username}, if you're getting frequent timeouts then you may be on a honeypot. Run ${config.prefix}hashcheck to figure out whether or not you are.`
      )
    }
  })

  bot.on('whisper', (username, message) => {
    oldTimer = timer
    timer = dayjs()
    if (dayjs(oldTimer).unix() == dayjs(timer).unix()) return
    commands(username, message, true)
  })

  bot.on('kicked', function (reason) {
    console.log(`The bot was kicked for ${reason}`)
    bot.quit()
    bot.end()
    setTimeout(startBot, 5000)
  })
}

startBot(bot)
