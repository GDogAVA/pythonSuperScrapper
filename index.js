const PORT = 8000
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const url = 'https://social.msdn.microsoft.com/Forums/azure/en-US/user/threads?user=Gary%20Gallanes%20%5BHCL%20Technologies%5D'

axios(url)
  .then(response => {
    const html = response.data
    console.log(html)
  }
  )
  /*  const $ = cheerio.load(html)
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
  })*/
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
