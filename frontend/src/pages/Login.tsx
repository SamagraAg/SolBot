import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  OAuthCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebase_app } from "../config/firebase.ts";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  const loginUsingGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const firebase_auth = getAuth(firebase_app);
    firebase_auth.useDeviceLanguage();
    const result = await signInWithPopup(firebase_auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(
    //   result
    // ) as OAuthCredential;
    // const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    await auth?.googleLogin(
      user.displayName as string,
      user.email as string,
      user.photoURL || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
    );
    toast.success("Signed In Successfully", { id: "login" });
  } catch (error) {
    console.log(error);
    toast.error("Signing In Failed", { id: "login" });
  }
};
  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #222831, #393E46)" }}
      p={2}
    >
      {/* Image Section */}
      <Box
        display={{ xs: "none", md: "flex" }}
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <img
          src="airobot.png"
          alt="Robot"
          style={{ width: "80%", maxWidth: "400px", borderRadius: "20px" }}
        />
      </Box>

      {/* Form Section */}
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "100%", sm: "90%", md: "400px" },
            p: { xs: 3, sm: 4 },
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            borderRadius: 3,
            backgroundColor: "#393E46",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={2}>
            Login
          </Typography>

          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              width: "100%",
              borderRadius: 2,
              bgcolor: "#00fffc",
              color: "#000",
              fontWeight: 600,
              ":hover": {
                bgcolor: "#00fffca1",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            Login
          </Button>
          <Button onClick={loginUsingGoogle}>Login using Google</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
