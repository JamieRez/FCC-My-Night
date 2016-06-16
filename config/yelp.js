var yelp = require('node-yelp');

var client = yelp.createClient({
  oauth: {
    "consumer_key": "cwNh48IkMlPXEODB5EEpUw",
    "consumer_secret": "c73xP5GuD4h_Q0AuVX64NnRzWbM",
    "token": "onDggm2MW8Ifma2p4XXzGYUARrnB3FKF",
    "token_secret": "ZdxvS66EhKnwDNJl8oq3ud-gZdc"
  }
});

module.exports = {client};
