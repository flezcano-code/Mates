// ================================================================
// POKÉMATH EMERALD — CONTEXTOS NARRATIVOS v3.0
// 1° a 4° básico · Chile · máxima variedad, sin repetición
// ================================================================
// FUNCIÓN PRINCIPAL: generarPreguntaPokemon(cfg)
// ================================================================

// ─────────────────────────────────────────────────────────────────
// LORE POR POKÉMON
// ─────────────────────────────────────────────────────────────────
const LORE = {
  charmander:  { nombre:'CHARMANDER',  tipo:'fuego',   recurso:['brasas','ascuas','chispas de fuego','llamaradas','fragmentos de llama','destellos ígneos','pepitas de lava','cargas de calor'], alimento:['bayas tostadas','frutos secos chamuscados','carne asada','raíces quemadas','hongos del volcán','semillas caramelizadas'], habitat:['el volcán','la cueva de lava','la montaña ardiente','la grieta ígnea','el desierto rojo','la roca caliente','el cráter dormido','la senda de ceniza'], enemigo_amigo:['Geodude','Sandshrew','Ekans','Onix','Cubone','Machop','Mankey','Rhyhorn'], ataque:['Ascuas','Cola Ígnea','Zarpazo','Rasguño','Lanzallamas','Gruñido'] },
  charmeleon:  { nombre:'CHARMELEON', tipo:'fuego',   recurso:['llamas azules','chorros de fuego','ráfagas ígneas','energía flamígera','brasas azuladas'], alimento:['carne asada','hongos de cueva','bayas energéticas','insectos de montaña'], habitat:['la cueva volcánica','la montaña de lava','la grieta ardiente','el acantilado de fuego'], enemigo_amigo:['Haunter','Magmar','Arcanine','Rhydon','Electrode'], ataque:['Lanzallamas','Furia','Garra Dragón','Cortina Humo'] },
  charizard:   { nombre:'CHARIZARD',  tipo:'fuego',   recurso:['bolas de fuego','columnas ígneas','destellos solares','explosiones flamígeras'], alimento:['Pokémon de roca','bayas raras del volcán','minerales volcánicos'], habitat:['el cielo tormentoso','el pico volcánico','la nube de fuego','la isla de lava'], enemigo_amigo:['Aerodactyl','Dragonite','Gyarados','Blastoise rival'], ataque:['Anillo Ígneo','Vuelo','Llamarada','Fuerza'] },
  bulbasaur:   { nombre:'BULBASAUR',  tipo:'planta',  recurso:['semillas','esporas','brotes verdes','hojas cortantes','pétalos','polvos vegetales','raíces de energía','gotas de savia'], alimento:['bayas frescas','musgo de roca','néctar floral','hojas energéticas','frutas silvestres'], habitat:['la pradera','el bosque profundo','el jardín salvaje','el claro solar','el pantano verde','la colina florida'], enemigo_amigo:['Caterpie','Weedle','Pidgey','Oddish','Exeggcute','Paras','Bellsprout'], ataque:['Látigo Cepa','Absorber','Hoja Afilada','Somníboro','Drenadoras'] },
  squirtle:    { nombre:'SQUIRTLE',   tipo:'agua',    recurso:['chorros de agua','burbujas','destellos acuáticos','gotas de energía','cápsulas de agua','pulsos líquidos'], alimento:['algas marinas','peces pequeños','bayas acuáticas','plancton','cangrejos de río'], habitat:['el lago cristalino','el río de montaña','la playa rocosa','la cascada','el arrecife','la laguna escondida'], enemigo_amigo:['Tentacool','Staryu','Goldeen','Magikarp','Psyduck','Shellder'], ataque:['Pistola Agua','Retirada','Rayo Burbuja','Hidropulso'] },
  pikachu:     { nombre:'PIKACHU',    tipo:'eléctrico',recurso:['voltios','chispas eléctricas','rayos','descargas','cargas de mejillas','relámpagos','pulsos eléctricos'], alimento:['bayas eléctricas','frutas cargadas','ketchup especial','raíces energéticas'], habitat:['el bosque eléctrico','la pradera de tormenta','la planta eléctrica','el cerro con rayos'], enemigo_amigo:['Rattata','Pidgey','Ekans','Jigglypuff','Meowth','Sandshrew'], ataque:['Impactrueno','Rayo','Trueno','Ataque Rápido','Cola Férrea'] },
  eevee:       { nombre:'EEVEE',      tipo:'normal',  recurso:['destellos de adaptación','cargas misteriosas','brotes de cambio','polvos de transformación'], alimento:['bayas variadas','leche fresca','pan de entrenador','frutas del bosque'], habitat:['la ciudad de Kanto','el jardín del entrenador','el parque natural','el campo abierto'], enemigo_amigo:['Rattata','Meowth','Jigglypuff','Clefairy','Chansey'], ataque:['Golpe Rápido','Gruñido','Ojitos Tiernos','Finta','Mordisco'] },
  cyndaquil:   { nombre:'CYNDAQUIL',  tipo:'fuego',   recurso:['llamas de espalda','ráfagas de rueda','chispas ígneas','bolas giratorias de fuego','cargas térmicas'], alimento:['bayas tostadas','semillas calientes','frutos del volcán','raíces secas'], habitat:['la pradera con chispas','la colina soleada','la madriguera cálida','la estepa árida','el campo seco'], enemigo_amigo:['Sentret','Hoothoot','Mareep','Spinarak','Ledyba','Hoppip'], ataque:['Rueda Fuego','Agilidad','Estallido','Ascuas','Colmillo Ígneo'] },
  totodile:    { nombre:'TOTODILE',   tipo:'agua',    recurso:['mordiscos de energía','oleadas de fuerza','ráfagas de agua','pulsos acuáticos','dentelladas'], alimento:['peces de río','crustáceos','ramas de árbol','bayas de río','algas de lago'], habitat:['el río torrencial','el delta pantanoso','la costa rocosa','el lago turbio','la cueva de estalactitas'], enemigo_amigo:['Marill','Quagsire','Poliwag','Slowpoke','Wooper'], ataque:['Morder','Giro Rápido','Pistola Agua','Triturar','Acua Cola'] },
  chikorita:   { nombre:'CHIKORITA',  tipo:'planta',  recurso:['hojas de aroma','pétalos curativos','látigos de cepa','brotes de energía','esporas dulces'], alimento:['bayas frescas','hojas tiernas','néctar floral','hierba suave','frutas de árbol'], habitat:['la pradera serena','el campo de flores','la colina soleada','el jardín de niebla','el valle tranquilo'], enemigo_amigo:['Caterpie','Sunkern','Bellsprout','Hoppip','Snubbull'], ataque:['Látigo Cepa','Hoja Mágica','Reflejo','Somníboro','Danza Pétalo'] },
  treecko:     { nombre:'TREECKO',    tipo:'planta',  recurso:['energía absorbida','hojas de chakra','raíces de poder','savia vital','brotes de fuerza'], alimento:['insectos de árbol','bayas altas','savia de árbol','hojas tiernas','frutas de copa'], habitat:['la copa del árbol gigante','la selva de Hoenn','el bosque de musgo','la enramada alta','el árbol milenario'], enemigo_amigo:['Wurmple','Zigzagoon','Poochyena','Taillow','Shroomish'], ataque:['Absorber','Golpe Rápido','Hoja Aguda','Latigazo','Pantalla'] },
  torchic:     { nombre:'TORCHIC',    tipo:'fuego',   recurso:['llamas internas','ráfagas de nitro','cargas de calor','bolitas ígneas','destellos candentes'], alimento:['semillas tostadas','bayas de calor','insectos pequeños','gusanos de tierra','granos secos'], habitat:['la sabana cálida','el pastizal árido','el rancho de Hoenn','el campo seco','la pradera dorada'], enemigo_amigo:['Wurmple','Zigzagoon','Poochyena','Wingull','Taillow'], ataque:['Nitrocarga','Picotazo','Ascuas','Doble Patada','Triturar'] },
  mudkip:      { nombre:'MUDKIP',     tipo:'agua',    recurso:['bofetones de lodo','disparos de lodo','pulsos de agua-tierra','oleadas de barro','chorros pantanosos'], alimento:['peces de río','insectos acuáticos','algas','larvas','cangrejos de barro'], habitat:['la orilla pantanosa','el río de montaña','el delta lodoso','la cueva acuática','el lago de barro'], enemigo_amigo:['Marill','Poliwag','Barboach','Goldeen','Surskit'], ataque:['Bofetón Lodo','Pistola Agua','Disparo Lodo','Terremoto débil','Giro Rápido'] },
}

const RIVALES = [
  { nombre:'Gary Oak', descripcion:'el rival arrogante de Pallet Town', pokemon:'Blastoise' },
  { nombre:'Silver',   descripcion:'el misterioso entrenador de Johto', pokemon:'Feraligatr' },
  { nombre:'Brendan',  descripcion:'el hijo del líder de gimnasio',     pokemon:'Sceptile' },
  { nombre:'May',      descripcion:'la coordinadora de Hoenn',           pokemon:'Swampert' },
  { nombre:'Wally',    descripcion:'el entrenador con Gardevoir',        pokemon:'Gardevoir' },
  { nombre:'Lyra',     descripcion:'la entrenadora alegre de Johto',     pokemon:'Marill' },
]

const LIDERES = [
  { nombre:'Brock',    tipo:'Roca',     ciudad:'Pewter City',    insignia:'Insignia Roca',      pokemon:'Onix' },
  { nombre:'Misty',    tipo:'Agua',     ciudad:'Cerulean City',  insignia:'Insignia Cascada',   pokemon:'Starmie' },
  { nombre:'Surge',    tipo:'Eléctrico',ciudad:'Vermilion City', insignia:'Insignia Trueno',    pokemon:'Raichu' },
  { nombre:'Erika',    tipo:'Planta',   ciudad:'Celadon City',   insignia:'Insignia Arco Iris', pokemon:'Vileplume' },
  { nombre:'Falkner',  tipo:'Volador',  ciudad:'Violet City',    insignia:'Insignia Zephyr',    pokemon:'Pidgeot' },
  { nombre:'Whitney',  tipo:'Normal',   ciudad:'Goldenrod City', insignia:'Insignia Llanura',   pokemon:'Miltank' },
  { nombre:'Roxanne',  tipo:'Roca',     ciudad:'Rustboro City',  insignia:'Insignia Piedra',    pokemon:'Nosepass' },
  { nombre:'Brawly',   tipo:'Lucha',    ciudad:'Dewford Town',   insignia:'Insignia Nudillo',   pokemon:'Hariyama' },
  { nombre:'Watson',   tipo:'Eléctrico',ciudad:'Mauville City',  insignia:'Insignia Dínamo',    pokemon:'Manectric' },
  { nombre:'Flannery', tipo:'Fuego',    ciudad:'Lavaridge Town', insignia:'Insignia Calor',     pokemon:'Torkoal' },
  { nombre:'Norman',   tipo:'Normal',   ciudad:'Petalburg City', insignia:'Insignia Equilibrio',pokemon:'Vigoroth' },
]

const OBJETOS = ['Pociones','Poké Balls','Super Balls','Revivires','Antídotos','Bayas Melón','Bayas Pecha','Éteres','Elixires','Escapadas de humo','Repeles','Escudos especiales','Cargas de batalla','Fragmentos de energía','Cristales de fuerza']
const LUGARES = [
  'la Ruta 1 de Kanto','el Bosque de Viridian','la Cueva Roca','el Cabo Añil','la Torre de Lavender Town',
  'el Safari de Fuchsia','la Ruta 34 de Johto','el Lago de la Ira','el Camino Unión','la Cueva de Cristal',
  'el Bosque Esmeralda de Hoenn','la Cueva de la Victoria','el Monte Pira','las Ruinas Alph',
  'el Mar del Sur de Hoenn','la Ruta 110 con la pista de bicicletas','el Desierto de Hoenn',
  'la Isla del Fuego','el Monte Corona','la Torre de Batalla',
  'el Gran Pantano','la Ruta Submarina','el Pico Blanco','la Ciudad Plateada',
]
const SITUACIONES = [
  'justo cuando el sol comenzaba a ponerse','en medio de una tormenta eléctrica',
  'mientras la lluvia caía sobre el campo','al amanecer, con la niebla cubriendo el suelo',
  'en el último turno de la batalla','cuando parecía que todo estaba perdido',
  'luchando para proteger a su entrenador','después de una larga jornada de viaje',
  'frente a otros entrenadores que miraban','concentrado con todas sus fuerzas',
  'usando toda la energía que le quedaba','recordando el entrenamiento de toda la semana',
]

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function getLore(k) { return LORE[String(k||'').toLowerCase()] || LORE.pikachu }
function getRival() { return pick(RIVALES) }
function getLider() { return pick(LIDERES) }
function getObjeto() { return pick(OBJETOS) }
function getLugar() { return pick(LUGARES) }
function getSit()   { return pick(SITUACIONES) }

// ─────────────────────────────────────────────────────────────────
// HISTORIAL DE TEXTO — evita repetir el mismo enunciado
// ─────────────────────────────────────────────────────────────────
const _histTexto = []   // guarda las últimas 30 frases usadas
const _histCat   = []   // guarda las últimas 8 categorías usadas

function _yaUsado(texto) {
  return _histTexto.some(t => t === texto)
}
function _guardarTexto(texto) {
  _histTexto.push(texto)
  if (_histTexto.length > 30) _histTexto.shift()
}
function _registrarCat(cat) {
  _histCat.push(cat)
  if (_histCat.length > 8) _histCat.shift()
}
function _catRepetida(cat) {
  if (_histCat.length < 2) return false
  return _histCat.slice(-2).every(x => x === cat)
}

/**
 * Elige un texto del array ts que no haya sido usado recientemente.
 * Si todos están usados, limpia el historial y elige uno aleatorio.
 */
function pickFreshText(ts) {
  const frescos = ts.filter(t => !_yaUsado(t))
  if (frescos.length === 0) {
    // Todos usados → limpiar y elegir al azar
    _histTexto.length = 0
    return pick(ts)
  }
  return pick(frescos)
}

// ─────────────────────────────────────────────────────────────────
// CATEGORÍAS — SUMA (30 templates)
// ─────────────────────────────────────────────────────────────────
function cat_suma(L, poke, enemigo, habil, a, b) {
  const rec  = pick(L.recurso), atk = pick(L.ataque), sit = getSit()
  const enemy = enemigo || pick(L.enemigo_amigo)
  const rival = getRival(), lider = getLider(), lugar = getLugar(), obj = getObjeto()
  const ts = [
    `¡${poke} usó ${habil}! Tenía ${a} ${rec} y el impacto contra ${enemy} le devolvió ${b} más. ¿Cuántas ${rec} tiene ahora?`,
    `${poke} cargó ${a} ${rec} antes de la pelea y generó ${b} más al golpear a ${enemy} con ${habil}. ¿Cuántas ${rec} tiene en total?`,
    `${sit}, ${poke} acumuló ${a} ${rec} del entorno y ${b} del golpe contra ${enemy}. ¿Cuántas ${rec} tiene?`,
    `La batalla con ${enemy} fue larga. ${poke} acertó ${a} golpes antes del descanso y ${b} después. ¿Cuántos golpes acertó en total?`,
    `¡${poke} no paró! Conectó ${a} golpes de ${habil} y ${b} golpes de ${atk}. ¿Cuántos golpes dio en total?`,
    `${poke} venció a ${enemy} y el entrenador le dio ${a} ${obj} más ${b} que encontró en el suelo. ¿Cuántos objetos tiene?`,
    `En ${lugar}, el entrenador encontró ${a} ${obj} y luego ${b} más en los arbustos. ¿Cuántos tiene?`,
    `${poke} exploró ${lugar} y encontró ${a} ${rec} en la cueva y ${b} más cerca del río. ¿Cuántos encontró?`,
    `El entrenador tenía ${a} ${obj} y compró ${b} más en la Pokémart para ${poke}. ¿Cuántos tiene ahora?`,
    `La Enfermera Joy curó a ${poke} con ${a} puntos de vida y luego le aplicó ${b} más. ¿Cuántos puntos recuperó?`,
    `${poke} recibió ${a} ${pick(L.alimento)} antes del entrenamiento y ${b} más como premio. ¿Cuántos comió en total?`,
    `El gimnasio de ${lider.nombre} tenía ${a} entrenadores en la sala principal y ${b} más en el pasillo. ¿Cuántos debe vencer?`,
    `${poke} venció ${a} Pokémon del gimnasio en la primera parte y ${b} más antes del líder. ¿Cuántos venció?`,
    `¡${rival.nombre} apareció! ${poke} bloqueó ${a} ataques del ${rival.pokemon} y contraatacó ${b} veces. ¿Cuántas acciones hizo?`,
    `${poke} está acumulando energía para evolucionar: ganó ${a} puntos hoy y ${b} más entrenando. ¿Cuántos lleva?`,
    `En el Concurso Pokémon, ${poke} obtuvo ${a} puntos de actuación y ${b} de bonificación del público. ¿Cuántos puntos sumó?`,
    `La Zona Safari escondía tesoros: ${poke} encontró ${a} objetos en la primera zona y ${b} en la zona secreta. ¿Cuántos encontraron?`,
    `${poke} entrenó ${habil} ${a} veces en la mañana y ${b} veces más en la tarde. ¿Cuántas veces practicó ${habil}?`,
    `¡Victoria! ${poke} tumbó a ${enemy} ${sit}. Ganó ${a} monedas y tenía ${b} guardadas. ¿Cuántas tiene?`,
    `En la Guardería nacieron ${a} huevos esta mañana y ${b} más al mediodía. ¿Cuántos huevos hay en total?`,
    `El entrenador recorrió ${a} rutas buscando a ${poke} y ${b} más explorando. ¿Cuántas rutas recorrió?`,
    `${poke} hizo ${a} puntos de daño al ${rival.pokemon} de ${rival.nombre} y luego ${b} puntos más. ¿Cuánto daño hizo?`,
    `Para desafiar al Alto Mando, ${poke} venció ${a} Pokémon en las salas y ${b} más al final. ¿Cuántos derrotó?`,
    `${poke} practicó ${a} movimientos de ataque y ${b} de defensa. ¿Cuántos movimientos practicó en total?`,
    `El entrenador tenía ${a} monedas y ganó ${b} más en batallas. ¿Cuántas monedas tiene para comprar objetos?`,
    `${poke} marcó ${a} lugares del mapa al cruzar ${lugar} y ${b} más en la siguiente zona. ¿Cuántos marcó?`,
    `En el Centro Pokémon había ${a} entrenadores esperando y llegaron ${b} más. ¿Cuántos hay en total?`,
    `${poke} conectó ${a} ataques en el primer asalto y ${b} en el segundo. ¿Cuántos ataques lanzó?`,
    `El plan de entrenamiento tiene ${a} ejercicios completados y ${b} pendientes. ¿Cuántos ejercicios tiene en total?`,
    `${poke} encontró ${a} Pokémon amistosos en ${lugar} y ${b} más curiosos se unieron. ¿Cuántos vio?`,
  ]
  return pickFreshText(ts)
}

// ─────────────────────────────────────────────────────────────────
// CATEGORÍAS — RESTA (30 templates)
// ─────────────────────────────────────────────────────────────────
function cat_resta(L, poke, enemigo, habil, a, b) {
  const rec  = pick(L.recurso), atk = pick(L.ataque), sit = getSit()
  const enemy = enemigo || pick(L.enemigo_amigo)
  const rival = getRival(), lider = getLider(), lugar = getLugar(), obj = getObjeto()
  const ali = pick(L.alimento)
  const ts = [
    `${poke} tenía ${a} ${rec} listas para ${habil}. Usó ${b} contra ${enemy}. ¿Cuántas ${rec} le quedan?`,
    `Para ejecutar ${habil}, ${poke} gastó ${b} de sus ${a} ${rec}. ¿Cuántas ${rec} le quedan?`,
    `${enemy} tenía ${a} HP cuando ${poke} usó ${habil} y le quitó ${b} de golpe. ¿Cuántos HP le quedan a ${enemy}?`,
    `${poke} partió con ${a} ${rec} y tuvo que usar ${b} para detener a ${enemy}. ¿Cuántas ${rec} sobrevivieron?`,
    `${sit}, ${poke} tenía ${a} ${rec} y usó ${b} para defender a su entrenador. ¿Cuántas le sobran?`,
    `El entrenador tenía ${a} ${obj} para ${poke}. La Enfermera Joy usó ${b} para curarlo. ¿Cuántos quedan?`,
    `${poke} tenía ${a} ${ali} guardados. Comió ${b} antes de la batalla. ¿Cuántos ${ali} le quedan?`,
    `La mochila tenía ${a} ${obj}. El entrenador usó ${b} en el viaje por ${lugar}. ¿Cuántos quedan?`,
    `Al entrar a ${lugar} el entrenador tenía ${a} Poké Balls. Usó ${b} intentando capturar Pokémon. ¿Cuántas le quedan?`,
    `${poke} venció a ${enemy}, pero la batalla le costó ${b} de sus ${a} ${rec}. ¿Cuántas le quedan?`,
    `El entrenador tenía ${a} monedas y gastó ${b} en la Pokémart. ¿Cuántas monedas le quedan?`,
    `${poke} necesita practicar ${habil} ${a} veces esta semana. Ya practicó ${b} veces. ¿Cuántas le faltan?`,
    `Para evolucionar, ${poke} necesita ${a} batallas más. Hoy solo pudo tener ${b}. ¿Cuántas le faltan?`,
    `El plan de entrenamiento tiene ${a} ejercicios. ${poke} ya completó ${b}. ¿Cuántos ejercicios le quedan?`,
    `El gimnasio de ${lider.nombre} tiene ${a} puzzles. ${poke} ya resolvió ${b}. ¿Cuántos le faltan?`,
    `El equipo de ${lider.nombre} tiene ${a} Pokémon. ${poke} ya derrotó a ${b}. ¿Cuántos quedan?`,
    `${rival.nombre} tenía ${a} ${obj}. Usó ${b} intentando ganar. ¿Cuántos le quedan?`,
    `El entrenador entró al Safari con ${a} bolas especiales. Usó ${b}. ¿Cuántas le quedan?`,
    `${poke} llegó al Centro Pokémon con ${a} HP. Un ataque en sueños le quitó ${b}. ¿Con cuántos amaneció?`,
    `Había ${a} Pokémon esperando ser curados. La Enfermera Joy curó a ${b}. ¿Cuántos faltan?`,
    `La Guardería tenía ${a} Pokémon. El entrenador recogió ${b}. ¿Cuántos siguen en la Guardería?`,
    `El concurso tenía ${a} participantes. Eliminaron a ${b} en la primera ronda. ¿Cuántos quedan para la final?`,
    `Para llegar al campeón, ${poke} necesita vencer ${a} combates. Ya venció ${b}. ¿Cuántos le faltan?`,
    `${poke} llegó al campeón con ${a} HP. El primer ataque le quitó ${b}. ¿Con cuántos HP continúa?`,
    `El entrenador planeó pasar por ${a} ciudades. Ya visitó ${b}. ¿Cuántas ciudades le quedan?`,
    `${poke} anotó ${a} técnicas en su libreta. Ya aprendió ${b}. ¿Cuántas le faltan por aprender?`,
    `Había ${a} ${obj} en el estante de la Pokémart. El entrenador compró ${b}. ¿Cuántos quedan?`,
    `${poke} tenía ${a} ${rec} al entrar al gimnasio. Los combates le costaron ${b}. ¿Cuántas tiene para enfrentar al líder?`,
    `La zona safari tenía ${a} áreas. El entrenador visitó ${b} antes de que cerrara. ¿Cuántas áreas no visitó?`,
    `${poke} tenía ${a} de energía para el viaje. Usó ${b} al cruzar la zona de combates. ¿Cuánta energía le queda?`,
  ]
  return pickFreshText(ts)
}

// ─────────────────────────────────────────────────────────────────
// CATEGORÍAS — MULTIPLICACIÓN (40 templates variados)
// ─────────────────────────────────────────────────────────────────
function cat_multiplicacion(L, poke, enemigo, habil, a, b) {
  const rec  = pick(L.recurso), atk = pick(L.ataque)
  const enemy = enemigo || pick(L.enemigo_amigo)
  const rival = getRival(), lider = getLider(), lugar = getLugar()
  const obj = getObjeto(), ali = pick(L.alimento), sit = getSit()
  const ts = [
    // Batalla y habilidad
    `${poke} usa ${habil} ${a} veces en cada batalla. Si pelea ${b} batallas seguidas en ${lugar}, ¿cuántas veces usó ${habil} en total?`,
    `${poke} conecta exactamente ${a} golpes de ${atk} por turno. Si el combate duró ${b} turnos, ¿cuántos golpes de ${atk} dio en total?`,
    `Cada vez que ${poke} usa ${habil} lanza ${a} ${rec}. Si lo usó ${b} veces en la batalla, ¿cuántas ${rec} lanzó?`,
    `${poke} venció a ${a} grupos de ${enemy} y cada grupo tenía ${b}. ¿Cuántos ${enemy} derrotó en total?`,
    `Para derrotar al equipo de ${rival.nombre}, ${poke} necesitó ${a} ataques por Pokémon. Si el rival tenía ${b} Pokémon, ¿cuántos ataques hizo?`,
    `${poke} repite ${a} movimientos de calentamiento antes de cada batalla. Si hoy tuvo ${b} batallas, ¿cuántos movimientos de calentamiento hizo?`,
    `Cada ataque de ${habil} cuesta ${a} ${rec}. Si ${poke} lo usó ${b} veces, ¿cuántas ${rec} gastó en total?`,
    // Entrenamiento
    `${poke} entrena ${a} días a la semana. Si cada día practica ${b} ataques de ${habil}, ¿cuántos ataques practica en total en la semana?`,
    `${poke} tiene ${a} ataques distintos y practica cada uno ${b} veces por día. ¿Cuántos ataques en total practica cada día?`,
    `El entrenador planifica ${a} sesiones de entrenamiento y en cada sesión ${poke} hace ${b} repeticiones. ¿Cuántas repeticiones hace en total?`,
    `${poke} corre ${a} vueltas cada mañana. Si entrenó ${b} días seguidos, ¿cuántas vueltas corrió en total?`,
    `El plan de entrenamiento tiene ${a} ejercicios por día. Si ${poke} entrenó ${b} días, ¿cuántos ejercicios completó?`,
    // Objetos y mochila
    `El entrenador tiene ${a} mochilas y en cada una guarda ${b} ${obj}. ¿Cuántos ${obj} tiene en total para ${poke}?`,
    `El entrenador compró ${a} bolsas de ${ali} y cada bolsa tiene ${b} porciones. ¿Cuántas porciones tiene para darle a ${poke}?`,
    `En la mochila hay ${a} cajas de ${obj} y cada caja contiene ${b} unidades. ¿Cuántos ${obj} hay en total?`,
    `El entrenador preparó ${a} bolsas con provisiones. Cada bolsa tiene ${b} objetos distintos. ¿Cuántos objetos preparó?`,
    `El equipo tiene ${a} miembros y cada uno lleva ${b} pociones. ¿Cuántas pociones lleva el equipo completo?`,
    // Gimnasio y entrenadores
    `En la ruta hacia el gimnasio hay ${a} grupos de Pokémon salvajes y cada grupo tiene ${b} integrantes. ¿Cuántos Pokémon hay en total?`,
    `Hay ${a} entrenadores esperando desafiar al gimnasio de ${lider.nombre} y cada uno tiene ${b} Pokémon. ¿Cuántos Pokémon hay en total?`,
    `El gimnasio de ${lider.nombre} tiene ${a} pasillos y en cada pasillo hay ${b} entrenadores. ¿Cuántos entrenadores hay en el gimnasio?`,
    `Para ganar la ${lider.insignia}, ${poke} debió vencer ${a} rondas de ${b} Pokémon cada una. ¿Cuántos Pokémon venció?`,
    `Cada entrenador del camino al gimnasio usa ${a} Pokémon. Si hay ${b} entrenadores en total, ¿cuántos Pokémon enfrentó ${poke}?`,
    // Rutas y exploración
    `El entrenador recorre ${a} rutas por semana y en cada ruta encuentra ${b} objetos escondidos. ¿Cuántos objetos encuentra cada semana?`,
    `${lugar} tiene ${a} zonas y en cada zona hay ${b} Pokémon salvajes distintos. ¿Cuántos Pokémon salvajes hay en total?`,
    `El entrenador exploró ${a} cuevas y en cada cueva encontró ${b} objetos valiosos. ¿Cuántos objetos encontró?`,
    `La ruta hasta ${lugar} tiene ${a} bifurcaciones y cada una lleva a ${b} caminos. ¿Cuántos caminos hay en total?`,
    // Concurso y crianza
    `En el Concurso Pokémon hay ${a} categorías y en cada categoría participan ${b} Pokémon. ¿Cuántos Pokémon participan en total?`,
    `La Guardería tuvo ${a} camadas de huevos y cada camada tenía ${b} huevos. ¿Cuántos huevos nacieron en total?`,
    `${poke} participó en ${a} concursos y en cada uno ganó ${b} cintas. ¿Cuántas cintas tiene?`,
    `En la academia de entrenadores hay ${a} clases y cada clase tiene ${b} alumnos. ¿Cuántos alumnos hay en total?`,
    // Alto Mando y épicas
    `Para llegar al campeón, ${poke} venció ${a} miembros del Alto Mando. Cada uno tenía ${b} Pokémon. ¿Cuántos venció en total?`,
    `${rival.nombre} desafió ${a} veces a ${poke} y en cada desafío usó ${b} Pokémon. ¿Cuántos Pokémon usó ${rival.nombre} en total?`,
    `${sit}, ${poke} lanzó ${a} ráfagas de ${habil} y cada ráfaga tenía ${b} impactos. ¿Cuántos impactos hizo en total?`,
    `El equipo del Alto Mando tiene ${a} entrenadores y cada uno tiene ${b} Pokémon legendarios. ¿Cuántos legendarios hay?`,
    // Pokémon salvajes y Safari
    `En el Safari, el entrenador vio ${a} manadas de Pokémon y cada manada tenía ${b} integrantes. ¿Cuántos Pokémon vio?`,
    `${poke} debilitó ${a} Pokémon salvajes por hora. En ${b} horas de exploración, ¿cuántos debilitó?`,
    // XP y puntos
    `Cada victoria le da a ${poke} ${a} puntos de experiencia. Si ganó ${b} batallas seguidas, ¿cuántos puntos ganó?`,
    `${poke} gana ${a} monedas por cada Pokémon derrotado. Si derrotó ${b} hoy, ¿cuántas monedas ganó?`,
    `El entrenador recibe ${a} puntos de fama por cada insignia ganada. Si ganó ${b} insignias, ¿cuántos puntos tiene?`,
    `${poke} realiza ${a} movimientos de esquiva por ronda. En ${b} rondas de batalla, ¿cuántos movimientos de esquiva hizo?`,
  ]
  return pickFreshText(ts)
}

// ─────────────────────────────────────────────────────────────────
// CATEGORÍAS — DIVISIÓN (30 templates)
// ─────────────────────────────────────────────────────────────────
function cat_division(L, poke, enemigo, habil, a, b) {
  const rec  = pick(L.recurso)
  const rival = getRival(), lider = getLider(), lugar = getLugar()
  const obj = getObjeto(), ali = pick(L.alimento)
  const ts = [
    `${poke} tiene ${a} ${ali} para repartir de forma igual entre ${b} amigos Pokémon. ¿Cuántos ${ali} le toca a cada uno?`,
    `El entrenador recogió ${a} ${obj} en ${lugar} y los quiere guardar en ${b} mochilas iguales. ¿Cuántos van en cada mochila?`,
    `Hay ${a} Pokémon para repartir entre ${b} entrenadores de forma equitativa. ¿Cuántos Pokémon le tocan a cada uno?`,
    `El equipo de ${poke} tiene ${a} pociones para compartir entre ${b} integrantes por igual. ¿Cuántas pociones recibe cada uno?`,
    `En la Guardería nacieron ${a} huevos y hay ${b} entrenadores para cuidarlos por igual. ¿Cuántos cuida cada uno?`,
    `El entrenador tiene ${a} monedas y quiere gastarlas en ${b} días iguales. ¿Cuántas puede gastar cada día?`,
    `${poke} necesita ${a} ${rec} para una técnica especial y quiere conseguirlas en ${b} días iguales. ¿Cuántas por día?`,
    `Hay ${a} bayas para el equipo y son ${b} Pokémon. Si se reparte igual, ¿cuántas bayas recibe cada uno?`,
    `El entrenador caminó ${a} pasos en ${lugar} divididos en ${b} etapas iguales. ¿Cuántos pasos duró cada etapa?`,
    `${a} entrenadores del gimnasio de ${lider.nombre} se dividen en ${b} grupos iguales. ¿Cuántos hay en cada grupo?`,
    `El Alto Mando repartió ${a} Pokémon legendarios entre ${b} guardianes por igual. ¿Cuántos tiene cada guardián?`,
    `${rival.nombre} dividió su colección de ${a} objetos entre ${b} amigos por igual. ¿Cuántos objetos recibió cada uno?`,
    `El concurso tiene ${a} Pokémon participantes organizados en ${b} grupos iguales. ¿Cuántos hay en cada grupo?`,
    `${a} ${obj} se reparten entre ${b} entrenadores aliados por igual. ¿Cuántos recibe cada entrenador?`,
    `${poke} ganó ${a} puntos de experiencia y los repartió igual entre sus ${b} ataques. ¿Cuántos puntos por ataque?`,
    `El equipo recolectó ${a} ${ali} en ${lugar} y los divide igual entre ${b} Pokémon. ¿Cuántos corresponden a cada uno?`,
    `${a} Poké Balls están guardadas en ${b} cajas iguales. ¿Cuántas hay en cada caja?`,
    `Para el torneo, ${a} Pokémon se dividieron en ${b} equipos iguales. ¿Cuántos Pokémon tiene cada equipo?`,
    `El entrenador tiene ${a} fichas de batalla y quiere usarlas en ${b} días por igual. ¿Cuántas fichas puede usar cada día?`,
    `${poke} realizó ${a} ataques a lo largo de ${b} rondas iguales. ¿Cuántos ataques hizo por ronda?`,
    `La academia de entrenadores tiene ${a} alumnos y los divide en ${b} clases iguales. ¿Cuántos alumnos hay por clase?`,
    `El mapa de ${lugar} tiene ${a} zonas divididas en ${b} secciones iguales para explorar. ¿Cuántas zonas hay por sección?`,
    `${a} fragmentos de energía se reparten entre ${b} Pokémon del equipo por igual. ¿Cuántos recibe cada Pokémon?`,
    `El entrenador tiene ${a} ${ali} y los quiere repartir en ${b} bolsas iguales. ¿Cuántos van en cada bolsa?`,
    `Para el viaje, ${a} objetos de cura se dividen entre ${b} entrenadores por igual. ¿Cuántos tiene cada uno?`,
    `${poke} debe repartir ${a} ${rec} en ${b} ataques especiales de forma equitativa. ¿Cuántas ${rec} usa por ataque?`,
    `El Área de Batalla tiene ${a} desafíos divididos en ${b} etapas iguales. ¿Cuántos desafíos hay por etapa?`,
    `${a} medallas de victoria se distribuyeron entre ${b} entrenadores del torneo por igual. ¿Cuántas recibió cada uno?`,
    `El Safari tiene ${a} Pokémon en ${b} zonas iguales. ¿Cuántos Pokémon hay en cada zona?`,
    `${a} puntos de XP se distribuyen igual entre ${b} Pokémon que participaron en la batalla. ¿Cuántos puntos recibe cada uno?`,
  ]
  return pickFreshText(ts)
}

// ─────────────────────────────────────────────────────────────────
// POOL DE CATEGORÍAS CON PESOS
// ─────────────────────────────────────────────────────────────────
const POOL = [
  { id:'suma',          fn: (L,p,e,h,a,b)=>cat_suma(L,p,e,h,a,b),          peso:{1:22,2:20,3:15,4:8},  ops:['suma'] },
  { id:'resta',         fn: (L,p,e,h,a,b)=>cat_resta(L,p,e,h,a,b),         peso:{1:20,2:18,3:15,4:8},  ops:['resta'] },
  { id:'multiplicacion',fn: (L,p,e,h,a,b)=>cat_multiplicacion(L,p,e,h,a,b),peso:{3:20,4:25},            ops:['multiplicacion'] },
  { id:'division',      fn: (L,p,e,h,a,b)=>cat_division(L,p,e,h,a,b),      peso:{3:15,4:20},            ops:['division'] },
]

function _elegirCat(op, curso) {
  const cands = POOL.filter(c => c.ops.includes(op) && c.peso[curso] > 0)
  let intentos = 0
  while (intentos < 12) {
    const total = cands.reduce((s,c)=>s+c.peso[curso],0)
    let r = Math.random()*total
    for (const c of cands) {
      r -= c.peso[curso]
      if (r <= 0) {
        if (!_catRepetida(c.id)) return c
        break
      }
    }
    intentos++
  }
  return cands.find(c=>!_catRepetida(c.id)) || cands[0]
}

// ─────────────────────────────────────────────────────────────────
// FUNCIÓN PRINCIPAL
// ─────────────────────────────────────────────────────────────────
function generarPreguntaPokemon(cfg) {
  const L      = getLore(cfg.pokemon)
  const poke   = L.nombre
  const curso  = cfg.curso   || 2
  const op     = cfg.operacion || 'suma'
  const a      = cfg.a
  const b      = cfg.b
  const enemigo = cfg.enemigo     || pick(L.enemigo_amigo)
  const habil   = cfg.habilidad   || pick(L.ataque)

  const cat = _elegirCat(op, curso)
  _registrarCat(cat.id)

  const texto = cat.fn(L, poke, enemigo, habil, a, b)
  _guardarTexto(texto)

  let respuesta
  if (op === 'suma')          respuesta = a + b
  else if (op === 'resta')    respuesta = a - b
  else if (op === 'multiplicacion') respuesta = a * b
  else if (op === 'division') respuesta = a / b

  let hint
  if (op === 'suma')          hint = `${a} + ${b} = ${respuesta}`
  else if (op === 'resta')    hint = `${a} - ${b} = ${respuesta}`
  else if (op === 'multiplicacion') hint = `${a} × ${b} = ${respuesta}`
  else if (op === 'division') hint = `${a} ÷ ${b} = ${respuesta}`

  return { texto, respuesta, hint, categoria: cat.id }
}

if (typeof window !== 'undefined') window.generarPreguntaPokemon = generarPreguntaPokemon
if (typeof module !== 'undefined') module.exports = { generarPreguntaPokemon }
