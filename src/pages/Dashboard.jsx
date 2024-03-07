import { useState } from "react";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import useSession from "../hooks/useSession";
import useUser from "../hooks/useUser";
import useRedirect from "../hooks/useRedirect";
import Header from "../components/Header";
import DraftCard from "../components/DraftCard";
import Loader from "../components/Loader";
import Copyright from "../components/Copyright";
import useDrafts from "../hooks/useDrafts";

export default function Dashboard() {
  const session = useSession();

  if (session === null) {
    useRedirect({ session, route: "/" });
    return;
  }

  const user = useUser();

  if (user.length < 0) {
    useRedirect({ session, route: "/" });
    return;
  }

  const drafts = useDrafts({ userId: session._id });

  const [SearchText, setSearchText] = useState("");

  const [SearchedDrafts, setSearchedDrafts] = useState([]);

  const [IsLoading, setIsLoading] = useState(false);

  const searchDrafts = (e) => {
    if (SearchText !== "") {
      setIsLoading(true);
      const filteredDrafts = drafts.filter(
        (d) => d.name.toLowerCase() == e.toLowerCase()
      );
      if (filteredDrafts) {
        setTimeout(() => {
          setSearchedDrafts(filteredDrafts);
          setIsLoading(false);
        }, 1000);
      } else if (SearchText === "") {
        setSearchedDrafts([]);
      }
    }
  };

  const RenderDrafts = () => {
    if (drafts.length > 0 && SearchedDrafts.length <= 0) {
      return drafts.map((item) => {
        return <DraftCard item={item} key={item.id} />;
      });
    } else if (SearchedDrafts.length > 0) {
      return SearchedDrafts.map((item) => {
        return <DraftCard item={item} key={item.id} />;
      });
    }
  };

  return (
    <main className="min-h-screen p-2 flex flex-col">
      <Header
        username={user && user?.username}
        search={true}
        searchOnChange={(e) => {
          setSearchText(e.target.value);
          searchDrafts(e.target.value);
        }}
      />
      <Link
        to={"/draft/create"}
        className="my-5 w-full max-w-96 flex flex-row justify-center gap-2 bg-gradient-to-r from-emerald-300 to-emerald-500 p-3 rounded-md text-2xl text-black font-semibold self-center hover:scale-105 transition-all"
      >
        <IoAddSharp className="w-8 h-8" />
        New Draft
      </Link>
      <section className="self-center w-full flex flex-col items-center max-w-3xl">
        <h2 className="text-3xl mt-5">Saved Drafts</h2>
        {drafts.length <= 0 && (
          <p className="text-zinc-500 my-10">No drafts saved yet</p>
        )}
        {IsLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 self-center gap-5 my-10 w-full place-items-center md:grid-cols-2">
            <RenderDrafts />
          </div>
        )}
      </section>
      <div className="mt-auto self-center">
        <Copyright />
      </div>
    </main>
  );
}
