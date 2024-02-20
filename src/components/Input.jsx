import { IoEye, IoEyeOff } from "react-icons/io5";

export function Input({ type, name, placeholder, onChange, password }) {
  const PasswordStyles =
    "w-full h-12 rounded-l-md bg-transparent border-l-2 border-t-2 border-b-2 border-zinc-600 p-2 text-xl outline-none"; //Styles only for password inputs

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={
        password
          ? PasswordStyles
          : "h-12 rounded-md bg-transparent border-2 border-zinc-600 p-2 text-xl"
      }
    />
  );
}

export function PasswordInput({ type, onChange, onClick, ShowPassword }) {
  return (
    <div className="flex flex-row items-center">
      <input
        type={type}
        name={"password"}
        placeholder={"6 character long min."}
        onChange={onChange}
        className="w-full h-12 rounded-l-md bg-transparent border-l-2 border-t-2 border-b-2 border-zinc-600 p-2 text-xl outline-none"
        minLength={6}
      />
      <div className="h-12 rounded-r-md outline-none bg-transparent border-t-2 border-r-2 border-b-2 border-zinc-600 p-2 text-xl grid place-items-center">
        <button onClick={onClick}>
          {ShowPassword ? (
            <IoEyeOff className="text-zinc-500" />
          ) : (
            <IoEye className="text-zinc-500" />
          )}
        </button>
      </div>
    </div>
  );
}
