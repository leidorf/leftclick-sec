export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    res.status(400).json({ error: "URL parameter is required" });
    return;
  }

  try {
    const response = await fetch(`http://backend:8000/check?q=${encodeURIComponent(q)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data from FastAPI");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in Next.js handler:", error);
    res.status(500).json({ error: error.message });
  }
}
