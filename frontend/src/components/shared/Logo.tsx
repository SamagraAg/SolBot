import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Link to={"/"}>
        <img
          src="Logo.png"
          alt="openai"
          width={"100x"}
          height={"80px"}
        //   className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>SOL</span>BOT
      </Typography>
    </div>
  );
};

export default Logo;