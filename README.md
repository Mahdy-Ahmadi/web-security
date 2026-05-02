# Web Security Guard

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Security Status](https://img.shields.io/badge/security-active-brightgreen.svg)](https://github.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A lightweight, zero-dependency frontend security layer that protects websites against common client-side attacks including XSS, Clickjacking, console hijacking, phishing attempts, and unauthorized copying.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Security Features Explained](#security-features-explained)
- [Browser Compatibility](#browser-compatibility)
- [Important Security Notice](#important-security-notice)
- [Configuration Options](#configuration-options)
- [License](#license)

---

## Features

| Protection Layer | Description |
|-----------------|-------------|
| XSS Protection | Sanitizes user inputs and removes malicious script tags automatically |
| Clickjacking Prevention | Prevents your site from being embedded in malicious iframes |
| Developer Tools Blocking | Disables F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U |
| Console Hijacking Protection | Blocks malicious code from hijacking browser console |
| Copy Protection | Prevents copying of sensitive content from protected areas |
| External Link Validation | Shows confirmation dialog for suspicious external links |
| DOM Mutation Monitoring | Automatically removes dynamically injected malicious elements |
| CSP Header Injection | Adds basic Content Security Policy via meta tag |

---

## Installation

### Method 1: Direct Download

1. Download `security-guard.js` from this repository
2. Place it in your project directory
3. Include it in your HTML file

### Method 2: Git Clone

```bash
git clone https://github.com/mahdy-ahmadi/web-security.git
cd web-security
