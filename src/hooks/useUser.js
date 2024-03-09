import { useState, useEffect } from "react";
import { toast } from "sonner";

function useUser() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = localStorage.getItem("session");

        if (session) {
          const parsedSession = JSON.parse(session);

          const res = await fetch(
            `${import.meta.env.VITE_GETUSER_ENDPOINT_URL}${parsedSession._id}`
          );

          if (res.ok) {
            const userData = await res.json();
            setuser(userData);
          } else {
            toast.error("Something went wrong");
          }
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchUser();
  }, []);

  return user;
}

export default useUser;
