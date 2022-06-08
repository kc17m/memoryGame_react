
import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import GameOver from './components/GameOver';




//cards array as global constant, of src objects with card file name, to be used globally throughout this app:
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([]) //cards array to map through to show cards
  const [turns, setTurns] = useState(0) //to be increased by 1 with every attempt
  const [choiceOne, setChoiceOne] = useState(null) //will be updated with the card user choses
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) //to set timeout between attempts
  const [matches, setMatches] = useState(0)

  //duplicate each card once: 12 cards in total
  //then randomize order of these cards

  const shuffleCards = () => {
    const shuffleCardsArr = [...cardImages, ...cardImages] //2x spread operator to duplicate array
    .sort(() => Math.random() - 0.5) //sort by random number, greater or less than 0 -> random sort order
    .map((card) => ({...card, id: Math.random()}) ) //add random id to each object

    setChoiceOne(null) //to always begin with null cards selected
    setChoiceTwo(null)
    setCards(shuffleCardsArr) //new array of duplicated, shuffled cards with id
    
    setTurns(0) // resets turns to 0 with click on New Game
    setMatches(0)  
  }

  // handle a choice and pass this down to SingleCard comp as prop
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // if setChoiceOne has value: it happened before and selected card will be Choice2

  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

 //compare two selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
       setDisabled(true)      

       if (choiceOne.src === choiceTwo.src) {
             console.log("match!!")
             setMatches(prevMatches => prevMatches + 1)
            
             
            
         setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
             
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })        
         }
         else {
           console.log("no match")           
         }
         setTimeout(() => resetTurn(), 1000)
    }
 
  }, [choiceOne, choiceTwo, setMatches])
   console.log("matches count", matches)

  console.log(cards);

   // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
    
    
  }
  



  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice = {handleChoice}
          flipped = {card === choiceOne || card === choiceTwo  || card.matched}
          disabled = {disabled}
          />        
        ) )}
      </div>
      <p>Turns: {turns}</p>
      <p>Match: {matches}</p>
      {matches === 6 && <GameOver turns={turns} shuffleCards={shuffleCards} />}
      
    </div>
  );
}

export default App;
