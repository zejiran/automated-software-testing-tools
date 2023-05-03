const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');

    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({ path: './page.png' })
    await page.click('button')
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({ path: './page2.png' })
    console.log('Project loaded')
    //Interactuar con la aplicación web
    await page.click('a.btn.btn-link')
    console.log(`Clicked "cancel". URL is now ${page.url()}`)

    await page.click('a.btn.btn-link')
    console.log(`Clicked "register". URL is now ${page.url()}`)

    await page.click('button.btn.btn-primary')
    let feedback = await page.$$('div.invalid-feedback');

    let elems = 0
    for (let i of feedback) { elems++ }
    await page.screenshot({ path: './form-feedback.png' })
    console.log(`Clicked "Register" with an empty form. Feedback is shown in ${elems} elements`)

    await page.type('input[formcontrolname="firstName"]', 'Monitor');
    await page.type('input[formcontrolname="lastName"]', 'Pruebas');
    await page.type('input[formcontrolname="username"]', 'pruebas');
    await page.type('input[formcontrolname="password"]', 'MISO4208');
    await page.click('button.btn.btn-primary')

    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({ path: './success-feedback.png' })

    feedback = await page.$("div.alert.alert-success")
    let text = await page.evaluate(el => el.textContent, feedback)
    console.log(`Success dialog after creating user with message: ${text}`)

    await page.type('input[formcontrolname="username"]', 'pruebas');
    await page.type('input[formcontrolname="password"]', 'MISO4208');
    await page.click('button.btn.btn-primary')
    await new Promise(r => setTimeout(r, 7000));

    feedback = await page.$('h1');

    text = await page.evaluate(el => el.textContent, feedback)
    await page.screenshot({ path: './after-login.png' })
    console.log(`Logged in. Your user was ${text === 'Hi Monitor!' ? 'successfully' : 'not'} created`)
    await browser.close();
    return;
})().catch(e => console.log(e));
