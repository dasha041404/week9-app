import puppeteer from 'puppeteer-core';
import chromium from 'chromium';

export default function (express, bodyParser) {
    const app = express();
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        next();
    });

    app.get('/login/', (req, res) => {
        res.send('336626');
    });

    app.get('/test/', async (req, res) => {
        const targetUrl = req.query.URL;
        if (!targetUrl) return res.status(400).send('No URL provided');

        let browser;
        try {
            browser = await puppeteer.launch({
                executablePath: chromium.path,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox', 
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-software-rasterizer',
                    '--disable-extensions',
                    '--js-flags="--max-old-space-size=128"'
                ],
                headless: "new"
            });
            
            const page = await browser.newPage();
            
            await page.setViewport({ width: 800, height: 600 });
            
            await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
            
            await page.click('#bt');
            
            await page.waitForFunction(() => {
                const inp = document.querySelector('#inp');
                return inp && inp.value !== '';
            }, { timeout: 10000 });
            
            const result = await page.$eval('#inp', el => el.value);
            
            res.send(result);
        } catch (e) {
            res.status(500).send(e.message);
        } finally {
            if (browser) await browser.close();
        }
    });

    app.all('*', (req, res) => {
        res.send('336626');
    });

    return app;
}
