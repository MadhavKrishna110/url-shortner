# Node.js URL Shortener

# Overview
This is a lightweight URL shortening service implemented in Node.js. The project provides functionality to:

Generate short URLs
Redirect to original long URLs
Track URL analytics
Automatically expire short URLs after a specified duration

# Features

URL Shortening: Convert long URLs into compact, easy-to-share short URLs
Time-Based Expiry: Set custom expiration times for shortened URLs
Analytics Tracking: Monitor the number of times a short URL has been accessed
Automatic Cleanup: Periodic removal of expired URL mappings

# Installation
Prerequisites

Node.js (v14 or higher)
npm (Node Package Manager)

Steps

Clone the repository:
bashCopygit clone https://github.com/your-username/url-shortener.git
cd url-shortener

Install dependencies:
bashCopynpm install


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

Each short URL is generated as a unique 12-character hexadecimal string
URLs are automatically removed after the specified duration
A cron job runs every minute to clean up expired URLs
Tracking is maintained for URL access count

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
