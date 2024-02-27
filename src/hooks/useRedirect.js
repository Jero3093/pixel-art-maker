import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirect({ session, route }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route);
  }, [session]);
}

export default useRedirect;
