// audio_injector.js
// Integraci\u00f3n completa del sistema de audio con el juego

// 1. Ocultar el bot\u00f3n global de inicio del document click si existe,
// porque ahora usamos la pantalla de carga explicita.
document.addEventListener('click', () => {
    if (window.audio && !window.audio.isUnlocked) {
        // En caso de que se haya saltado la pantalla
        window.audio.unlockAudio();
    }
}, { once: true });

// ==========================================
// ESTADO CHILL EN MEN\u00daS Y TRANSICIONES
// ==========================================

// Hooks de selecci\u00f3n
if (typeof setTrainer !== 'undefined') {
    const old_setTrainer = setTrainer;
    setTrainer = function() {
        old_setTrainer.apply(this, arguments);
        if (window.audio) window.audio.setMood('chill');
    };
}

if (typeof showStarters !== 'undefined') {
    const old_showStarters = showStarters;
    showStarters = function() {
        old_showStarters.apply(this, arguments);
        if (window.audio) window.audio.setMood('chill');
    };
}

// ==========================================
// BATALLAS Y OPERACIONES MATEM\u00c1TICAS (EPIC)
// ==========================================

if (typeof cambiarEscenario !== 'undefined') {
    const old_cambiarEscenario = cambiarEscenario;
    cambiarEscenario = function() {
        old_cambiarEscenario.apply(this, arguments);
        if (window.audio) {
            if (typeof esAltoMandoBatalla !== 'undefined' && esAltoMandoBatalla()) {
                window.audio.playBattleMusic('elite_four');
            } else if (typeof nivel !== 'undefined' && (nivel % 5 === 0)) {
                window.audio.playBattleMusic('gym');
            } else {
                window.audio.playBattleMusic('trainer');
            }
            // Comienza la batalla, todav\u00eda no hay operaci\u00f3n as\u00ed que chill temporal o directamente epic
            window.audio.setMood('chill');
        }
    };
}

if (typeof showGymLeader !== 'undefined') {
    const old_showGymLeader = showGymLeader;
    showGymLeader = function() {
        old_showGymLeader.apply(this, arguments);
        if (window.audio) {
            if (typeof esAltoMandoBatalla !== 'undefined' && esAltoMandoBatalla()) {
                window.audio.playBattleMusic('elite_four');
            } else if (typeof nivel !== 'undefined' && (nivel % 5 === 0)) {
                window.audio.playBattleMusic('gym');
            } else {
                window.audio.playBattleMusic('trainer');
            }
            window.audio.setMood('chill');
        }
    };
}

if (typeof mostrarPregunta !== 'undefined') {
    const old_mostrarPregunta = mostrarPregunta;
    mostrarPregunta = function() {
        old_mostrarPregunta.apply(this, arguments);
        // Cuando aparece operaci\u00f3n -> EPIC (aumenta tensi\u00f3n)
        if (window.audio) window.audio.setMood('epic');
    };
}

// ==========================================
// MINIJUEGOS (EPIC)
// ==========================================

if (typeof abrirMinijuegoBase !== 'undefined') {
    const old_abrirMinijuegoBase = abrirMinijuegoBase;
    abrirMinijuegoBase = function(kind, diff, ctx, onDone) {
        old_abrirMinijuegoBase.call(this, kind, diff, ctx, onDone);
    };
}

if (typeof terminarCalidad !== 'undefined') {
    const old_terminarCalidad = terminarCalidad;
    terminarCalidad = function(q) {
        old_terminarCalidad.apply(this, arguments);
        if (window.audio) window.audio.setMood('chill');
    };
}

// ==========================================
// HABILIDADES Y ANIMACIONES
// ==========================================

window.isSkillAttack = false;

if (typeof ejecutarHabilidadMult !== 'undefined') {
    const old_ejecutarHabilidadMult = ejecutarHabilidadMult;
    ejecutarHabilidadMult = function(calidad) {
        window.isSkillAttack = true;
        old_ejecutarHabilidadMult.apply(this, arguments);
    };
}

if (typeof animarAtaqueAliado !== 'undefined') {
    const old_animarAtaqueAliado = animarAtaqueAliado;
    animarAtaqueAliado = function(power) {
        old_animarAtaqueAliado.apply(this, arguments);
        if (window.audio && !window.isSkillAttack) {
            window.audio.playHit();
        }
        // Limpiamos el flag despues de procesar
        window.isSkillAttack = false;
    };
}

if (typeof crearAnimacionAtaqueEnemigo !== 'undefined') {
    const old_crearAnimacionAtaqueEnemigo = crearAnimacionAtaqueEnemigo;
    crearAnimacionAtaqueEnemigo = function(power) {
        old_crearAnimacionAtaqueEnemigo.apply(this, arguments);
        if (window.audio) window.audio.playMiss();
    };
}

// ==========================================
// RACHAS, CRIES, Y VIDA BAJA
// ==========================================

if (typeof resolver !== 'undefined') {
    const old_resolver = resolver;
    resolver = function() {
        old_resolver.apply(this, arguments);
        
        if (window.audio) {
            // Verificar racha
            if (typeof comboAciertos !== 'undefined' && [5, 10, 15, 20].includes(comboAciertos)) {
                const mon = window.audio.getCurrentPokemonName();
                if (mon) window.audio.playCry(mon);
            }
            // Verificar vida baja
            if (typeof playerVida !== 'undefined' && typeof playerMax !== 'undefined') {
                if (playerVida > 0 && playerVida <= playerMax * 0.2) {
                    window.audio.playLowHealthLoop();
                } else {
                    window.audio.stopLowHealthLoop();
                }
            }
        }
    };
}

if (typeof actualizarBarraEnergia !== 'undefined') {
    const old_actualizarBarraEnergia = actualizarBarraEnergia;
    actualizarBarraEnergia = function() {
        const wasFull = typeof habilidadLista !== 'undefined' ? habilidadLista : false;
        old_actualizarBarraEnergia.apply(this, arguments);
        const isFull = typeof habilidadLista !== 'undefined' ? habilidadLista : false;
        if (!wasFull && isFull && window.audio) {
            const mon = window.audio.getCurrentPokemonName();
            if (mon) window.audio.playCry(mon);
        }
    };
}

if (typeof usarPotion !== 'undefined') {
    const old_usarPotion = usarPotion;
    usarPotion = function() {
        old_usarPotion.apply(this, arguments);
        if (window.audio) {
            window.audio.playHeal();
            window.audio.stopLowHealthLoop();
        }
    };
}

// ==========================================
// SECUENCIA DE RECOMPENSA Y VICTORIA/DERROTA
// ==========================================

if (typeof enemyDerrotado !== 'undefined') {
    const old_enemyDerrotado = enemyDerrotado;
    enemyDerrotado = function() {
        if (window.audio) {
            if (typeof window.audio.getEnemyPokemonName === 'function') {
                const mon = window.audio.getEnemyPokemonName();
                if (mon) window.audio.playCry(mon);
            }
            window.audio.playFainted();
        }
        old_enemyDerrotado.apply(this, arguments);
    };
}

if (typeof subirNivel !== 'undefined') {
    const old_subirNivel = subirNivel;
    subirNivel = function() {
        // Pausar toda acci\u00f3n musical
        if (window.audio) {
            window.audio.stopLowHealthLoop();
            window.audio.playVictoryMusic(typeof nivel !== 'undefined' && nivel % 5 === 0 ? 'gym' : 'trainer');
        }
        
        // Ejecutamos la l\u00f3gica original
        old_subirNivel.apply(this, arguments);

        // Si hab\u00eda una poci\u00f3n en pendingPostNivelLoot, la retrasamos para que no suene de inmediato.
        // Asumiendo que el juego llama a actualizarMochila de inmediato, pero el mensajefinal sale de golpe.
        if (typeof pendingPostNivelLoot !== 'undefined' && pendingPostNivelLoot) {
            setTimeout(() => {
                if (window.audio) window.audio.playItemReceived();
            }, 3000); // 3 segundos despu\u00e9s, mientras lee la victoria
        }
    };
}

// Evitar muerte s\u00fabita (GameOver)
// El juego chequea playerVida <= 0 en resolver.
if (typeof aplicarPenalizacionFallo !== 'undefined') {
    const old_aplicarPenalizacionFallo = aplicarPenalizacionFallo;
    aplicarPenalizacionFallo = function() {
        old_aplicarPenalizacionFallo.apply(this, arguments);
        if (typeof playerVida !== 'undefined') {
            if (playerVida <= 0 && window.audio) {
                window.audio.stopLowHealthLoop();
                window.audio.playFainted();
                setTimeout(() => {
                    window.audio.playGameOverMusic();
                }, 1000);
            } else if (playerVida > 0 && playerVida <= playerMax * 0.2 && window.audio) {
                window.audio.playLowHealthLoop();
            }
        }
    };
}

// ==========================================
// EVOLUCIONES
// ==========================================

if (typeof animarEvolucion !== 'undefined') {
    const old_animarEvolucion = animarEvolucion;
    animarEvolucion = function(nuevoSprite, callback) {
        if (window.audio) {
            const mon = window.audio.getCurrentPokemonName();
            if (mon) window.audio.playCry(mon); // Antes de evolucionar
            
            setTimeout(() => {
                window.audio.playEvolution();
            }, 1000);
        }
        
        // Envolvemos callback para el cry posterior a la evoluci\u00f3n
        const hookedCallback = function() {
            if (window.audio) {
                window.audio.playLevelUp();
                setTimeout(() => {
                    const newMon = window.audio.getCurrentPokemonName();
                    if (newMon) window.audio.playCry(newMon);
                }, 1000);
            }
            if (callback) callback.apply(this, arguments);
        };
        
        old_animarEvolucion.call(this, nuevoSprite, hookedCallback);
    };
}
