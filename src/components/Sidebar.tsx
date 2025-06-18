import { useContext, useRef, useState } from "react";
import Button from "./Button";
import { ModuleContext } from "../contexts/ModuleContext";
import ModuleModel from "../class/ModuleModel";
import { Toast } from "./Toast";
import { generateShareUrl } from "../utils/share";

const handelButtonClick = (
  label: String,
  modules: ModuleModel[],
  file: React.RefObject<HTMLInputElement | null>
) => {
  switch (label) {
    case "Import template":
      file.current?.click();
      console.log("testing go brrrrrrrrrrrrrr:", modules);

      break;
    case "Export template":
      ExportTemplate(modules);
      break;
    case "Share":
      share(modules);
      break;
    case "Dark mode":
      console.log("dark mode boo");
      alert("comming soon inchalah :)");

      break;
    case "Save":
      saveData(modules);

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
  const { modules, setModule, setNbrMod } = context;
  const buttons = [
    "Import template",
    "Export template",
    "Share",
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
          const modules = jsonData.map((obj: any) => {
            return new ModuleModel(
              obj.nom,
              obj.coef,
              obj.td ? obj.td : undefined,
              obj.tp ? obj.tp : undefined,
              obj.examen ? obj.examen : undefined,
              obj.tdChecked ?? false,
              obj.tpChecked ?? false,
              obj.examChecked ?? false,
              obj.coefGlobal ?? 1,
              obj.average ?? null
            );
          });
          setModule(modules);
          setNbrMod(modules.length);
          Toast({ text: "Template Imported Successfully", type: "success" });
        } catch (error) {
          console.error("ERROR: ", error);
          Toast({ text: "ERROR IN IMPORTING THE TEMPLATE", type: "error" });
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

//share the url
function share(module: ModuleModel[]) {
  const url = generateShareUrl(module);
  navigator.clipboard.writeText(url);
  Toast({ text: "Link copied to clipboard!" });
}

//simple saving sys
function saveData(modules: ModuleModel[]) {
  try {
    localStorage.setItem("userModule", JSON.stringify(modules));
    Toast({ text: "Save Successfully", type: "success" });
  } catch {
    Toast({ text: "ERROR IN SAVING ", type: "error" });
  }
}

// download file as JSOn
function ExportTemplate(modules: ModuleModel[]) {
  try {
    const replacer = (key: string, value: any) => {
      if (key === "note") return undefined;
      if (key == "average") return undefined;
      return value;
    };
    const moduleJSON = JSON.stringify(modules, replacer, 2);
    const blob = new Blob([moduleJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "modules.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    Toast({ text: "File Exported Successfully", type: "success" });
  } catch {
    Toast({ text: "ERROR IN EXPORTING THE TEMPLATE", type: "error" });
  }
}

export default Sidebar;
