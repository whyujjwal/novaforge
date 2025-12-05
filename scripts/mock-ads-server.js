const http = require('http');

const ads = [
    {
        title: "Deploy Faster with CloudScale",
        text: "Global edge network for your static sites. Start for free.",
        color: "#0070f3",
        button: "Deploy Now"
    },
    {
        title: "Debug Like a Pro",
        text: "Stop guessing. Start fixing. Full stack observability.",
        color: "#8e44ad",
        button: "Try TraceIt"
    },
    {
        title: "DevFuel Coffee",
        text: "The coffee that compiles your code. 100% Arabica.",
        color: "#d35400",
        button: "Order Sample"
    }
];

let currentAdIndex = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/banner') {
        const ad = ads[currentAdIndex];
        currentAdIndex = (currentAdIndex + 1) % ads.length;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body style="margin:0;padding:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;background:#f8f9fa;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden;">
                <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:15px;background:white;border:1px solid #e1e4e8;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05);max-width:90%;">
                    <div style="font-weight:600;color:${ad.color};font-size:14px;margin-bottom:4px;">SPONSORED</div>
                    <h3 style="margin:0 0 8px 0;color:#24292e;font-size:16px;">${ad.title}</h3>
                    <p style="margin:0 0 12px 0;color:#586069;font-size:13px;line-height:1.4;">${ad.text}</p>
                    <button style="padding:6px 12px;background:${ad.color};color:white;border:none;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;transition:opacity 0.2s;">${ad.button}</button>
                </div>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Mock Ads Server running on port 3000');
});
