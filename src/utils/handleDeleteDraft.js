import { toast } from "sonner";

function handleDeleteDraft({ userId, draftId, navigate }) {
  const deleteDraft = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_DELETEDRAFT_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: draftId,
          created_by: userId,
        }),
      });

      if (res.ok) {
        toast.success("Draft was been deleted");
        setTimeout(() => {
          navigate("/", { replace: true,  });
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message || "Something went wrong");
    }
  };

  toast("Sure want to delete this draft", {
    action: {
      label: "Delete",
      onClick: () => deleteDraft(),
    },
  });
}

export default handleDeleteDraft;
