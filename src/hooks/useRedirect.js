import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirect({ route }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route);
  }, [navigate, route]);
}

export default useRedirect;
