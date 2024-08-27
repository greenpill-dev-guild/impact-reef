import { FadeLoader, ScaleLoader, BeatLoader } from "react-spinners";

type LoaderType = "spinner" | "dots" | "wave";

interface LoaderProps {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg";
  type?: LoaderType;
  className?: string;
}

const LoadStyle = {
  spinner: FadeLoader,
  dots: ScaleLoader,
  wave: BeatLoader,
};

const sizeMap = {
  xs: 1,
  sm: 4,
  md: 8,
  lg: 12,
};

export const Loader: React.FC<LoaderProps> = ({
  message,
  size = "md",
  type = "spinner",
  className,
}) => {
  const LoaderComponent = LoadStyle[type];

  return (
    <div
      className={`text-center w-full h-full grid place-items-center ${className}`}
    >
      <div>
        <LoaderComponent size={sizeMap[size]} className={className} />
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};
