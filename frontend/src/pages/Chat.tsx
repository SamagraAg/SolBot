import { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
// import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { red } from "@mui/material/colors";
type Message = {
  role: "user" | "model";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      toast.loading("Sending new message", { id: "sendChat" });
      const content = inputRef.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      toast.success("chat responded successfully", { id: "sendChat" });
    } catch (error) {
      console.log(error);
      toast.error("Sending message failed", { id: "sendChat" });
    } finally {
      setIsSubmitting(false);
    }

    //
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
      return;
    }

    const fetchChats = async () => {
      toast.loading("Loading Chats", { id: "loadchats" });
      try {
        const data = await getUserChats();
        setChatMessages(data.chats);
        if (data.chats.length !== 0)
          toast.success("Successfully loaded chats", { id: "loadchats" });
        else toast.success("No chats to load", { id: "loadchats" });
      } catch (err) {
        console.error(err);
        toast.error("Loading Failed", { id: "loadchats" });
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchChats();
  }, [auth?.user]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  if (isLoadingChats === true) {
    return (
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        p={"5rem"}
        fontSize={"2rem"}
      >
        Loading Chats....
        <CircularProgress
          sx={{ mx: "auto", mt: "2rem" }}
          enableTrackSlot
          size="5rem"
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.[0].toUpperCase()}
            {auth?.user?.name?.split(" ")?.[1]?.[0].toUpperCase() || ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - Gemini 2.5 Flash
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: "#555 transparent",
          }}
        >
          {chatMessages.length === 0 ? (
            <Typography
              fontSize="40px"
              textAlign="center"
              mt={10}
              color="grey"
              sx={{ userSelect: "none" }}
            >
              Send a message to begin conversation
            </Typography>
          ) : (
            chatMessages.map((chat, index) => (
              //@ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Write your message"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "silver",
              fontSize: "20px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isSubmitting) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <IconButton
            disabled={isSubmitting}
            onClick={handleSubmit}
            sx={{ color: "white", mx: 1 }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
