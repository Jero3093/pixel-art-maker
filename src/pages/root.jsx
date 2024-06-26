import {
  IoArrowForward,
  IoBrushSharp,
  IoShareSocial,
  IoHappy,
  IoDownload,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import useSession from "../hooks/useSession";
import useRedirect from "../hooks/useRedirect";

export default function Root() {
  const session = useSession();

  if (session) {
    useRedirect({ route: "/dashboard" });
  }

  const Features = [
    {
      id: 1,
      name: "Be Creative",
      description: "Express your creativity and create unique pixel art.",
      icon: <IoBrushSharp className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 2,
      name: "Share It",
      description: "Share your creations with friends and the world.",
      icon: <IoShareSocial className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 3,
      name: "Keep It",
      description: "Save your pixel art and build your own gallery.",
      icon: <IoDownload className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 4,
      name: "Have Fun",
      description: "Enjoy the process and have fun creating.",
      icon: <IoHappy className="w-8 h-8 text-emerald-400" />,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col p-2 BGSVG">
      <header className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <img
            src="./logoV2.svg"
            alt="Pixel art maker logo"
            className="w-20 h-20"
          />
          <h1 className="hidden text-3xl font-semibold md:block">
            Pixel Art Maker
          </h1>
        </div>

        <Link
          to={"/login"}
          className="p-2 px-5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md text-lg text-black font-semibold hover:scale-105 transition-all"
          about="Button to redirect to login page"
        >
          Login
        </Link>
      </header>

      <article className="flex flex-col items-center gap-5 mt-10 justify-between lg:flex-row lg:px-10">
        <section className="flex flex-col p-2 text-pretty gap-5 max-w-[600px]">
          <h2 className="text-4xl font-semibold leading-snug lg:text-6xl lg:leading-tight">
            <span className="text-emerald-400 TextGlowing">This</span> is a
            space where you can{" "}
            <span className="text-emerald-400 TextGlowing">explore</span> your{" "}
            <span className="text-emerald-400 TextGlowing">imagination</span>{" "}
            and <span className="text-emerald-400 TextGlowing">create</span>{" "}
            something{" "}
            <span className="text-emerald-400 TextGlowing">special</span> for
            you
          </h2>

          <Link
            to={"/register"}
            className="p-2 rounded-full w-72 flex items-center gap-3 border-2 border-emerald-400 self-center justify-center text-xl font-medium hover:scale-105 hover:bg-emerald-400 transition-all lg:self-start lg:mt-4"
            about="Button to redirect to login"
          >
            Join Now <IoArrowForward className="w-6 h-6" />
          </Link>
        </section>

        <section className="grid grid-cols-1 place-items-center gap-5 mt-12 md:grid-cols-2 lg:mt-0">
          {Features.map((items) => {
            return (
              <div
                className="BoxGlowing border border-zinc-300 dark:border-zinc-700 flex flex-col gap-2 text-pretty rounded-md min-w-48 h-auto lg:gap-4 max-w-72 p-4"
                key={items.id}
              >
                <div className="flex flex-row items-center gap-2">
                  {items.icon}
                  <h3 className="text-3xl">{items.name}</h3>
                </div>
                <h4 className="text-zinc-500 text-xl">
                  {items.description}
                </h4>
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
}
