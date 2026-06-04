import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

old_str = """             },320);

           if (!omitirProyectiles) {"""

new_str = """             },320);
           }

           if (!omitirProyectiles) {"""

if old_str in content:
    content = content.replace(old_str, new_str, 1)
    with open("pokemon.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed missing bracket!")
else:
    print("Pattern not found! Trying alternate whitespace...")
    old_str_2 = "},320);\n\n           if (!omitirProyectiles) {"
    new_str_2 = "},320);\n           }\n\n           if (!omitirProyectiles) {"
    if old_str_2 in content:
        content = content.replace(old_str_2, new_str_2, 1)
        with open("pokemon.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("Fixed missing bracket! (alt 1)")
    else:
        # Just use regex
        content_new = re.sub(r'\},320\);\s*if \(\!omitirProyectiles\) \{', '},320);\n           }\n\n           if (!omitirProyectiles) {', content)
        if content_new != content:
            with open("pokemon.html", "w", encoding="utf-8") as f:
                f.write(content_new)
            print("Fixed missing bracket! (regex)")
        else:
            print("Could not find the missing bracket location.")
