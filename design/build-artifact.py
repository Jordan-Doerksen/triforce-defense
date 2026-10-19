"""Assemble design/index.html + its css/js into one file for the artifact, then render it
inside the same skeleton the artifact host uses and check that the tokens survived."""
import re, asyncio, sys
D='/home/user/triforce-defense/design/'
S='/tmp/claude-0/-home-user-triforce-defense/5fd17a30-820a-5f9e-aab9-a09c383aecc6/scratchpad'
html=open(D+'index.html').read()
tok=open(D+'warglass_tokens.css').read(); ds=open(D+'warglass_ds.css').read(); sc=open(D+'screens.css').read(); js=open(D+'gdd.js').read()
fonts=re.findall(r"@import\s+url\(\s*['\"]?([^'\")]+)['\"]?\s*\)\s*;",tok)
tok=re.sub(r"@import\s+url\([^)]*\)\s*;","",tok)
assert '@import' not in tok and ':root {' in tok
title=re.search(r"<title>.*?</title>",html,re.S).group(0)
body=re.search(r"<body[^>]*>.*</body>",html,re.S).group(0)
body=re.sub(r'<script src="gdd.js"></script>\s*','',body)
links="".join(f'<link rel="stylesheet" href="{f}">' for f in fonts)
out=f'<!doctype html><html lang="en"><head><meta charset="utf-8">{title}{links}<style>{tok}\n{ds}\n{sc}</style></head>{body}<script>{js}</script></html>'
open(S+'/triforce-defense.html','w').write(out)
# host-like wrapper for the check
wrap='<!doctype html><html><head><meta charset=utf8><style>:root{color-scheme:light}body{margin:0;font:14px sans-serif;background:#fff;color:#000}</style></head><body>'+out+'</body></html>'
open(S+'/wrapped.html','w').write(wrap)
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
        pg=await b.new_page(viewport={'width':1600,'height':1000}); errs=[]
        pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
        await pg.goto('file://'+S+'/wrapped.html'); await pg.wait_for_timeout(1500)
        v=await pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--map-paper').trim()")
        bg=await pg.evaluate("getComputedStyle(document.body).backgroundColor")
        print('--map-paper:',repr(v),'body bg:',bg,'errors:',errs)
        await pg.evaluate("document.querySelector('#province').scrollIntoView()"); await pg.wait_for_timeout(600)
        await pg.screenshot(path=S+'/wrapped-province.png')
        await b.close()
asyncio.run(main())
print(len(out), fonts)
