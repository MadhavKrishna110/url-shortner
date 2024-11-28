import { randomBytes } from "crypto";

const PORT = 8080;

const urlLongToShortMap = new Map();
const urlShortToLongMap = new Map();

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
  }); // taking duration as minutes
  urlShortToLongMap.set(shortUrl, {
    url: url,
    createdAt: Date.now(),
    expiry: Date.now() + duration * 1000 * 60,
    count: 0,
  });
  return shortUrl;
}

function getOriginalUrl(shortUrl) {
  checkAndRemoveExpiredUrl(shortUrl);
  const longUrlObj = urlShortToLongMap.get(shortUrl);
  if (longUrlObj) {
    longUrlObj.count++;
    console.log("values", longUrlObj);
    return longUrlObj.url;
  }
}

function getAnalytics() {
  const arr = Array.from(urlShortToLongMap.entries()).filter(
    ([key, value]) => value.count > 0
  );
  return arr;
}

export default {
  shortenUrl,
  getOriginalUrl,
  getAnalytics,
  cronTask,
};
