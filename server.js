const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()


app.get('/scrape', (req, res) => {
  const url = 'http://www.imdb.com/title/tt1229340/';
  let retorno = { titulo: "", lancamento: "", avaliacao: "" }

  request(url, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);

      $('.title_wrapper').filter(function() {
        retorno.titulo = $(this).children().first().text().trim();
        retorno.lancamento = $(this).children().last().children().last().text().trim();
      })

      $('.ratingValue').filter(function() {
        retorno.avaliacao = $(this).text().trim();
      })
    }

    fs.writeFile('imdb_title_tt1229340.json', JSON.stringify(retorno, null, 4), function(err) {
      console.log('Arquivo gravado com sucesso. Verifique o diretório do projeto.');
    })

    res.send('Verifique a saída do console.')
  })
})

app.set('port', process.env.PORT || '8909')
app.listen(app.get('port'))

console.log(`Ouvindo na porta: ${app.get('port')}`)

exports = module.exports = app