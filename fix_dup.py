import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the second intentarEvolucion function and remove it
match = re.search(r'      function intentarEvolucion\(callback\) \{\n        const starter = starters\[pokemonElegido\];\n        const evoluciones = Object\.keys\(starter\.evoluciones\)\.map\(k => parseInt\(k\)\)\.sort\(\(a, b\) => a - b\);\n        const spriteActual = playerSprite\.src\.split\(\'/\'\)\.pop\(\);\n\n        let indiceActual = evoluciones\.findIndex\(l => starter\.evoluciones\[l\] === spriteActual\);\n        if \(indiceActual === -1\) indiceActual = 0;\n\n        if \(indiceActual \+ 1 < evoluciones\.length\) \{\n          const baseNv = evoluciones\[indiceActual \+ 1\];\n          // Evalúa si el nivel XP alcanzado es suficiente \(pokemonNivel\)\n          if \(pokemonNivel >= baseNv\) \{\n            const nuevoSprite = starter\.evoluciones\[baseNv\];\n            energia = 0; // se resetea por la evolución\n            animarEvolucion\(nuevoSprite, callback\);\n            return true;\n          \}\n        \}\n        return false;\n      \}', content)

if match:
    content = content[:match.start()] + content[match.end():]
    with open("pokemon.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Deleted duplicate function!")
else:
    print("Pattern not found! Trying with slightly different regex...")
    # Just remove from "function intentarEvolucion(callback)" until "return false;\n      }" near the end of the file
    matches = list(re.finditer(r'function intentarEvolucion\(callback\) \{.*?return false;\n\s*\}', content, re.DOTALL))
    if len(matches) > 1:
        # Delete the second match
        match = matches[1]
        content = content[:match.start()] + content[match.end():]
        with open("pokemon.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("Deleted second duplicate function!")
    else:
        print("Could not find two copies of the function.")
