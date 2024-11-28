import urlService from "../services/urlService.js";
const PORT = 8080;
const config = {
  host: `http://localhost:${PORT}`,
};
const shortenUrl = (req, res) => {
  const body = req.body;
  try {
    const response = urlService.shortenUrl(body);
    if (!response) {
      console.error("Shortened URL generation failed.");
      return res.status(400).json({
        message: "Failed to generate a shortened URL.",
      });
    }

    const shortenedUrl = `${config.host}/url/${response}`;
    return res.status(200).json({
      message: "Success: URL has been shortened successfully.",
      url: shortenedUrl,
    });
  } catch (err) {
    console.error("Error in shorten Url:", { err });
    return res.status(500).json({
      message: "Internal Server Error: Failed to generate a shortened URL.",
    });
  }
};

const getOriginalUrl = (req, res) => {
  const { path } = req.params;
  try {
    const originalUrl = urlService.getOriginalUrl(path);
    if (!originalUrl) {
      console.error(`Shortened url not found: ${path}`);
      return res.status(404).json({
        error: "Not Found: The shortened URL does not exist or has expired.",
      });
    }
    return res.redirect(originalUrl);
  } catch (err) {
    console.error("Error in getOriginalUrl:", { err });
    return res.status(500).json({
      message: "Internal Server Error: Failed to fetch the original URL.",
    });
  }
};

const getAnalytics = (req, res) => {
  try {
    const response = urlService.getAnalytics();
    if (!response) {
      return res.status(204).json({ message: "No analytics data available." });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error("Error in getAnalytics:", { err });
    return res.status(500).json({
      message: "nternal Server Error: Failed to fetch analytics data.",
    });
  }
};

export default {
  shortenUrl,
  getOriginalUrl,
  getAnalytics,
};
