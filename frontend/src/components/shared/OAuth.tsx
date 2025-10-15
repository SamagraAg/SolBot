import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase_app } from "../../config/firebase";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const OAuth = () => {
  const auth = useAuth();
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
        user.photoURL ||
          "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
      );
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        width: "100%",
        borderRadius: 2,
        bgcolor: "#e20522ff",
        color: "black",
        fontWeight: 600,
        ":hover": {
          bgcolor: "#de5e5ef3",
        },
      }}
      startIcon={<FaGoogle  color="black"/>}
      onClick={loginUsingGoogle}
    >
      Login using Google
    </Button>
  );
};

export default OAuth;
