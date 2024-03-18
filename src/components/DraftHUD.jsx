import { Link } from "react-router-dom";
import { toast } from "sonner";
import { VscSaveAs } from "react-icons/vsc";
import { BsEraserFill } from "react-icons/bs";
import { IoBrush, IoChevronBackOutline } from "react-icons/io5";

const DraftHUD = ({
  DraftId,
  Grid,
  ErasePixel,
  SavedColors,
  onErasePixel,
  onPaintPixel,
  onSelectColor,
}) => {
  const handleSaveChanges = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SAVEDRAFT_ENDPOINT_URL}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: DraftId, grid: Grid }),
      }
    );

    if (res.ok) {
      toast.success("Changes saved successfully");
    } else {
      toast.error("Something went wrong, try again");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 p-2">
      {/* Back Button */}
      <Link
        to={"/dashboard"}
        className="fixed top-2 left-2 p-2 rounded-full border-2 border-emerald-700 flex items-center gap-2 bg-emerald-300/30"
      >
        <IoChevronBackOutline className="w-5 h-5" />
      </Link>
      <button
        className="fixed top-2 right-2 p-2 rounded-full border-2 border-emerald-700 flex flex-row items-center gap-2 bg-emerald-300/30"
        onClick={handleSaveChanges}
      >
        <VscSaveAs className="w-5 h-5" />
        Save Changes
      </button>
      {/* Save Draft State Button */}
      <section className="flex flex-row items-center gap-2 fixed bottom-2 left-2">
        <button
          className={`${
            !ErasePixel
              ? "text-emerald-400 border-emerald-700"
              : "text-zinc-500 border-emerald-700"
          } w-12 h-12 grid place-items-center border-2 rounded-md bg-emerald-300/30`}
          onClick={onPaintPixel}
        >
          <IoBrush className="w-5 h-5" />
        </button>
        <button
          className={`${
            ErasePixel
              ? "text-emerald-400 border-emerald-700"
              : "text-zinc-500 border-emerald-700"
          } w-12 h-12 grid place-items-center border-2 rounded-md bg-emerald-300/30`}
          onClick={onErasePixel}
        >
          <BsEraserFill className="w-5 h-5" />
        </button>
      </section>
      {/* Saved Colors and Color Picker */}
      <section className="flex flex-row items-center gap-2 fixed bottom-2 right-2 border-2 border-emerald-700 rounded-full p-2 bg-emerald-300/30">
        {SavedColors.map((item, index) => {
          return (
            <button
              className=" w-7 h-7 rounded-full border-2 border-emerald-950"
              style={{ backgroundColor: item.color }}
              onClick={() => onSelectColor(item.color)}
              key={index}
            ></button>
          );
        })}
        <input
          type="color"
          name="color"
          className="cursor-pointer"
          onChange={(e) => onSelectColor(e.target.value)}
        />
      </section>
    </div>
  );
};

export default DraftHUD;
