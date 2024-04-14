import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../components/Input";
import useSession from "../hooks/useSession";
import useUser from "../hooks/useUser";
import useRedirect from "../hooks/useRedirect";
import Header from "../components/Header";
import SonnerToaster from "../components/SonnerToaster";
import Copyright from "../components/Copyright";

export default function ChangeName() {
  const session = useSession();

  if (session === null) {
    useRedirect({ session, route: "/" });
    return;
  }

  const user = useUser({ _id: session?._id });

  const navigate = useNavigate();

  const params = new URLSearchParams(document.location.search);

  const draftId = params.get("_id");

  if (!draftId) {
    useRedirect({ route: "/dashboard" });
    return;
  }

  const [NewDraftName, setNewDraftName] = useState("");

  const handleChangeDraftName = async (e) => {
    e.preventDefault();
    try {
      if (user.length === 0) {
        toast.error("User was not found, log with another one");
        return;
      }

      const res = await fetch(import.meta.env.VITE_NEWNAMEDRAFT_ENDPOINT_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: draftId,
          name: NewDraftName,
          created_by: session?._id,
        }),
      });

      if (res.ok) {
        toast.success("Draft name's has been changed");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <SonnerToaster />
      <Header search={false} username={user && user?.username} />
      <h2 className="my-10 self-center font-semibold text-xl md:text-2xl">
        Complete this form to create a new draft
      </h2>
      <form
        className="max-w-96 w-full flex flex-col gap-14 self-center"
        onSubmit={(e) => handleChangeDraftName(e)}
      >
        <label className="flex flex-col gap-3">
          <span className="text-2xl">Name</span>
          <p className="text-zinc-600">
            Make sure the new name is different from the previous
          </p>
          <Input
            name={"name"}
            placeholder={"Draft Name"}
            type={"text"}
            onChange={(e) => setNewDraftName(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Create Draft"
          className="w-full max-w-96 bg-gradient-to-r from-emerald-200 to-emerald-900 p-2 h-12 rounded-md cursor-pointer text-black font-semibold text-2xl hover:scale-105 transition-all"
        />
      </form>
      <div className="mt-auto self-center mb-2">
        <Copyright />
      </div>
    </main>
  );
}
