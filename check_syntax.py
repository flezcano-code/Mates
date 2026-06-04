import re
import subprocess
import os

with open("pokemon.html", "r", encoding="utf-8") as f:
    html = f.read()

scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)

for i, script in enumerate(scripts):
    filename = f"temp_script_{i}.js"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(script)
    
    result = subprocess.run(["node", "-c", filename], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error in script {i}:")
        print(result.stderr)
        
        # Let's show the lines around the error
        match = re.search(r"(\d+)", result.stderr)
        if match:
            line_num = int(match.group(1))
            lines = script.split('\n')
            start = max(0, line_num - 5)
            end = min(len(lines), line_num + 5)
            print(f"\nCode around line {line_num}:")
            for j in range(start, end):
                prefix = ">> " if j + 1 == line_num else "   "
                print(f"{prefix}{j+1}: {lines[j]}")
    else:
        print(f"Script {i} syntax OK.")
        
    os.remove(filename)
