export const formatAddress: (arg0: string) => string = (address) => {
  if (!address) return "no address provided";
  if (address.includes(".eth")) return address;

  const start = address.slice(0, 6);
  const end = address.slice(address.length - 4);
  return `${start}...${end}`;
};

export function formatPrice(
  price: number | null,
  currency?: "ETH" | "USDC" | "OP",
) {
  return price?.toLocaleString("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  });
}

export function formatLastUpdated(updatedAt: string) {
  const updatedDate = new Date(updatedAt).getTime();
  const now = new Date().getTime();

  console.log("updatedDate", updatedDate, now);

  const differenceInSeconds = Math.floor((now - updatedDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count !== 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function determineSocialMedia(link: string | null) {
  if (!link) return { icon: "/icons/globe-alt.svg", label: "link" };

  if (link.includes("https://twitter.com") || link.includes(" https://x.com"))
    return {
      icon: "/icons/x.svg",
      label: "X",
    };

  if (link.includes("https://warpcast.com"))
    return {
      icon: "/icons/farcaster.svg",
      label: "farcaster",
    };

  if (link.includes("https://mirror.xyz"))
    return {
      icon: "/icons/mirror.svg",
      label: "mirror",
    };

  if (link.includes("https://discord.com"))
    return {
      icon: "/icons/discord.svg",
      label: "discord",
    };

  if (link.includes("https://t.me"))
    return {
      icon: "/icons/telegram.svg",
      label: "telegram",
    };

  return {
    icon: "/icons/globe-alt.svg",
    label: "link",
  };
}
