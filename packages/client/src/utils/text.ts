export const shortenAddress: (arg0: string) => string = (address) => {
  if (!address) return "no address provided";
  const start = address.slice(0, 6);
  const end = address.slice(address.length - 4);
  return `${start}...${end}`;
};

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export function isValidEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export function userFullName(user: {
  id: string;
  name: string | null;
  family_name: string | null;
}) {
  return (user?.name + " " + user?.family_name).replaceAll("null", "");
}

export function collaborator_names_with_author(
  collaborators: Array<object>,
  author: { id: string; name: string | null; family_name: string | null }
) {
  const collaborator_names = collaborators.map((user: any) =>
    userFullName(user)
  );
  collaborator_names.push(userFullName(author));
  return collaborator_names.join(", ");
}

export function truncateDescription(description: string) {
  return description.length > 80
    ? description.slice(0, 80 - 1) + "..."
    : description;
}

export function formatPrice(price: number | null) {
  return price?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
