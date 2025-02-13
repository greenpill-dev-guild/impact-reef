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
  const msPerSecond = 1000;
  const msPerMinute = 60 * msPerSecond;
  const msPerHour = 60 * msPerMinute;
  const msPerDay = 24 * msPerHour;
  const msPerMonth = 30 * msPerDay;
  const msPerYear = 12 * msPerMonth;

  const updatedDate = new Date(updatedAt).getTime();
  const now = new Date().getTime();
  const differenceInMs = now - updatedDate;

  if (differenceInMs < msPerSecond) {
    return "just now";
  }

  if (differenceInMs < msPerMinute) {
    return `${Math.floor(differenceInMs / msPerSecond)} seconds ago`;
  }

  if (differenceInMs < msPerHour) {
    return `${Math.floor(differenceInMs / msPerMinute)} minutes ago`;
  }

  if (differenceInMs < msPerDay) {
    return `${Math.floor(differenceInMs / msPerHour)} hours ago`;
  }

  if (differenceInMs < msPerMonth) {
    return `${Math.floor(differenceInMs / msPerDay)} days ago`;
  }

  if (differenceInMs < msPerYear) {
    return `${Math.floor(differenceInMs / msPerMonth)} months ago`;
  }

  return `${Math.floor(differenceInMs / msPerYear)} years ago`;
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
