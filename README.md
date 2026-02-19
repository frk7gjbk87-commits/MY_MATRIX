# Safari Proxy Browser

A full-featured Safari browser clone with a local proxy server.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Proxy Server
```bash
npm start
```

The server will run on `http://localhost:3000`

You should see:
```
✅ Proxy server running at http://localhost:3000
📡 Proxy endpoint: http://localhost:3000/api/proxy?url=<target-url>
```

### 3. Open the Browser
Open `safari-browser.html` in your web browser (double-click or drag into browser)

## Usage

1. Enter any URL in the address bar
2. Press Enter to navigate
3. Use back/forward buttons to navigate history
4. Click "Reload" to refresh the page

## Features

- ✅ Local proxy server (no external dependencies)
- ✅ Full browser navigation (back, forward, reload)
- ✅ URL history tracking
- ✅ Search functionality
- ✅ Loading indicators
- ✅ Error handling
- ✅ macOS Safari UI design
- ✅ Security (strips scripts/iframes)

## How It Works

1. Browser makes a request to the local proxy server
2. Proxy fetches the URL and returns cleaned HTML
3. Content is displayed in the browser
4. Scripts and iframes are removed for security

## Requirements

- Node.js 14+
- npm

## Notes

- Make sure the proxy server is running before using the browser
- The server must be running on `localhost:3000`
- Content is limited to 500KB for performance
- Scripts are stripped from pages for security
