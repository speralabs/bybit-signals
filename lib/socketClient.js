const WebSocket = require('ws');
const axios = require('axios');

const config = require('../config/config');
const logger = require('./logger');

class SocketClient {
  constructor(path, platform, symbol) {
    this.platform = platform;
    this.symbol = symbol;
    this.baseUrl = process.env.BINANCE_WEBSOCKET_URL;

    if (platform === config.platformTypes.bybit) {
      this.baseUrl = process.env.BYBIT_WEBSOCKET_URL;
    }

    this._path = path;
    this._createSocket();
    this._handlers = new Map();
  }

  _createSocket() {
    console.log(`${this.baseUrl}${this._path}`);
    this._ws = new WebSocket(`${this.baseUrl}${this._path}`);

    this._ws.onopen = () => {
      logger.info('ws connected');
      if (this.platform === config.platformTypes.bybit) {
	this._ws.send(`{"op":"subscribe","args":["candle.1.10000NFTUSDT", "candle.1.1000BTTUSDT", "candle.1.1INCHUSDT", "candle.1.AAVEUSDT", "candle.1.ADAUSDT", "candle.1.ALGOUSDT", "candle.1.ALICEUSDT", "candle.1.ANKRUSDT", "candle.1.ANTUSDT", "candle.1.ARUSDT", "candle.1.ATOMUSDT", "candle.1.AUDIOUSDT", "candle.1.AVAXUSDT", "candle.1.AXSUSDT", "candle.1.BANDUSDT", "candle.1.BATUSDT", "candle.1.BCHUSDT", "candle.1.BICOUSDT", "candle.1.BITUSDT", "candle.1.BNBUSDT", "candle.1.BSVUSDT", "candle.1.BTCUSDT", "candle.1.C98USDT", "candle.1.CELOUSDT", "candle.1.CELRUSDT", "candle.1.CHRUSDT", "candle.1.CHZUSDT", "candle.1.CKBUSDT", "candle.1.COMPUSDT", "candle.1.COTIUSDT", "candle.1.CREAMUSDT", "candle.1.CROUSDT", "candle.1.CRVUSDT", "candle.1.CTKUSDT", "candle.1.CVCUSDT", "candle.1.DASHUSDT", "candle.1.DENTUSDT", "candle.1.DOGEUSDT", "candle.1.DOTUSDT", "candle.1.DUSKUSDT", "candle.1.DYDXUSDT"]}`);

//	this._ws.send(`{"op":"subscribe","args":["candle.1.10000NFTUSDT" , "candle.1.1000BTTUSDT" , "candle.1.1INCHUSDT" , "candle.1.AAVEUSDT" , "candle.1.ADAUSDT" , "candle.1.ALGOUSDT" , "candle.1.ALICEUSDT" , "candle.1.ANKRUSDT" , "candle.1.ANTUSDT" , "candle.1.ARUSDT" , "candle.1.ATOMUSDT" , "candle.1.AUDIOUSDT" , "candle.1.AVAXUSDT" , "candle.1.AXSUSDT" , "candle.1.BANDUSDT" , "candle.1.BATUSDT" , "candle.1.BCHUSDT" , "candle.1.BICOUSDT" , "candle.1.BITUSDT" , "candle.1.BNBUSDT" , "candle.1.BSVUSDT" , "candle.1.BTCUSDT" , "candle.1.C98USDT" , "candle.1.CELOUSDT" , "candle.1.CELRUSDT" , "candle.1.CHRUSDT" , "candle.1.CHZUSDT" , "candle.1.CKBUSDT" , "candle.1.COMPUSDT" , "candle.1.COTIUSDT" , "candle.1.CREAMUSDT" , "candle.1.CROUSDT" , "candle.1.CRVUSDT" , "candle.1.CTKUSDT" , "candle.1.CVCUSDT" , "candle.1.DASHUSDT" , "candle.1.DENTUSDT" , "candle.1.DOGEUSDT" , "candle.1.DOTUSDT" , "candle.1.DUSKUSDT" , "candle.1.DYDXUSDT" , "candle.1.EGLDUSDT" , "candle.1.ENJUSDT" , "candle.1.ENSUSDT" , "candle.1.EOSUSDT" , "candle.1.ETCUSDT" , "candle.1.ETHUSDT" , "candle.1.FILUSDT" , "candle.1.FLOWUSDT" , "candle.1.FTMUSDT" , "candle.1.FTTUSDT" , "candle.1.GALAUSDT" , "candle.1.GRTUSDT" , "candle.1.GTCUSDT" , "candle.1.HBARUSDT" , "candle.1.HNTUSDT" , "candle.1.ICPUSDT" , "candle.1.ILVUSDT" , "candle.1.IMXUSDT" , "candle.1.IOSTUSDT" , "candle.1.IOTAUSDT" , "candle.1.IOTXUSDT" , "candle.1.JASMYUSDT" , "candle.1.JSTUSDT" , "candle.1.KAVAUSDT" , "candle.1.KLAYUSDT" , "candle.1.KNCUSDT" , "candle.1.KSMUSDT" , "candle.1.LINKUSDT" , "candle.1.LITUSDT" , "candle.1.LOOKSUSDT" , "candle.1.LPTUSDT" , "candle.1.LRCUSDT" , "candle.1.LTCUSDT" , "candle.1.LUNAUSDT" , "candle.1.MANAUSDT" , "candle.1.MASKUSDT" , "candle.1.MATICUSDT" , "candle.1.MKRUSDT" , "candle.1.NEARUSDT" , "candle.1.NEOUSDT" , "candle.1.OCEANUSDT" , "candle.1.OMGUSDT" , "candle.1.ONEUSDT" , "candle.1.PEOPLEUSDT" , "candle.1.QTUMUSDT" , "candle.1.RAYUSDT" , "candle.1.REEFUSDT" , "candle.1.RENUSDT" , "candle.1.REQUSDT" , "candle.1.RNDRUSDT" , "candle.1.ROSEUSDT" , "candle.1.RSRUSDT" , "candle.1.RSS3USDT" , "candle.1.RUNEUSDT" , "candle.1.RVNUSDT" , "candle.1.SANDUSDT" , "candle.1.SCUSDT" , "candle.1.SFPUSDT" , "candle.1.SHIB1000USDT" , "candle.1.SLPUSDT" , "candle.1.SNXUSDT" , "candle.1.SOLUSDT" , "candle.1.SPELLUSDT" , "candle.1.SRMUSDT" , "candle.1.STORJUSDT" , "candle.1.STXUSDT" , "candle.1.SUNUSDT" , "candle.1.SUSHIUSDT" , "candle.1.SXPUSDT" , "candle.1.THETAUSDT" , "candle.1.TLMUSDT" , "candle.1.TRXUSDT" , "candle.1.UNIUSDT" , "candle.1.VETUSDT" , "candle.1.WAVESUSDT" , "candle.1.WOOUSDT" , "candle.1.XEMUSDT" , "candle.1.XLMUSDT" , "candle.1.XMRUSDT" , "candle.1.XRPUSDT" , "candle.1.XTZUSDT" , "candle.1.YFIUSDT" , "candle.1.YGGUSDT" , "candle.1.ZECUSDT" , "candle.1.ZENUSDT" , "candle.1.ZILUSDT"]}`);
//       this._ws.send(`{"op":"subscribe","args":["candle.1.BITUSDT", "candle.1.BTCUSDT", "candle.1.ETHUSDT", "candle.1.MANAUSDT", "candle.1.SANDUSDT", "candle.1.SHIB1000USDT", "candle.1.ADAUSDT", "candle.1.BNBUSDT", "candle.1.XRPUSDT", "candle.1.SOLUSDT", "candle.1.DOTUSDT", "candle.1.DOGEUSDT", "candle.1.UNIUSDT", "candle.1.LUNAUSDT", "candle.1.AVAXUSDT", "candle.1.LINKUSDT", "candle.1.LTCUSDT", "candle.1.ALGOUSDT", "candle.1.BCHUSDT", "candle.1.ATOMUSDT", "candle.1.MATICUSDT", "candle.1.FILUSDT", "candle.1.ICPUSDT", "candle.1.ETCUSDT", "candle.1.XLMUSDT", "candle.1.VETUSDT", "candle.1.AXSUSDT", "candle.1.TRXUSDT", "candle.1.FTTUSDT", "candle.1.XTZUSDT", "candle.1.THETAUSDT", "candle.1.HBARUSDT", "candle.1.EOSUSDT", "candle.1.AAVEUSDT", "candle.1.NEARUSDT", "candle.1.FTMUSDT", "candle.1.KSMUSDT", "candle.1.OMGUSDT", "candle.1.IOTXUSDT", "candle.1.DASHUSDT", "candle.1.COMPUSDT", "candle.1.ONEUSDT", "candle.1.CHZUSDT", "candle.1.LRCUSDT", "candle.1.ENJUSDT", "candle.1.XEMUSDT", "candle.1.SUSHIUSDT", "candle.1.DYDXUSDT", "candle.1.SRMUSDT", "candle.1.CRVUSDT", "candle.1.IOSTUSDT", "candle.1.CELRUSDT", "candle.1.CHRUSDT", "candle.1.WOOUSDT", "candle.1.ALICEUSDT", "candle.1.ENSUSDT", "candle.1.C98USDT", "candle.1.GALAUSDT", "candle.1.KEEPUSDT", "candle.1.SLPUSDT", "candle.1.ROSEUSDT"]}`);

//        this._ws.send(`{"op":"subscribe","args":["candle.1.BTCUSDT", "candle.1.ADAUSDT", "candle.1.ETHUSDT", "candle.1.SHIB1000USDT", "candle.1.XRPUSDT", "candle.1.SOLUSDT", "candle.1.AXSUSDT", "candle.1.AVAXUSDT", "candle.1.BNBUSDT", "candle.1.CHZUSDT", "candle.1.OMGUSDT", "candle.1.SANDUSDT", "candle.1.DOTUSDT", "candle.1.ENJUSDT", "candle.1.BITUSDT", "candle.1.DOGEUSDT", "candle.1.ADAUSDT", "candle.1.LINKUSDT", "candle.1.ALICEUSDT", "candle.1.FTMUSDT", "candle.1.ONEUSDT", "candle.1.DYDXUSDT", "candle.1.LTCUSDT", "candle.1.ICPUSDT", "candle.1.MATICUSDT", "candle.1.CRVUSDT", "candle.1.LUNAUSDT", "candle.1.VETUSDT", "candle.1.XTZUSDT", "candle.1.EOSUSDT", "candle.1.SUSHIUSDT", "candle.1.ATOMUSDT", "candle.1.XEMUSDT", "candle.1.ETCUSDT", "candle.1.NEARUSDT", "candle.1.FTTUSDT", "candle.1.KSMUSDT", "candle.1.BCHUSDT", "candle.1.UNIUSDT", "candle.1.FILUSDT", "candle.1.AAVEUSDT", "candle.1.COMPUSDT", "candle.1.SRMUSDT", "candle.1.XLMUSDT", "candle.1.C98USDT", "candle.1.THETAUSDT", "candle.1.CELRUSDT", "candle.1.IOSTUSDT", "candle.1.ALGOUSDT", "candle.1.TRXUSDT", "candle.1.HBARUSDT", "candle.1.DASHUSDT"]}`);
  
//	this._ws.send(`{"op":"subscribe","args":["candle.1.BTCUSDT", "candle.1.ADAUSDT", "candle.1.ETHUSDT", "candle.1.BNBUSDT", "candle.1.DOGEUSDT", "candle.1.LTCUSDT", "candle.1.BCHUSDT", "candle.1.DOTUSDT", "candle.1.UNIUSDT", "candle.1.XRPUSDT", "candle.1.SOLUSDT", "candle.1.MATICUSDT", "candle.1.EOSUSDT", "candle.1.ETCUSDT", "candle.1.XTZUSDT", "candle.1.AAVEUSDT", "candle.1.SUSHIUSDT", "candle.1.LINKUSDT", "candle.1.XEMUSDT", "candle.1.ALGOUSDT", "candle.1.FTMUSDT", "candle.1.AVAXUSDT", "candle.1.THETAUSDT", "candle.1.XLMUSDT", "candle.1.TRXUSDT", "candle.1.COMPUSDT", "candle.1.ICPUSDT", "candle.1.FILUSDT"]}`);
    }
    };

    this._ws.on('pong', () => {
      // logger.debug('receieved pong from server');
    });
    this._ws.on('ping', () => {
      // logger.debug('==========receieved ping from server');
      this._ws.pong();
    });

    this._ws.onclose = () => {
      logger.warn('ws closed');
      //reopen
//      this._ws.send(`{"op":"subscribe","args":["candle.1.BTCUSDT", "candle.1.ETHUSDT", "candle.1.BNBUSDT", "candle.1.ADAUSDT", "candle.1.DOGEUSDT", "candle.1.XRPUSDT", "candle.1.DOTUSDT", "candle.1.UNIUSDT", "candle.1.BCHUSDT", "candle.1.LTCUSDT", "candle.1.SOLUSDT", "candle.1.LINKUSDT", "candle.1.MATICUSDT", "candle.1.ETCUSDT", "candle.1.EOSUSDT", "candle.1.AAVEUSDT", "candle.1.XTZUSDT", "candle.1.SUSHIUSDT", "candle.1.XEMUSDT"]}`);

      this._createSocket();  
  }; 
    
    this._ws.onerror = (err) => {
      logger.warn('ws error', err);
    };

    this._ws.onmessage = (msg) => {
      try {
        const message = JSON.parse(msg.data);
        axios
          .post(this.platform === config.platformTypes.binance ? process.env.RESPONSE_URL + '/binance'
            : process.env.BYBIT_RESPONSE_URL, {
            access_key: this.userId || undefined,
            data_set: JSON.stringify(message),
            platform: this.platform,
          })
          .then((res) => {
//             console.log(`statusCode: ${res.statusCode}`);
//            console.log(res);
          })
          .catch((error) => {
             console.error(error);
          });
      } catch (e) {
        logger.warn('Parse message failed', e);
      }
    };

    this.heartBeat();
  }

  heartBeat() {
    setInterval(() => {
      if (this._ws.readyState === WebSocket.OPEN) {
        this._ws.ping();
        // logger.debug('ping server');
      }
    }, 5000);
  }

  setHandler(method, callback) {
    if (!this._handlers.has(method)) {
      this._handlers.set(method, []);
    }
    this._handlers.get(method).push(callback);
  }
}

module.exports = SocketClient;
