import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      //console.log("Clicked");
      handleChoice(card);
    }
  };

  return (
    <div>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="/img/cover.png"
            onClick={handleClick} //click event on backside of the card
            alt="card back"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
