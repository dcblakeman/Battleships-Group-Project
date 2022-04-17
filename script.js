// Battleship
// Given a 5x5 grid, guess which coordinates the enemy ship is located at
// Starting with only one ship location which is 3 spaces long

// Declare global variables for game
const cruiser = ['a1','b1','c1']   // ship location in array format
const battleship = ['e2','e3','e4','e5']
const destroyer = ['a4','b4']
let hitLoc = []          // track successful attempts
let failedLoc = []       // track failed attempts
let guessCache = []

// Variables for grid
let xAxis = [' ',1,2,3,4,5]
let a = ['A']
let b = ['B']
let c = ['C']
let d = ['D']
let e = ['E']

// Loop to create grid
for (let i = 0; i <= 4; i++) {
  a.push('~')
  b.push('~')
  c.push('~')
  d.push('~')
  e.push('~')
}

// invoke function to print a new grid
function printGrid() {
  console.log(xAxis.join(' '))
  console.log(a.join(' '))
  console.log(b.join(' '))
  console.log(c.join(' '))
  console.log(d.join(' '))
  console.log(e.join(' '))
}

// Function to run the game
function runGame () {
  
  let shipSunk = false     // boolean for game completion
   alert(`Welcome to BATTLESHIP\n\nYour mission is to destroy the enemy's fleet of warships.\nThere are 3 ships hidden among these waters.\nEach ship will require a different number of hits to sink it:\n\n   The Destroyer: 2 hits\n   The Cruiser: 3 hits\n   The Battleship: 4 hits\n\nFire missiles at different coordinates to sink each ship.\nHits will be marked with an X, while misses will be marked with a 0.\nOnce you sink all of the ships, you win the battle!\n`)
  alert(`  1 2 3 4 5\nA ~ ~ ~ ~ ~\nB ~ ~ ~ ~ ~\nC ~ ~ ~ ~ ~\nD ~ ~ ~ ~ ~\nE ~ ~ ~ ~ ~\n`)
  // while loop to play game until ship has been sunk
  while (!shipSunk) {
  
    const userInput = prompt('What location would you like to fire at?')  // user input for coords

    // if (userInput[1] > 5) alert('---Please enter a number from 1 to 5---')
    
    if (!guessCache.includes(userInput)) {
      const yAxis = userInput[0]  // input y-axis
      const xAxis = userInput[1]  // input x-axis

      guessCache.push(userInput)
      
      fireTorpedo(yAxis, xAxis)  // invoke function to fire torpedo
  
      // console.log(hitLoc.includes(...cruiser))
      
      printGrid()  // prints grid
      
      if (isGameComplete(cruiser, battleship, destroyer)) { shipSunk = true } 

    } else {
      alert('You already guessed this coordinate! Try again.')
    }
  }
  
  alert('Congratulations! You sunk the ships!')
  // playAgain = prompt('Would you like to play again? -- Y or N')

  // if (playAgain === 'Y') runGame()
  // if (playAgain === 'N') alert('Thanks for playing!')
}

// Input: yAxis and xAxis where yAxis is a letter from a-e and xAxis is number 1-5
// Output: 
function fireTorpedo(yAxis, xAxis) {
  let hit = false   // local boolean to identify if hit
  
  // Check if the torpedo hit ship
  if (cruiser.indexOf(yAxis + xAxis) !== -1) {
        alert('BOOOOM! You hit the cruiser ship at: ', yAxis,xAxis)
        hitLoc.push(yAxis+xAxis)  // push hit location to hitLoc
        hit = true                
        // console.log(hitLoc)
    } else if (battleship.indexOf(yAxis + xAxis) !== -1) {
        alert('BOOOOM! You hit the battleship ship at: ', yAxis,xAxis)
        hitLoc.push(yAxis+xAxis)  // push hit location to hitLoc
        hit = true                
        // console.log(hitLoc)
    } else if (destroyer.indexOf(yAxis + xAxis) !== -1) {
        alert('BOOOOM! You hit the destroyer ship at: ', yAxis,xAxis)
        hitLoc.push(yAxis+xAxis)  // push hit location to hitLoc
        hit = true                
        // console.log(hitLoc)
    } else {
        alert('You missed with guess:',yAxis,xAxis)
        failedLoc.push(yAxis,xAxis)  // store failed coords in array
        hit = false
    }
  
  // Failed attempt
  // ressign the coordinates with X
  if (!hit) {
    if (yAxis === 'a') {
      a[xAxis] = 0
    } else if (yAxis === 'b') {
      b[xAxis] = 0
    } else if (yAxis === 'c') {
      c[xAxis] = 0
    } else if (yAxis === 'd') {
      d[xAxis] = 0
    } else if (yAxis === 'e') {
      e[xAxis] = 0
    }
  }

  // Hit Attempt
  // ressign the coordinates with 1
  if (hit) {
    if (yAxis === 'a') {
      a[xAxis] = 'X'
    } else if (yAxis === 'b') {
      b[xAxis] = 'X'
    } else if (yAxis === 'c') {
      c[xAxis] = 'X'
    } else if (yAxis === 'd') {
      d[xAxis] = 'X'
    } else if (yAxis === 'e') {
      e[xAxis] = 'X'
    }
  }
}

// Function to check if game is complete
function isGameComplete(ship1, ship2, ship3) {
  const mergeShips = [...ship1, ...ship2, ...ship3]  // merge input arrays to one array
  let hitCount = 0

  for (let i = 0; i < mergeShips.length; i++) {
    if (hitLoc.includes(mergeShips[i])) hitCount++
  }

  if (hitCount === mergeShips.length) {
    return true
  }
  return false

}

// function to check if all ships have been hit
runGame()