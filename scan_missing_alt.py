import pathlib
import re

root = pathlib.Path('.')
files = list(root.rglob('*.tsx')) + list(root.rglob('*.ts'))
files = [f for f in files if 'node_modules' not in f.parts and '.next' not in f.parts and 'build' not in f.parts]
pattern = re.compile(r'<Image\b')
altpat = re.compile(r'alt\s*=')
for f in sorted(files    text = f.read_text(encoding='utf-8')
    if pattern.search(text) and not altpat.search(text):
        print(f)
