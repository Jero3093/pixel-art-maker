import { useState, useEffect } from "react";
import SonnerToaster from "../components/SonnerToaster";
import DraftHUD from "../components/DraftHUD";
import useSession from "../hooks/useSession";
import useRedirect from "../hooks/useRedirect";
import useDraft from "../hooks/useDraft";

export default function Draft() {
  const session = useSession();

  if (session === null) {
    useRedirect({ route: "/" });
    return;
  }

  const params = new URLSearchParams(document.location.search);

  const draftId = params.get("_id");

  if (!draftId) {
    useRedirect({ route: "/dashboard" });
    return;
  }

  const draft = useDraft({ draftId: draftId });

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    if (draft && draft[0]?.grid && grid.length === 0) {
      setGrid(draft[0]?.grid);
    }
  }, [draft]);

  const [ErasePixel, setErasePixel] = useState(false);

  const [SelectedColor, setSelectedColor] = useState(null);

  const [SavedColors, setSavedColors] = useState([{ color: "#404040" }]);

  const handlePaintPixel = (index) => {
    const newGrid = [...grid];
    if (newGrid[index].length > 0) {
      newGrid[index].shift();
      newGrid[index].push({ color: SelectedColor });
      setGrid(newGrid);
    } else {
      newGrid[index].push({ color: SelectedColor || "#404040" });
      setGrid(newGrid);
    }
  };

  const handleErasePixel = (index) => {
    const newGrid = [...grid];
    newGrid[index].shift();
    setGrid(newGrid);
  };

  const handleSelectColor = (color) => {
    const newColors = [...SavedColors];
    if (color === "#404040" || SavedColors.find((c) => c.color === color)) {
      setSelectedColor(color);
      return;
    } else if (SavedColors.length > 2) {
      newColors.shift();
    }

    newColors.push({ color: color });
    setSavedColors(newColors);
    setSelectedColor(color);
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <SonnerToaster />
      {/* HUD */}
      <DraftHUD
        DraftId={draftId}
        Grid={grid}
        ErasePixel={ErasePixel}
        SavedColors={SavedColors}
        onErasePixel={() => setErasePixel(true)}
        onPaintPixel={() => setErasePixel(false)}
        onSelectColor={(color) => handleSelectColor(color)}
      />
      {/* Grid */}
      <div
        className="grid z-20"
        style={{
          gridTemplateColumns: `repeat(${
            grid?.length > 0 && grid?.length / 4
          }, 1fr)`,
        }}
      >
        {grid.length > 0 &&
          grid.map((item, index) => {
            return (
              <div
                className={`border border-zinc-400 w-9 h-9 cursor-pointer`}
                style={{ backgroundColor: item[0]?.color || "transparent" }}
                key={index}
                onClick={() =>
                  ErasePixel ? handleErasePixel(index) : handlePaintPixel(index)
                }
              ></div>
            );
          })}
      </div>
    </main>
  );
}
