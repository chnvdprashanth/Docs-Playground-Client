import { createContext, useContext, useState } from "react";

const NoteContext = createContext(null);

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
    const [doc,setDoc] = useState({
        title: "",
        desc: "",
        image: "",
      });

  return (
    <NoteContext.Provider value={{ doc, setDoc }}>
      {children}
    </NoteContext.Provider>
  );
};
