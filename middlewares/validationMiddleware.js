import { URL } from "url";
import validator from "validator";

function isValidUrl(urlString) {
  // Method 1: Using built-in URL constructor
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function isValidUrlValidator(urlString) {
  // Method 2: Using validator library (most comprehensive)
  return validator.isURL(urlString, {
    protocols: ["http", "https"],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    validate_length: true,
  });
}

function isValidUrlRegex(urlString) {
  // Method 3: Regex-based validation
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i" // fragment locator
  );
  return !!urlPattern.test(urlString);
}

function preValidateUrl(urlString) {
  // Comprehensive validation
  const checks = [
    // Check if URL is not empty
    !!(urlString && urlString.trim()),

    // Length validation
    urlString.length <= 2048, // Most browsers support URLs up to 2048 characters

    // Built-in URL validation
    isValidUrl(urlString),

    // Validator library check
    isValidUrlValidator(urlString),

    // Regex validation
    isValidUrlRegex(urlString),
  ];

  // Optional: Additional custom checks
  const customChecks = [];

  // Combine all checks
  return checks.every((check) => check) && customChecks.every((check) => check);
}

function preValidate(req, res, next) {
  console.log("prevalidation");
  const body = JSON.parse(JSON.stringify(req.body));
  if (!preValidateUrl(req.body.url)) {
    throw new Error("Invalid URL");
  }
  next();
}
export default {
  preValidate,
};
