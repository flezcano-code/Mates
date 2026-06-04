const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err));
  
  await page.goto('file:///C:/Users/Fabi-PC/Desktop/juego/POKEMONMATEMATICO/pokemon.html');
  await page.waitForTimeout(1000);
  
  // Click body to unlock audio
  await page.evaluate(() => document.body.click());
  await page.waitForTimeout(500);

  // Evaluate setTrainer
  await page.evaluate(() => {
      if (typeof setTrainer === 'function') {
          console.log('Calling setTrainer...');
          setTrainer('boy');
      } else {
          console.log('setTrainer is not a function');
      }
  });
  
  await page.waitForTimeout(2000);
  await browser.close();
})();
