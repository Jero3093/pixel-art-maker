import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { toast } from "sonner";
import { checkNewDraftFields } from "../utils/checkAuthFields";
import useSession from "../hooks/useSession";
import useUser from "../hooks/useUser";
import useRedirect from "../hooks/useRedirect";
import SonnerToaster from "../components/SonnerToaster";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Copyright from "../components/Copyright";

export default function NewDraft() {
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

  const navigate = useNavigate();

  const [DraftName, setDraftName] = useState("");
  const [DraftPixelsLong, setDraftPixelsLong] = useState("");

  const handleCreateDraft = async (e) => {
    e.preventDefault();
    try {
      const fields = checkNewDraftFields({
        Name: DraftName,
        Pixels: DraftPixelsLong,
      });

      if (fields) {
        toast.error("Please complete all the fields to continue");
        return;
      }

      const res = await fetch(import.meta.env.VITE_CREATEDRAFTS_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: DraftName,
          pixels_long: parseInt(DraftPixelsLong),
          created_by: session._id,
        }),
      });

      if (res.ok) {
        toast.success("Draft was been created successfully");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        console.log(res.status);
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
        onSubmit={(e) => handleCreateDraft(e)}
      >
        <label className="flex flex-col gap-3">
          <span className="text-2xl">Name</span>
          <Input
            name={"name"}
            placeholder={"Draft Name"}
            type={"text"}
            onChange={(e) => setDraftName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-3">
          <span className="text-2xl">Pixels Long</span>
          <p className="text-zinc-600">
            Specify the number of pixel long draft must have
          </p>
          <Input
            name={"number"}
            placeholder={"Draft Pixels Long"}
            type={"number"}
            onChange={(e) => setDraftPixelsLong(e.target.value)}
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
