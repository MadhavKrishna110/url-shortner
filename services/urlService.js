import { randomBytes } from "crypto";
import cron from "node-cron";
const PORT = 8080;

const urlLongToShortMap = new Map();
const urlShortToLongMap = new Map();
const ttlMap = new Map();

const task = cron.schedule("*/1 * * * *", () => {
  console.log("Running cron");
  cronTask();
});

task.start();

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
  console.log(" url with time {} and expiry {}", currTime, longUrlObj?.expiry);
  if (longUrlObj && currTime >= longUrlObj.expiry) {
    console.log(
      "Deleting url with time {} and expiry {}",
      currTime,
      longUrlObj.expiry
    );
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
    expiry: Date.now() + duration * 1000 * 60,
  }); // taking duration as minutes
  urlShortToLongMap.set(shortUrl, {
    url: url,
    expiry: Date.now() + duration * 1000 * 60,
  });
  return shortUrl;
}

function getOriginalUrl(shortUrl) {
  checkAndRemoveExpiredUrl(shortUrl);
  const longUrl = urlShortToLongMap.get(shortUrl)?.url;
  if (longUrl) {
    return longUrl;
  }
}

export default {
  shortenUrl,
  getOriginalUrl,
  cronTask,
};
