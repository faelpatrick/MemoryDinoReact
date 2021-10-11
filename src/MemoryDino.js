import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import game from "./game/game";
import SoundEfect from "./components/Sound";

export default function MemoryDino() {

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([])

    useEffect(() => {
        setCards(game.createCardsFromTechs())
    }, [])

    function restart() {
        game.clearCards()
        setCards(game.createCardsFromTechs())
        setGameOver(false)
    }

    function handleFlip(card) {

        game.flipCard(card.id, () => {
            //GameOverCallBack
            setGameOver(true)
        
        }, () => {
            //NoMatchCallback
            setCards([...game.cards])
        
        })
        setCards([...game.cards])
    }

    return (
        <div>
            <SoundEfect></SoundEfect>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    )
}