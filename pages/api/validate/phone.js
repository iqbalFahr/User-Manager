export default async function handler(req, res) {
  const { phone } = req.query;
  if (!phone) return res.status(400).json({ error: "Missing phone" });

  try {
    const url = new URL("https://phonevalidation.abstractapi.com/v1/");
    url.searchParams.set("api_key", process.env.ABSTRACT_PHONE_API_KEY);
    url.searchParams.set("phone", phone);

    const r = await fetch(url.toString());
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Phone validation failed" });
  }
}