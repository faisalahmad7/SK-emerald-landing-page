import { chromium } from 'playwright'
const routes=['/','/collections','/collections/sofas','/collections/recliners','/collections/beds','/collections/wardrobes','/collections/modular-kitchens','/collections/tv-units','/interiors','/gallery','/about','/materials','/contact','/faq','/privacy','/nope','/collections/nope']
const b = await chromium.launch(); let bad=0
for (const w of [320,375,768,1360]) {
  const pg = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage(); const errs=[]
  pg.on('pageerror',e=>errs.push('PAGEERR '+e)); pg.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_(INTERNET|NAME|CONN)/.test(m.text()))errs.push(m.text())})
  pg.on('requestfailed',r=>{if(!/fonts\.g/.test(r.url()))errs.push('REQFAIL '+r.url())})
  for (const r of routes) {
    await pg.goto('http://localhost:4173'+r); await pg.waitForTimeout(250)
    const H=await pg.evaluate(()=>document.documentElement.scrollHeight)
    for(let y=0;y<H;y+=500){await pg.evaluate(y=>window.scrollTo(0,y),y);await pg.waitForTimeout(40)}
    await pg.waitForTimeout(350)
    const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length,
      broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),
      ph:document.querySelectorAll('.photo.ph').length,empty:[...document.querySelectorAll('.tile .photo')].filter(p=>!p.classList.contains('ready')).length,
      txt:/design reference|reference image|placeholder image|ai reference/i.test(document.body.innerText)}))
    const flag=o.sw>o.cw||o.h1!==1||o.broken.length||o.ph||o.empty||o.txt||errs.length
    if(flag){bad++;console.log('!!',w,r,JSON.stringify(o),errs.splice(0).join(' | '))}
  }
  await pg.close()
}
console.log('audit complete; routes with problems:',bad); await b.close()
