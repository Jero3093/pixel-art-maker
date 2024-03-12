import { useState } from "react";
import {
  IoEllipsisVerticalSharp,
  IoPencilSharp,
  IoTrashBin,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import handleDeleteDraft from "../utils/handleDeleteDraft";

function DraftCard({ item, userId }) {
  const [MenuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const OptionsMenu = () => {
    return (
      <menu className="bg-emerald-400/65 border-2 border-emerald-400 max-w-32 w-32 rounded-md h-auto absolute right-10 top-10 z-10 p-2 flex flex-col gap-7 text-black text-xl font-medium">
        <button
          className="flex flex-row items-center gap-3 hover:scale-105 transition-all"
          onClick={() => navigate(`/draft/name/?_id=${item._id}`)}
        >
          <IoPencilSharp />
          Edit
        </button>
        <button
          className="flex flex-row items-center gap-3 hover:scale-105 transition-all"
          onClick={() =>
            handleDeleteDraft({
              draftId: item._id,
              userId: userId,
              navigate: navigate,
            })
          }
        >
          <IoTrashBin />
          Delete
        </button>
      </menu>
    );
  };

  return (
    <div className="w-full max-w-96 relative">
      <article
        className="w-full max-w-96 border-zinc-700/25 border-[3px] bg-zinc-700/5 shadow-md p-2 flex flex-row items-center justify-between rounded-md cursor-pointer group hover:bg-gradient-to-l hover:scale-105 transition-all"
        key={item.id}
      >
        <div className="flex flex-col gap-5">
          <p className="text-2xl font-semibold">{item.name}</p>
          <span className="text-xl text-zinc-500">
            Created: {item.created_at}
          </span>
        </div>
        <button onClick={() => setMenuOpen(!MenuOpen)}>
          <IoEllipsisVerticalSharp className="hidden w-7 h-7 group-hover:block hover:scale-110 transition-all" />
        </button>
      </article>
      {MenuOpen && <OptionsMenu />}
    </div>
  );
}

export default DraftCard;
