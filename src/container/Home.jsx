import React from "react";
import Background from "../components/Background";
import Foreground from "../components/Foreground";
import { NotesProvider } from "../contexts/Notes";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <NotesProvider>
      <div className="relative w-full min-h-screen bg-zinc-800">
        <Background />
        <Foreground />
        <Outlet />
        <ToastContainer
          theme="dark"
          newestOnTop={true}
          position="bottom-right"
          autoClose={3000}
          style={{
            width: "90%", 
            maxWidth: "600px",
          }}
        />
      </div>
    </NotesProvider>
  );
};

export default Home;
