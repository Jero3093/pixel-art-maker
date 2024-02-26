import { Toaster } from "sonner";

function SonnerToaster() {
  return (
    <div className="absolute z-10">
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default SonnerToaster;
