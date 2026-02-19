const express = require('express');
const axios = require('axios');
const cors = require('cors');
const url = require('url');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Proxy endpoint
app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Validate URL
    try {
        new url.URL(targetUrl);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        // Fetch the webpage
        const response = await axios.get(targetUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            maxRedirects: 5
        });

        const html = response.data;

        // Clean the HTML (remove scripts and iframes for security)
        const cleanHTML = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
            .replace(/<(?!(?:p|div|span|h[1-6]|br|hr|a|img|table|tr|td|th|b|i|strong|em|section|article|header|footer|nav|ul|li|ol)\b)[^>]*>/gi, '');

        res.json({
            success: true,
            content: cleanHTML.substring(0, 500000),
            title: response.headers['content-type'],
            url: targetUrl
        });

    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).json({
            error: 'Failed to fetch URL',
            details: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Proxy server is running' });
});

app.listen(PORT, () => {
    console.log(`\n✅ Proxy server running at http://localhost:${PORT}`);
    console.log(`📡 Proxy endpoint: http://localhost:${PORT}/api/proxy?url=<target-url>\n`);
});
