class MiniGameHandler {
  constructor () {
    this.game = null // no game initially
  }

  async play (input) {
    const [msg, finished] = this.game.play(input)
    if (finished) this.game = null
    return msg
  }

  async playGuessTheNumber () {
    this.game = new GuessTheNumber('GuessTheNumber', null, null)
    return 'Guess the number between 1-10'
  }

  async playHeadsOrTails () {
    this.game = new HeadsOrTails('HeadsOrTails', null, null)
    return 'Choose Heads or Tails!'
  }
}

class MiniGame {
  constructor (name, players, teams) {
    this.name = name
    this.players = players
    this.teams = teams
  }

  play (input) {
    return ['', true]
  }
}

class GuessTheNumber extends MiniGame {
  constructor (name, players, teams) {
    super(name, players, teams)
    this.randomNumber = Math.floor(Math.random() * 10) + 1
    this.min = 1
    this.max = 10
  }

  play (input) {
    if (isNaN(parseInt(input))) {
      return ['Invalid number!', false]
    }

    const number = parseInt(input)
    if (number < this.min || number > this.max) {
      return [`Choose between ${this.min} - ${this.max}`, false]
    } else if (number === this.randomNumber) {
      return ['Congrats!', true]
    } else if (number > this.randomNumber) {
      this.max = number - 1
      return ['Guess lower..', false]
    } else {
      this.min = number + 1
      return ['Guess higher..', false]
    }
  }
}

class HeadsOrTails extends MiniGame {
  constructor (name, players, teams) {
    super(name, players, teams)
    this.result = Math.random() < 0.5 ? 'Heads' : 'Tails'
  }

  play (input) {
    if (input.toLowerCase() === this.result.toLowerCase()) {
      return ['You guessed it right!', true]
    } else {
      return [`Wrong! It was ${this.result}.`, true]
    }
  }
}

const minigameHandler = new MiniGameHandler()

export default minigameHandler
