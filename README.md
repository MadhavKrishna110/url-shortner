# Node.js URL Shortener

# Overview
This is a lightweight URL shortening service implemented in Node.js. 

The project provides functionality to:
1. Generate short URLs
2. Redirect to original long URLs
3. Track URL analytics
4. Automatically expire short URLs after a specified duration

# Features

1. URL Shortening: Convert long URLs into compact, easy-to-share short URLs
2. Redirection: The shortened URL redirect the user to the original URL when
accessed
3. Unique URLs: Ensures that each long URL generates a unique short URL. If the same
URL is submitted again, the same short URL can be reused
4. Validation: The service should validate input to ensure the URL is valid
5. Time-Based Expiry: Set custom expiration times for shortened URLs
6. Analytics Tracking: Monitor the number of times a short URL has been accessed
7. Automatic Cleanup: Periodic removal of expired URL mappings

# Installation
Prerequisites

Node.js (v14 or higher)
npm (Node Package Manager)

#Steps

Clone the repository:
1. git clone https://github.com/MadhavKrishna110/url-shortener-backend.git
2. cd url-shortener-backend

Install dependencies:
3. npm install

Run Application
4. npm run start

Open in Browser
5. http://localhost:8080/api-docs

6. Hit POST API /short-url to shorten a url with time-to-live as duration
7. Hit GET API /url/:path to redirect to original url
8. Hit GET API /analytics to get the analytics data


# Usage

Shortening a URL
shortenUrl({
  url: 'https://very-long-url.com/with-many-parameters',
  duration: 60 // duration in minutes
})

Retrieving Original URL
getOriginalUrl(shortUrl)

Getting URL Analytics
getAnalytics()

# How It Works

1. Each short URL is generated as a unique 12-character hexadecimal string
2. URLs are automatically removed after the specified duration
3. A cron job runs every minute to clean up expired URLs
4. Tracking is maintained for URL access count

# Configuration

PORT: Configurable server port (default: 8080)
URL expiration is set per-request in minutes

# Dependencies

crypto: For generating unique short URL identifiers
node-cron: For scheduling periodic URL cleanup

# Performance Considerations

In-memory storage using Map for fast lookups
Periodic cleanup to manage memory usage

# Potential Improvements

Persistent storage (database integration)
More robust collision handling
Enhanced analytics tracking
Rate limiting
User authentication for URL management
