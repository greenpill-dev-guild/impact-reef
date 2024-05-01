import { FadeLoader, ScaleLoader, BeatLoader } from "react-spinners";

type LoaderType = "spinner" | "dots" | "wave";

interface LoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  type?: LoaderType;
}

const LoadStyle = {
  spinner: FadeLoader,
  dots: ScaleLoader,
  wave: BeatLoader,
};

const sizeMap = {
  sm: 4,
  md: 8,
  lg: 12,
};

export const Loader: React.FC<LoaderProps> = ({
  message,
  size = "md",
  type = "spinner",
}) => {
  const LoaderComponent = LoadStyle[type];

  return (
    <div className="text-center w-full h-full grid place-items-center">
      <div>
        <LoaderComponent size={sizeMap[size]} />
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};
