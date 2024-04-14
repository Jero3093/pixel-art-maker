import { useState, useEffect } from "react";
import { toast } from "sonner";

function useUser({ _id }) {
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (_id) {
          const res = await fetch(
            `${import.meta.env.VITE_GETUSER_ENDPOINT_URL}${_id}`
          );

          if (res.ok) {
            const userData = await res.json();
            setuser(userData);
          } else {
            toast.error("This user was not found");
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
