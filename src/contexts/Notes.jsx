import { createContext, useContext, useState } from "react";

const NotesContext = createContext(null);

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const [notes,setNotes] = useState([])

  return (
    <NotesContext.Provider value={{ notes,setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
