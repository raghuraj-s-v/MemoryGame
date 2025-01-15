import { useState } from "react";
import Header from "./Header";

function Card({ imagesJson }) {
    const [imageArr, setImageArray] = useState(imagesJson);
    const [curScore, setCurrentScore] = useState(0);
    const [prevId, setPrevId] = useState(new Set());

    const handleCardClick = (id) => {
        // Shuffle the image array
        const newImageArray = [...imageArr];
        newImageArray.sort(() => Math.random() - 0.5);
        setImageArray(newImageArray);

        // Check if the card has been clicked before
        if (prevId.has(id)) {
            setCurrentScore(0);
            setPrevId(new Set()); // Reset the previously clicked IDs
            alert("You clicked the same card! Score reset.");
        } else {
            const newPrevId = new Set(prevId);
            newPrevId.add(id);
            setPrevId(newPrevId);
            setCurrentScore(curScore + 1);
        }
    };

    return (
        <>
            <Header curScore={curScore}/>
            <div>
                <h1 style={{paddingLeft:"37%"}}>Memory Card Game</h1>
                <ul style={styles.cardList}>
                    {imageArr.map((pokemon) => (
                        <li
                            key={pokemon.id}
                            onClick={() => handleCardClick(pokemon.id)}
                            style={styles.card}
                        >
                            <img
                                src={pokemon.url}
                                alt={`Pokemon ${pokemon.id}`}
                                style={styles.image}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
const styles = {
    cardList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)', // 6 columns
      gap: '10px', // Spacing between cards
      padding: '20px',
      listStyleType: 'none', // Removes bullet points from list
      margin: 0, // Removes default margin
    },
    card: {
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center', // Centers the image and any additional text
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow for a polished look
      backgroundColor: '#f9f9f9',
      transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px', // Matches card's border-radius
    },
  };
  

export default Card;
