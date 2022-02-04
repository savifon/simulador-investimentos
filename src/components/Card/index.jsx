const Card = (props) => {
  const { title, text } = props;

  return (
    <div
      style={{
        background: "#f4f4f4",
        boxShadow: "0 0 5px #CCCCCC",
        padding: "10px",
        textAlign: "center",
        borderRadius: "3px",
        width: "30%",
      }}
    >
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Card;
