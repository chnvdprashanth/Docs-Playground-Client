import React from "react";
import Background from "../components/Background";
import Foreground from "../components/Foreground";
import { NotesProvider } from "../contexts/Notes";

const Home = () => {
  return (
    <NotesProvider>
      <div className="relative w-full min-h-screen bg-zinc-800">
        <Background />
        <Foreground />
      </div>
    </NotesProvider>
  );
};

export default Home;
