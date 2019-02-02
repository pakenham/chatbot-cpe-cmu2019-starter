const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const app = express()
const Client = require('@line/bot-sdk').Client;

const config = {  // get from  dev.line  channel
  channelAccessToken: '036kzdBV0KYG34YGdNgK7z67uRBAyO9lFC4+fZZUIVBFxnmL95edZKw0kbqfxSbafOBTgd4U6Mfm8hrKhtd6xsflRBUGY5l8ESd6ROn0BaIE3bg4JMlK2CjsnxGxGXQW6wJHAhJiu793HXdZl2P7eAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e6f48551c7fce914aa23a62bbab1b948'
}

const client = new Client(config)

app.get('/', function (req, res) {
    res.send('Hello World!!')
  
})

// to do here
app.post('/webhook', middleware(config), (req, res) => {
  const event = req.body.events[0];  // received message

  if (event.type === 'message') {
    const message = event.message;  // store received message
    console.log(message)
    client.replyMessage(event.replyToken, { // reply fn
      type: 'text',
      text: message.text  
    });
  }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})