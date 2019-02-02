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
            "thumbnailImageUrl": "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjx4dK5yJzgAhUDqo8KHbLKBkEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fsky%2F&psig=AOvVaw0-uQkem7zefLzRHGqVdujZ&ust=1549180292163682",
            "imageAspectRatio": "rectangle",
            "imageSize": "contain",
            "imageBackgroundColor": "#FFFFFF",
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