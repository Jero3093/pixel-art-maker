import { FaCircle } from "react-icons/fa";

const SubscriptionCard = ({ item, userCurrentPlan }) => {
  const Divider = () => {
    return (
      <div className="flex flex-row items-center gap-3 px-3 my-2">
        <div className="w-full h-[2px] bg-zinc-200 rounded-full"></div>
        <FaCircle className="text-zinc-200 w-3 h-3" />
        <div className="w-full h-[2px] bg-zinc-200 rounded-full"></div>
      </div>
    );
  };

  return (
    <article
      className="w-80 max-w-80 h-auto border-[3px] border-emerald-300 rounded-md flex flex-col p-2 py-4 text-pretty relative"
      key={item?._id}
    >
      <header className="flex flex-col gap-3 p-3">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-5xl font-semibold">
            {item?.price ? item?.price : "Free"}
          </h3>
          <div className="flex flex-col items-center gap-2">
            {item?.name !== "Free" && <h4>{item?.name} Plan</h4>}
            {item?._id === userCurrentPlan && <span>Current Plan</span>}
          </div>
        </div>
        {item?.warnings && (
          <span className="text-lg text-zinc-400">{item?.warnings}</span>
        )}
      </header>
      <Divider />
      <section className="flex flex-col gap-4 px-3 text-pretty mt-3">
        {item?.beneficts.map((item) => {
          return (
            <div className="flex flex-row items-center gap-2" key={item?.id}>
              <FaCircle className="text-dark dark:text-white w-3 h-3 min-w-3 min-h-3" />
              <p>{item?.name}</p>
            </div>
          );
        })}
      </section>
      {item?._id !== userCurrentPlan && (
        <button className="mt-10 w-full h-12 bg-gradient-to-r from-emerald-200 to-emerald-700 rounded-md text-black font-semibold text-2xl hover:bg-gradient-to-l">
          Subscribe
        </button>
      )}
      {item?.name === "Starter" && (
        <div className="absolute -rotate-90 -left-[68px] top-20 bg-emerald-300 border border-emerald-300 rounded-t-md px-3">
          <p className="text-black font-medium">Best Choice</p>
        </div>
      )}
    </article>
  );
};

export default SubscriptionCard;
