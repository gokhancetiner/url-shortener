const bodyParser = require('body-parser')
const app = require('express')()
const shortendURL = []
app.use(bodyParser.json())
app.post('/shorten', (req, res) => {
  const URL = req.query.url;
  const shortURL = `http://localhost:3000/qwerty${shortendURL.length + 1}`
  shortendURL.push({longURL: URL, shortURL: shortURL})  
  res.json({ shortURL: shortURL })
})

app.get('/shorten', (req, res) => {
    res.json([...shortendURL ])
  })

  app.get('/shorten/:url', (req, res) => {
    const URL = req.params.url;
    let longURL= "";
    shortendURL.some(url => {
        if(url.shortURL == `http://localhost:3000/${URL}`)
            longURL = url.longURL
            return true;
    })
    res.json({longURL: longURL})
  })

module.exports = app