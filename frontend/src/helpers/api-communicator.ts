import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const authUsingGoogle = async (
  name: string,
  email: string,
  photoURL: string
) => {
  const res = await axios.post("/user/google-auth", { name, email, photoURL });
  if (res.status !== 201) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (content: string) => {
  const res = await axios.post("/chat/new", { message: content });
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status != 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status != 200) {
    throw new Error(res.data.message);
  }
  const data = await res.data;
  return data;
};
