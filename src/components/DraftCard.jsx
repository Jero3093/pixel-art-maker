import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoEllipsisVerticalSharp,
  IoPencilSharp,
  IoTrashBin,
  IoClose,
} from "react-icons/io5";
import { TbBookmarkEdit } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import handleDeleteDraft from "../utils/handleDeleteDraft";

function DraftCard({ item, userId }) {
  const [MenuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const OptionsMenu = () => {
    return (
      <menu className="flex flex-col gap-10 text-black dark:text-white text-2xl font-medium border-r border-r-zinc-400 dark:border-r-zinc-800 w-full mr-10">
        <button
          className="flex flex-row items-center gap-3 hover:scale-105 transition-all"
          onClick={() => navigate(`/draft/name/?_id=${item._id}`)}
          title="Edit Draft Name's"
        >
          <IoPencilSharp className="w-7 h-7" />
          Edit
        </button>
        <button
          className="flex flex-row items-center gap-3 hover:scale-105 transition-all"
          title="Delete Draft"
          onClick={() =>
            handleDeleteDraft({
              draftId: item._id,
              userId: userId,
              navigate: navigate,
            })
          }
        >
          <IoTrashBin className="w-7 h-7" />
          Delete
        </button>
      </menu>
    );
  };

  const draftDate = item?.created_at.split("T")[0];

  return (
    <article className="w-full relative h-auto">
      <div className="w-full max-w-screen-sm border-zinc-700/25 border-[2px] shadow-md p-4 flex flex-row items-center justify-between rounded-md">
        {MenuOpen ? (
          <OptionsMenu />
        ) : (
          <aside className="flex flex-col gap-10 line-clamp-1">
            <p className="text-3xl font-semibold">{item.name}</p>
            <div className="text-xl text-zinc-500 flex flex-row items-center gap-2">
              <TbBookmarkEdit />
              <span>{draftDate}</span>
            </div>
          </aside>
        )}
        <aside className="flex flex-col items-center gap-5">
          <button
            onClick={() => setMenuOpen(!MenuOpen)}
            className="z-10 p-3 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:scale-110 transition-all"
            title="Open Menu"
          >
            {MenuOpen ? (
              <IoClose className="w-5 h-5" />
            ) : (
              <IoEllipsisVerticalSharp className="w-5 h-5" />
            )}
          </button>
          <Link
            to={`/draft/?_id=${item._id}`}
            key={item._id}
            title="Open Draft"
            className="p-3 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:scale-110 transition-all"
          >
            <FiExternalLink className="w-5 h-5" />
          </Link>
        </aside>
      </div>
    </article>
  );
}

export default DraftCard;
