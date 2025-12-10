import handler from './pages/api/rewrite-product.js';

// Mock Response Object
const res = {
    status: (code) => {
        console.log(`[Status] ${code}`);
        return res;
    },
    json: (data) => {
        console.log("--- API Output ---");
        console.log(JSON.stringify(data, null, 2));
        console.log("------------------");
        return res;
    },
    setHeader: () => { },
    end: () => { }
};

// Mock Request Object (The Test Product)
const req = {
    method: 'POST',
    body: {
        title: "Wooden Vintage Wall Clock",
        body_html: `
      A handcrafted wooden wall clock with a rustic vintage design. 
      Features silent quartz movement, a smooth matte finish, and warm natural tones. 
      Ideal for living rooms, offices, or decorative interior spaces.
    `
    }
};

console.log("Verifying 'Wooden Vintage Wall Clock'...");
try {
    handler(req, res);
} catch (e) {
    console.error("Handler error:", e);
}
