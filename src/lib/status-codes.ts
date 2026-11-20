export type StatusInfo = {
  code: number;
  group: "client" | "server";
  title: string;
  lead: string;
  todo: string;
};

export const STATUS_CODES: StatusInfo[] = [
  {
    code: 400,
    group: "client",
    title: "Wrong size",
    lead: "We couldn’t make sense of the request. Something in it doesn’t fit.",
    todo: "Check what you typed or submitted and try again.",
  },
  {
    code: 401,
    group: "client",
    title: "Members only",
    lead: "This part of the boutique needs you to sign in first.",
    todo: "Sign in with the right account, then come back.",
  },
  {
    code: 403,
    group: "client",
    title: "Private fitting room",
    lead: "You’re signed in, but this room isn’t open to your account.",
    todo: "Use an account with access, or head back to the main floor.",
  },
  {
    code: 404,
    group: "client",
    title: "Out of the collection",
    lead: "The page you’re looking for isn’t here. It may have moved, sold out or never existed.",
    todo: "Check the address for typos, or start again from the home page.",
  },
  {
    code: 408,
    group: "client",
    title: "Still deciding?",
    lead: "The request took too long to arrive, so the connection closed.",
    todo: "Check your connection and try again.",
  },
  {
    code: 429,
    group: "client",
    title: "Too many fittings at once",
    lead: "Too many requests came in a short time. We’re asking you to slow down.",
    todo: "Wait a minute, then try again.",
  },
  {
    code: 500,
    group: "server",
    title: "Backstage malfunction",
    lead: "Something broke on our side. It isn’t you, and we’ve been told about it.",
    todo: "Try again in a moment. If it keeps happening, let us know what you were doing.",
  },
  {
    code: 502,
    group: "server",
    title: "The courier got lost",
    lead: "One of our services answered with something we couldn’t use.",
    todo: "Reload the page. It usually clears up quickly.",
  },
  {
    code: 503,
    group: "server",
    title: "Closed for restyling",
    lead: "The shop is temporarily unavailable, usually for maintenance or heavy traffic.",
    todo: "Come back in a few minutes.",
  },
];

export const getStatus = (code: number) =>
  STATUS_CODES.find((s) => s.code === code)!;
