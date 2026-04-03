export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const authorMemberId = String(req.query.authorMemberId || "").trim();

  if (!authorMemberId) {
    return res.status(400).json({ error: "authorMemberId is required" });
  }

  try {
    const upstream = await fetch(
      `https://columnist-landingpage.cmoney.tw/api/experience-course?authorMemberId=${encodeURIComponent(authorMemberId)}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const text = await upstream.text();
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");
    res.setHeader("Cache-Control", "no-store");

    return res.status(upstream.status).send(text);
  } catch (error) {
    return res.status(502).json({
      error: "Failed to fetch upstream experience courses",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
