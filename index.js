const http = require('http');
const https = require('https');
const { parse } = require('url');

// Create a proxy server
const proxyServer = http.createServer((req, res) => {
    // Parse the request URL
    const { pathname, query } = parse(req.url, true);

    // Options for the outgoing request
    const options = {
        hostname: 'rocketbotroyale2.winterpixel.io',
        path: pathname + (query ? '?' + query : ''),
        method: req.method,
        headers: req.headers
    };

    // Send the request to the external server
    const proxyReq = https.request(options, (proxyRes) => {
        // Set the response headers
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        
        // Pipe the response from the external server to the client
        proxyRes.pipe(res);
    });

    // Handle errors
    proxyReq.on('error', (error) => {
        console.error('Proxy request error:', error);
        res.statusCode = 500;
        res.end('Proxy request failed');
    });

    // Pipe the request body, if any
    req.pipe(proxyReq);
});

// Start the proxy server
const PORT = process.env.PORT || 3000;
proxyServer.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
