const Card = (props) => {
  const { title, text, textColor, bold } = props;

  return (
    <div
      style={{
        background: "#f4f4f4",
        boxShadow: "0 0 10px #CCCCCC",
        border: "1px solid #CCCCCC",
        padding: "15px",
        textAlign: "center",
        borderRadius: "3px",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h3>{title}</h3>
      <p
        style={{
          color: textColor,
          fontWeight: bold ? "bold" : "",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Card;
