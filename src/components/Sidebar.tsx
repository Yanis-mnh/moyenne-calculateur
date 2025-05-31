import { useContext, useRef, useState } from "react";
import Button from "./Button";
import { ModuleContext } from "../contexts/ModuleContext";
import ModuleModel from "../class/ModuleModel";

const handelButtonClick = (
  label: String,
  modules: ModuleModel[],
  file: React.RefObject<HTMLInputElement | null>
) => {
  switch (label) {
    case "Import template":
      file.current?.click();
      break;
    case "Export template":
      saveFile(modules);
      break;
    case "Share result":
      alert("comming soon inchalah :)");
      break;
    case "Dark mode":
      console.log("daek mode");
      alert("comming soon inchalah :)");

      break;
    case "Save":
      console.log("save");
      alert("comming soon inchalah :)");
      console.log(modules);

      break;
  }
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("MODULE NULL");
  }
  const { modules, setModule } = context;
  const buttons = [
    "Import template",
    "Export template",
    "Share result",
    "Dark mode",
    "Save",
  ];
  // importing from a file the template woow
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const jsonData = JSON.parse(text);
          const modules = jsonData.map((obj: any) =>
            Object.assign(new ModuleModel(), obj)
          );
          setModule(modules);
        } catch (e) {
          console.error("ERROR: ", e);
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <button
        className="fixed z-20 w-10 right-4 bottom-4 lg:bottom-auto lg:top-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* the logic to close and open the side bar  */}
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
          {buttons.map((label, index) => (
            <li key={index} className="w-1/2 md:w-[200px]">
              <Button
                className="w-full"
                onClick={() => handelButtonClick(label, modules, fileInputRef)}
              >
                {label}
              </Button>
            </li>
          ))}
        </ul>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".json"
        />
      </div>
    </div>
  );
}
// download file as JSOn
function saveFile(modules: ModuleModel[]) {
  const moduleJSON = JSON.stringify(modules, null, 2);
  const blob = new Blob([moduleJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "modules.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

export default Sidebar;
