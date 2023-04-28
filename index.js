const PORT = 8000
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const url = 'https://www.theguardian.com/uk'

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articals = []

    $('.fc-item__title', html).each(function () {
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      articals.push({
        title,
        url
      })
    })
    console.log(articals)
  })
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
