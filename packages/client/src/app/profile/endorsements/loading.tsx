import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="grid h-full w-full place-items-center py-12">
      <Loader />;
    </div>
  );
}
