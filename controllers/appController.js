const urlService = require("../services/urlService");
const PORT = 8080;
const config = {
    host: `http://localhost:${PORT}`
}
const shortenUrl = (req, res) => {
  const body = req.body;
  if (!body.url) {
    res.status(400).json({ error: "Bad Request: 'url' is required in the request body." });
  }
  try {
    new URL(body.url);
  } catch (error) {
    res.status(400).json({ error: "Bad Request: The provided URL is not a valid URL format." });
  }
  const response = urlService.shortenUrl(body.url);
  if (response) {
    const shortenedUrl = `${config.host}/url/${response}`;
    return res.status(200).json({ 
        message: "Success: URL has been shortened successfully.",
        url: shortenedUrl 
      });
  } else {
    console.error("Shortened URL generation failed.");
    res.status(500).json({ error: "Internal Server Error: Failed to generate a shortened URL. Please try again later." });
  }
};

const getOriginalUrl = (req, res) => {
  const { path } = req.params;
  const originalUrl = urlService.getOriginalUrl(path);
  if (!originalUrl) {
    console.error(`Shortened path not found: ${path}`);
    res.status(404).json({ error: "Not Found: The shortened URL does not exist or has expired." });
  }
  return res.redirect(originalUrl);
};

module.exports = {
  shortenUrl,
  getOriginalUrl,
};
