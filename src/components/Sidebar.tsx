import { useContext, useState } from "react";
import Button from "./Button";
import { ModuleContext } from "../contexts/ModuleContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("MODULE NULL");
  }
  const { modules } = context;
  return (
    <div>
      <button
        className="fixed z-20 w-10 right-4 bottom-4 lg:bottom-auto lg:top-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* the logic from close and open the side bar  */}
        {isOpen ? (
          <img src="icons/close.png" />
        ) : (
          <img src="icons/menu.png" />
        )}{" "}
      </button>
      {/*SIDE BARE*/}
      <div
        className={
          "bg-slate-900 fixed w-full h-full z-10 transition-all opacity-95  " +
          (isOpen ? "left-0" : "-left-full")
        }
      >
        <ul className="flex flex-col gap-4 items-center justify-center h-full backdrop-blur-xl">
          {[
            "Import template",
            "Export template",
            "Share result",
            "Dark mode",
            "Save",
          ].map((label, index) => (
            <li key={index} className="w-1/2 md:w-[200px]">
              <Button className="w-full">{label}</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
