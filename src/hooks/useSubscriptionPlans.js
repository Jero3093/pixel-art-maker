import { useState, useEffect } from "react";
import { toast } from "sonner";

function useSubscriptionPlans() {
  const [Plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchSubsPlans = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_GETSUBSCRIPTIONS_ENDPOINT_URL
        );

        if (res.ok) {
          const fetchedPlans = await res.json();
          setPlans(fetchedPlans);
        } else {
          toast.error("Error while fetching plans, try again later");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSubsPlans();
  }, []);

  return Plans;
}

export default useSubscriptionPlans;
