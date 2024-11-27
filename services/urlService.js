const crypto = require("crypto");

const PORT = 8080;

const urlLongToShortMap = new Map();
const urlShortToLongMap = new Map();
const ttlMap = new Map();

function urlGenerator() {
  let shortUrl;
  do {
    shortUrl = crypto.randomBytes(6).toString("hex"); // Generate a 12-character hexadecimal string
  } while (urlShortToLongMap.has(shortUrl));
  return shortUrl;
}

function shortenUrl(url) {
  if (urlLongToShortMap.has(url)) {
    return urlLongToShortMap.get(url);
  }

  const shortUrl = urlGenerator();

  urlLongToShortMap.set(url, shortUrl);
  urlShortToLongMap.set(shortUrl, url);
  return shortUrl;
}

function getOriginalUrl(url) {
  const longUrl = urlShortToLongMap.get(url);
  if (longUrl) {
    return longUrl;
  }
}

module.exports = {
  shortenUrl,
  getOriginalUrl,
};
