import fetch from 'node-fetch'

const urls = {
  quote: 'https://zenquotes.io/api/random',
  joke: 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist',
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=-33.8678&longitude=151.2073&current_weather=true&timezone=Australia%2FSydney',
  word: 'https://random-word-api.vercel.app/api?words=1'
}

const weatherCodes = {
  0: ' ☀️ (Clear Sky)',
  1: ' ☀️ (Mainly Clear)',
  2: ' 🌤️ (Partly Cloudy)',
  3: ' ⛅ (Mostly Cloudy)',
  45: ' 🌫️ (Fog)',
  51: ' 🌧️ (Light Drizzle)',
  53: ' 🌧️ (Moderate Drizzle)',
  55: ' 🌧️ (Heavy Drizzle)',
  61: ' 🌧️ (Light Rain)',
  63: ' 🌧️ (Moderate Rain)',
  65: ' 🌧️ (Heavy Rain)',
  80: ' 🌧️ (Light Showers)',
  81: ' 🌧️ (Moderate Showers)',
  82: ' 🌧️ (Heavy Showers)'
}

class ApiHandler {
  async getQuote () {
    const res = await fetch(urls.quote)
    const data = await res.json()
    return `"${data[0].q}" **- ${data[0].a}**`
  }

  async getJoke () {
    const res = await fetch(urls.joke)
    const data = await res.json()
    if (data.type === 'single') return data.joke
    else return `${data.setup}\n${data.delivery}`
  }

  async getWeather () {
    const res = await fetch(urls.weather)
    const data = await res.json()
    const curData = data.current_weather
    const temperature = curData.temperature
    const weatherCode = parseInt(curData.weathercode)
    const weather = weatherCodes[weatherCode]
    const time = curData.time.split('T')[1] // e.g."2022-07-01T09:00" -> Removes date
    let output = `**Temperature:** ${temperature}°C\n`
    output += `**Weather:** ${weather}\n`
    output += `**Time:** ${time} AEST`
    return output
  }

  async getWord () {
    try {
      const res = await fetch(urls.word)
      const data = await res.json()
      const word = data[0].charAt(0).toUpperCase() + data[0].slice(1)
      
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const dictData = await dictRes.json()
      
      // Check if the dictionary API returned valid data
      if (!dictData || !Array.isArray(dictData) || dictData.length === 0) {
        return `**Word:** ${word}\n**Definition:** Sorry, no definition found for this word.`
      }
      
      const meanings = dictData[0].meanings
      if (!meanings || meanings.length === 0 || !meanings[0].definitions || meanings[0].definitions.length === 0) {
        return `**Word:** ${word}\n**Definition:** Sorry, no definition found for this word.`
      }
      
      const definition = meanings[0].definitions[0].definition
      const example = meanings[0].definitions[0].example || 'No example available'
      
      return `**Word:** ${word}\n**Definition:** ${definition}\n**Example:** ${example}`
    } catch (error) {
      console.error('Error fetching word:', error)
      return 'Sorry, there was an error fetching a word. Please try again later.'
    }
  }
}

const apiHandler = new ApiHandler()

export default apiHandler
