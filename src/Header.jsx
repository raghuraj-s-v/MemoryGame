import { useState, useEffect } from "react";

function Header({curScore}) {
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        if (curScore > bestScore) {
            setBestScore(curScore);
        }
    }, [curScore]); 

    return (
        <div style={{align:"center", paddingLeft:"40%"}}>
            <h1>Score Tracker</h1>
            Current Score: {curScore}  {"\n"}
            Best Score: {bestScore}
        </div>
    );
}

export default Header;
