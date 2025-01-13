const DEV_API_URL = "http://localhost:3000/api/analytics";
const PROD_API_URL = "https://twitdown.com/api/analytics";

export async function getAnalytics() {
  const API_URL =
    process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
  const res = await fetch(API_URL, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}
