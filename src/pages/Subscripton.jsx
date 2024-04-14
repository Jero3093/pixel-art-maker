import useSession from "../hooks/useSession";
import useRedirect from "../hooks/useRedirect";
import useUser from "../hooks/useUser";
import useSubscriptionPlans from "../hooks/useSubscriptionPlans";
import Header from "../components/Header";
import SubscriptionCard from "../components/SubscriptionCard";
import Copyright from "../components/Copyright";

export default function Subscripton() {
  const session = useSession();

  if (session === null) {
    useRedirect({ route: "/" });
    return;
  }

  const user = useUser({ _id: session?._id });

  const SubscriptionsPlans = useSubscriptionPlans();

  return (
    <main className="min-h-screen p-2 flex flex-col">
      <Header search={false} username={user.username} />
      <div className="grid gap-4 mt-5 px-2 text-pretty md:self-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Subscriptions</h2>
        <p className="text-xl lg:text-2xl">
          Choose the best plan for you, or your team
        </p>
      </div>
      {SubscriptionsPlans.length === 0 && (
        <span className="self-center mt-10 text-zinc-600">
          Sorry there was an error, try again later
        </span>
      )}
      <section className="grid grid-cols-1 gap-10 place-items-center self-center my-10 md:grid-cols-2 lg:grid-cols-3">
        {SubscriptionsPlans.length > 0 &&
          SubscriptionsPlans.map((item) => {
            return (
              <SubscriptionCard
                item={item}
                userCurrentPlan={user?.current_plan}
              />
            );
          })}
      </section>
      <div className="mt-auto self-center">
        <Copyright />
      </div>
    </main>
  );
}
