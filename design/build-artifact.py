"""Assemble design/index.html and its css/js into one file for publishing (the claude.ai artifact,
or any single-file host). Run from anywhere: python design/build-artifact.py
Writes design/dist/triforce-defense.html. If Playwright and a Chromium are available it also renders the
file inside a host-like wrapper and checks that the :root tokens survived (the 17 Oct publish bug)."""
import re, os, sys
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'')
OUT=os.path.join(D,'dist'); os.makedirs(OUT,exist_ok=True)
html=open(D+'index.html',encoding='utf-8').read()
tok=open(D+'warglass_tokens.css',encoding='utf-8').read(); ds=open(D+'warglass_ds.css',encoding='utf-8').read()
sc=open(D+'screens.css',encoding='utf-8').read(); js=open(D+'gdd.js',encoding='utf-8').read()
fonts=re.findall(r"@import\s+url\(\s*['\"]?([^'\")]+)['\"]?\s*\)\s*;",tok)
tok=re.sub(r"@import\s+url\([^)]*\)\s*;","",tok)
assert '@import' not in tok and ':root {' in tok, 'the tokens block must survive'
title=re.search(r"<title>.*?</title>",html,re.S).group(0)
body=re.search(r"<body[^>]*>.*</body>",html,re.S).group(0)
body=re.sub(r'<script src="gdd.js"></script>\s*','',body)
links="".join(f'<link rel="stylesheet" href="{f}">' for f in fonts)
out=f'<!doctype html><html lang="en"><head><meta charset="utf-8">{title}{links}<style>{tok}\n{ds}\n{sc}</style></head>{body}<script>{js}</script></html>'
path=os.path.join(OUT,'triforce-defense.html'); open(path,'w',encoding='utf-8').write(out)
print('wrote',path,len(out),'bytes')
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print('playwright not installed: skipping the render check'); sys.exit(0)
wrap='<!doctype html><html><head><meta charset=utf8><style>:root{color-scheme:light}body{margin:0;font:14px sans-serif;background:#fff;color:#000}</style></head><body>'+out+'</body></html>'
wpath=os.path.join(OUT,'_wrapped.html'); open(wpath,'w',encoding='utf-8').write(wrap)
exe=os.environ.get('CHROME_PATH')
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    pg=b.new_page(viewport={'width':1600,'height':1000}); errs=[]
    pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.goto('file:///'+wpath.replace('\\','/')); pg.wait_for_timeout(1500)
    v=pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--map-paper').trim()")
    print('--map-paper:',repr(v),'errors:',errs); b.close()
os.remove(wpath)
assert v, 'tokens lost in the wrapper'
