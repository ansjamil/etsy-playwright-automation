import puppeteer from 'puppeteer'
import { Solver } from '@2captcha/captcha-solver'
import { readFile } from 'node:fs/promises'
const solver = new Solver(process.env.APIKEY)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export async function runMyScript() {
const browser = await puppeteer.launch({
    devtools: true,
    slowMo: 11
  });


const [page] = await browser.pages()

await page.goto('https://www.jqueryscript.net/demo/image-puzzle-slider-captcha/')

let success = false

while (!success) {
    try {
        const consentButton = await page.waitForSelector('body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-footer-buttons-container > div.fc-footer-buttons > button.fc-button.fc-cta-do-not-consent.fc-secondary-button', { timeout: 3000 })
        if (consentButton) consentButton.click()
    } catch (e) { }

    const instruction = await readFile('./imginstructions.png', { encoding: 'base64' })


const img = await page.evaluate(() => document.querySelector('canvas').toDataURL())
if (img.length < 2000) return

try {
    const res = await solver.coordinates({
        body: img,
        textinstructions: 'Puzzle center | Центр пазла',
        imginstructions: instruction
    })
    const offset = res.data[0].x       

    const slider = await page.$('div.slider')

const bb = await slider.boundingBox()

const init = {
    x: bb.x + bb.width / 2,
    y: bb.y + bb.height / 2
}


const target = {
    x: bb.x + bb.width / 2 + parseFloat(offset) - 20,
    y: res.data[0].y
}

await page.mouse.move(init.x, init.y)
await page.mouse.down()
await page.mouse.move(target.x, target.y, {
    steps: randomInt(50, 100)
})
await page.mouse.up()


try {
    await page.waitForNavigation({ timeout: 5000 })
    success = true
    await solver.goodReport(res.id)
    await page.screenshot({
        path: 'screenshot.png'
    })
    await new Promise(ok => setTimeout(() => ok(), 5000))
    await page.close()
    await browser.close()
} catch (e) {
    await solver.badReport(res.id)
}

    } catch (e) {
        console.log(`Failed to solve the captcha: ${e.err}`)
    }
}
}
