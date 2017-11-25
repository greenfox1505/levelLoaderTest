//a pure-data level. to be processed later!
var s = 1;

var opacity = 0.5

var platSize = 25
var level = {
    name: "Shiny Ball!",
    world: {
        grav: [0, -10, 0],
        background: 0x0,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s, s, s],
        ball: ["sphere", 1, 64, 32],
        hqBall: ["sphere", 1, 256,128],
        floorGeo: ["cube", platSize, 1, platSize],
        wallGeo: ["cube", 1, 3, platSize],
        cylinder: ["cylinder", .5, 0.25, 1, 32],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], { mass: 0, fric: 0.9, res: 0.1 }],
        wallColor: [["pbr", { normalMap: "assets/cush/normal.png" }], { mass: 0, fric: 0.9, res: 0.1 }],
        blue: [["pbr", {
            color: 0x0000ff,
            normalMap: "assets/Asphalt_New/Asphalt_New_Nor.jpg",
            metalness: 0.5,
            roughness: 0.25,
            castShadow: false,
            transparent: true, opacity: opacity
        }], { mass: 10, fric: 0.9, res: 0.1 }],
        rust: [["pbr", {
            map: "assets/rustyIron/basecolor.png",
            normalMap: "assets/rustyIron/normal.png",
            roughnessMap: "assets/rustyIron/roughness.png",
            metalnessMap: "assets/rustyIron/metallic.png",
            // metalness:100000,
            castShadow: true,
            envMap: true
        }], { mass: 10, fric: 0.9, res: 0.1 }],
        copper: [["pbr", {
            map: "copperRock/copper-rock1-alb.png",
            normalMap: "copperRock/copper-rock1-normal.png",
            roughnessMap: "copperRock/copper-rock1-rough.png",
            metalnessMap: "copperRock/copper-rock1-metal.png",
            displacementMap:"copperRock/copper-rock1-height.png",
            castShadow: true,
            envMap: true
        }], { mass: 10, fric: 0.9, res: 0.1 }],
        red: [["pbr", {
            color: 0xff0000,
            normalMap: "https://80lv-cdn.akamaized.net/80.lv/uploads/2017/05/Ice_Substance_BaseNormal.jpg",
            metalness: 0.5,
            roughness: 0.25,
            castShadow: false,
            transparent: true, opacity: opacity
        }], { mass: 10, fric: 0.9, res: 0.1 }],
        green: [["pbr", {
            color: 0x00ff00,
            normalMap: "https://i.imgur.com/kqWpifZ.jpg",
            metalness: 0.5,
            roughness: 0.25,
            castShadow: false,
            transparent: true, opacity: opacity
        }], { mass: 10, fric: 0.9, res: 0.1 }],
    },
    objs: {//todo add all kinds of new properties, 
        door: [[
            ["cubeGeo", "wallColor", [1, 0, 0]],
            ["cubeGeo", "wallColor", [1, 1, 0]],
            ["cubeGeo", "wallColor", [1, 2, 0]],
            ["cubeGeo", "wallColor", [0, 2, 0]],
            ["cubeGeo", "wallColor", [-1, 2, 0]],
            ["cubeGeo", "wallColor", [-1, 1, 0]],
            ["cubeGeo", "wallColor", [-1, 0, 0]],
        ], "floorColor", [0, 1, 5], [0, 0, 0]],
        floor: ["floorGeo", "floorColor", [0, 0, 0], [0, 0, 0]],
        wall0: ["wallGeo", "floorColor", [platSize / 2, 1.5, 0], [0, 0, 0]],
        wall1: ["wallGeo", "floorColor", [-platSize / 2, 1.5, 0], [0, 0, 0]],
        wall2: ["wallGeo", "floorColor", [0, 1.5, platSize / 2], [0, 1 / 4, 0]],
        wall3: ["wallGeo", "floorColor", [0, 1.5, -platSize / 2], [0, 1 / 4, 0]],

        rustBall: ["ball", "rust", [2, 2, -5], [0, 0, 0]],
        copperBall: ["hqBall", "copper", [5, 2, -5], [0, 0, 0]],
        
    },
    lights: {
        amb: ["amb", { color: 0xffffff, brightness: 0.75 }],
        overhead: ["point", { color: 0xFFFFFF, pos: [0, 10, 0], shadow: true, brightness: 0.5 }],
        point0: ["point", { color: 0xFFFFFF, pos: [-10, 5, -10], brightness: 0.25 }],
        point1: ["point", { color: 0xFFFFFF, pos: [10, 5, -10], brightness: 0.25 }],
        point2: ["point", { color: 0xFFFFFF, pos: [10, 5, 10], brightness: 0.25 }],
        point3: ["point", { color: 0xFFFFFF, pos: [-10, 5, 10], brightness: 0.25 }],
    },
    player: {
        starting: { pos: [2, 5, 2], lookAt: [7, 2, 7] },
        type: "FPS"
    },
    triggers: {
        postLoad: function () {
        },
        onFrame: function (t) {
            this.mats.rust.render.envCamera.position.copy(this.objs.rustBall.position)
            this.mats.rust.render.envCamera.update(this.interfaces.renderer, this.renderWorld);

            //console.log("Called onFrame",this)
        }
    }
}

/**
 *         box1: ["cubeGeo", "blue", [0, 1, 0], [0, 0, 0]],
box2: ["cubeGeo", "red", [.6, 2, 0], [0, 0, 0]],
box3: ["cubeGeo", "green", [0, 3, 0], [0, 0, 0]],
 */
var n = 10;
var space = 4;
for (var i = 0; i < (n * n); i++) {
    var x = (((i / n) | 0) - ((n / 2) | 0)) * space
    var z = ((i % n) - ((n / 2) | 0)) * space
    var mats = ["red", "green", "blue"]
    level.objs["box" + i] = ["cubeGeo", mats[(i + ((i / 3) | 0)) % 3], [x, 1, z], [0, 0, 0]]
}

// platform = [[], "wallColor", [-5, 0, -5], [0, 0, 0]]
// platform2 = [[], "wallColor", [1, 0, -5], [0, 0, 0]]
// platform2[0] = platform[0]
// var n = 25
// for (var i = 0; i < (n * n); i++) {
//     x = (i / n) | 0
//     z = (i % n)
//     var element = ["cubeGeo", "wallColor", [x - ((n / 2) | 0), 0, z - ((n / 2) | 0)]]
//     platform[0].push(element);
// }

// level.objs.platform = platform;
// //level.objs.platform2= platform2;

GameEngine.Game(level)