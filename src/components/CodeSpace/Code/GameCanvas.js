import React, { useLayoutEffect, useEffect, useRef } from "react";

import { makeLander } from "utils/lander/lander.js";
import { makeStarfield } from "utils/starfield.js";
import { makeTerrain } from "utils/terrain.js";
import { showStatsAndResetControl } from "utils/stats.js";
//import { manageInstructions } from "utils/instructions.js";
//import { makeAudioManager } from "utils/helpers/audio.js";
import { makeChallengeManager } from "utils/challenge.js";
import { makeSeededRandom } from "utils/helpers/seededrandom.js";
import { makeBonusPointsManager } from "utils/bonuspoints.js";
import { makeTheme } from "utils/theme.js";
import { makeInitState } from "utils/makeInitstate";
//import rocketImg from "assets/images/rocket.png";

export default function GameCanvas({ language, code, problem, endAnimation, setScore }){
    const canvasRef = useRef(null);
    const img = new Image();
    //img.src = rocketImg;
    let score;

    useLayoutEffect(() => {
        const scale = window.devicePixelRatio;
        const canvasElement = canvasRef.current;
        const CTX = canvasElement.getContext('2d');

        const { width, height } = canvasElement.getBoundingClientRect();
        const initState = makeInitState(problem, [height, width]);

        canvasElement.width = Math.floor(width * scale);
        canvasElement.height = Math.floor(height * scale);
        
        const scaleFactor = scale;
        CTX.scale(scale, scale);

        //const audioManager = makeAudioManager();

        const challengeManager = makeChallengeManager();
        const seededRandom = makeSeededRandom();

        const appState = new Map()
            .set("CTX", CTX)
            .set("canvasWidth", width)
            .set("canvasHeight", height)
            .set("canvasElement", canvasElement)
            .set("scaleFactor", scaleFactor)
            //.set("audioManager", audioManager)
            .set("challengeManager", challengeManager)
            .set("seededRandom", seededRandom);

        const theme = makeTheme(appState);
        appState.set("theme", theme);

        const terrain = makeTerrain(appState);
        appState.set("terrain", terrain);

        const bonusPointsManager = makeBonusPointsManager(appState);
        appState.set("bonusPointsManager", bonusPointsManager);

        const stars = makeStarfield(appState);
        appState.set("stars", stars);
        const lander = makeLander(appState, [initState[1], initState[2]], endAnimation);

        challengeManager.populateCornerInfo();
        //terrain.setShowLandingSurfaces();

        canvasRef.current.scrollIntoView({  
            behavior: 'smooth',
            block: 'start'
        });

        const logs = [initState[0]]
        const runGame = async () => {
            const landingEffect = await lander.runSimulation(language, code, logs);
            if (landingEffect) {
                score = lander.draw(logs, landingEffect);
                setScore(score);
            };
        };

        runGame();

    }, [])

    return <canvas ref={ canvasRef } style={{width: "90%", minWidth: "25rem", minHeight: "15rem", marginBottom: "1rem"}}></canvas>
}