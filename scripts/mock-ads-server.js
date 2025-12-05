const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/banner') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`
            <html>
            <body style="margin:0;padding:0;font-family:sans-serif;background:#eef;display:flex;align-items:center;justify-content:center;height:100vh;">
                <div style="text-align:center;">
                    <h3 style="margin:0;color:#333;">Buy NovaForge Pro!</h3>
                    <p style="margin:5px 0;color:#666;">Support the development.</p>
                    <button style="padding:5px 10px;background:#007acc;color:white;border:none;cursor:pointer;">Learn More</button>
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
