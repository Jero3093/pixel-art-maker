import { useEffect, useState } from "react";

function useDrafts({ userId }) {
  const [drafts, setdrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_GETDRAFTS_URL}${userId}`
        );

        if (res.ok) {
          const drafts = await res.json();
          if (drafts.length > 0) {
            setdrafts(drafts);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDrafts();
  }, []);

  return drafts;
}

export default useDrafts;
