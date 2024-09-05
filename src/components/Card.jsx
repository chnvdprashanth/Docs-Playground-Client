import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useNotes } from "../contexts/Notes";

const Card = ({ reference, note, id }) => {
  const [isDownloadActive, setIsDownloadActive] = useState(true);
  const [isDownloadTagVisible, setIsDownloadTagVisible] = useState(false);
  const byteSize = (str) => new Blob([str]).size;
  const { notes, setNotes } = useNotes();

  const handleDownloadButton = () => {
    if (!isDownloadActive) {
      setIsDownloadActive(true);
      setIsDownloadTagVisible(false);
    } else {
      setIsDownloadActive(false);
      setIsDownloadTagVisible(true);
    }
  };

  const handleDownloadFile = () => {
    try {
      const note_blob = new Blob([note.desc], { type: "text/plain" });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(note_blob);
      link.download = `${note.title}.txt`;

      link.click();
      toast("Download Complete🎉",{type:"success"})

      URL.revokeObjectURL(link.href);
    } catch (err) {
      toast("Download Failed😥",{type:"error"});
      console.error("Failed to download: ",err);
    }
  };

  const handleDeleteNote = async (e) => {
    try {
      await fetch(`https://docs-playground.onrender.com/note/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setNotes(notes.filter((n) => n._id !== id));
      toast("Deleted😌",{type:"success"})
    } catch (err) {
      toast("Failed to delete😥",{type:"error"})
      console.error(err);
    }
  };

  return (
    <>
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.15 }}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
      className="relative flex flex-col gap-y-2 w-52 h-64 rounded-[40px] bg-zinc-900/90 text-white p-4 overflow-hidden font-medium"
    >
      <div className="flex justify-between items-center">
        <FaFileAlt className="w-5 h-4" />
        <div className="flex items-center gap-2">
          <Link to={`/note/${id}`}>
            <MdOutlineEdit className="w-5 h-5" />
          </Link>
          <MdDeleteOutline
            className="w-5 h-5 cursor-pointer"
            onClick={handleDeleteNote}
            id={id}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-1 h-auto overflow-hidden">
        <h3 className="text-base capitalize text-ellipsis line-clamp-1">{`${note.title}`}</h3>
        <p className="text-sm font-normal overflow-hidden text-ellipsis line-clamp-4">{`${note.desc}`}</p>
      </div>
      <div className="footer absolute w-full bottom-0 left-0">
        <div className="flex justify-between items-center py-4 px-5">
          <h5>{`
                ${
                  byteSize(note.desc) / (1024 * 1024) < 1
                    ? `${(byteSize(note.desc) / 1024).toFixed(3)} KB`
                    : `${(byteSize(note.desc) / (1024 * 1024)).toFixed(3)} Mb`
                }
            `}</h5>
          {isDownloadActive ? (
            <span className="cursor-pointer" onClick={handleDownloadButton}>
              <LuDownload />
            </span>
          ) : (
            <span className="cursor-pointer" onClick={handleDownloadButton}>
              <IoClose />
            </span>
          )}
        </div>
        {isDownloadTagVisible ? (
          <div className="tag w-full p-4 bg-green-600 flex items-center justify-center">
            <h3
              className="text-base font-semibold cursor-pointer"
              onClick={handleDownloadFile}
            >
              Download Now.
            </h3>
          </div>
        ) : null}
      </div>
    </motion.div>
    <ToastContainer theme={"dark"} newestOnTop={true} />
    </>
  );
};

export default Card;
