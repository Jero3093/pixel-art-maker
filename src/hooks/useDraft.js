import { useState, useEffect } from "react";

function useDraft({ draftId }) {
  const [Draft, setDraft] = useState(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_GETDRAFT_URL}${draftId}`
        );

        if (res.ok) {
          const draft = await res.json();
          if (draft) {
            setDraft([draft]);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDraft();
  }, [draftId]);

  return Draft;
}

export default useDraft;
