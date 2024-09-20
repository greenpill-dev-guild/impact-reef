import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <Loader size="lg" />;
    </div>
  );
}
