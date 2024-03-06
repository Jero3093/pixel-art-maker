import { useState, useEffect } from "react";
import { toast } from "sonner";

function useUser() {
  const [isLoading, setisLoading] = useState(true);

  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = localStorage.getItem("session");

        if (session) {
          const parsedSession = JSON.parse(session);

          const res = await fetch(import.meta.env.VITE_GETUSER_ENDPOINT_URL, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              _id: parsedSession._id,
            }),
          });

          if (res.ok) {
            const userData = await res.json();
            setuser(userData);
          } else {
            toast.error("Something went wrong");
          }
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setisLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
}

export default useUser;
