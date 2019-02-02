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
    client.replyMessage(event.replyToken, 
      {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "imageAspectRatio": "rectangle",
            "imageSize": "contain",
            "imageBackgroundColor": "#e9967a",
            "title": "Pakenham",
            "text": "Supitcha  Naterattana",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://google.com/"
            },
            "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=123"
                },
                {
                  "type": "message",
                  "label": "Add to cart",
                  "text": "no no no"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://google.com"
                }
            ]
        }
      })
  }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})