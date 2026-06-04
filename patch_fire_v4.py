import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

changes = 0

def do_replace(old, new, label):
    global content, changes
    if old in content:
        content = content.replace(old, new, 1)
        changes += 1
        print(f"  [OK] {label}")
    else:
        print(f"  [SKIP] {label} - pattern not found")

# Replace Sofoco for Typhlosion with Erupción
do_replace(
    '"typhlosion_back.png": { nombre: "Sofoco 🔥", daño: 28, tipo: "fire" }',
    '"typhlosion_back.png": { nombre: "Erupción 🔥", daño: 28, tipo: "fire" }',
    "Assign Erupción to Typhlosion"
)

if changes > 0:
    with open("pokemon.html", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"\n=== DONE: {changes} changes applied ===")
else:
    print("\n=== NO CHANGES APPLIED ===")
