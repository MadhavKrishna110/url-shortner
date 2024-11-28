import { randomBytes } from "crypto";

const PORT = 8080;

const urlLongToShortMap = new Map();
const urlShortToLongMap = new Map();
// Bonus feature -> TTL Implemented
function cronTask() {
  console.log("initial size", urlLongToShortMap.size);
  Array.from(urlShortToLongMap.entries()).forEach(([key, value]) => {
    checkAndRemoveExpiredUrl(key);
  });
  console.log("final size", urlLongToShortMap.size);
}

function checkAndRemoveExpiredUrl(shortUrl) {
  const longUrlObj = urlShortToLongMap.get(shortUrl);
  const currTime = Date.now();
  if (longUrlObj && currTime >= longUrlObj.expiry) {
    urlLongToShortMap.delete(longUrlObj.url);
    urlShortToLongMap.delete(shortUrl);
  }
}

function urlGenerator() {
  let shortUrl;
  do {
    shortUrl = randomBytes(6).toString("hex"); // Generate a 12-character hexadecimal string
  } while (urlShortToLongMap.has(shortUrl));
  return shortUrl;
}

function shortenUrl(body) {
  const url = body.url;
  const duration = body.duration;
  if (urlLongToShortMap.has(url)) {
    return urlLongToShortMap.get(url).url;
  }

  const shortUrl = urlGenerator();

  urlLongToShortMap.set(url, {
    url: shortUrl,
  });
  urlShortToLongMap.set(shortUrl, {
    url: url,
    createdAt: Date.now(),
    expiry: Date.now() + duration * 1000 * 60, // taking duration as minutes for ease
    count: 0,
  });
  return shortUrl;
}

function getOriginalUrl(shortUrl) {
  checkAndRemoveExpiredUrl(shortUrl); // BONUS -> checking the expiry at function call too
  const longUrlObj = urlShortToLongMap.get(shortUrl);
  if (longUrlObj) {
    longUrlObj.count++;
    return longUrlObj.url;
  }
}

function getAnalytics() {
  // Bonus Feature -> TO give the access count along with date created and date expired
  const arr = Array.from(urlShortToLongMap.entries()).map(([key,value]) => {
    return {
      shortUrl: `http://localhost:${PORT}/url/${key}`,
      longUrl: value.url,
      createdAt: new Date(value.createdAt),
      expiry: new Date(value.expiry),
      hitCount: value.count
    }
  });
  return arr;
}

export default {
  shortenUrl,
  getOriginalUrl,
  getAnalytics,
  cronTask,
};
