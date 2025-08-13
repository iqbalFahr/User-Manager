export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    const url = new URL("https://emailvalidation.abstractapi.com/v1/");
    url.searchParams.set("api_key", process.env.ABSTRACT_EMAIL_API_KEY);
    url.searchParams.set("email", email);

    const r = await fetch(url.toString());
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Email validation failed" });
  }
}