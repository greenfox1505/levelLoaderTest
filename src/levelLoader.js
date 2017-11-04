var THREE = require("three")
var CANNON = require("cannon")


module.exports = function (interfaces, rawLevel) {
    var scene = new THREE.Scene();

    var player = {};
    if (rawLevel.player) {
        player = JSON.parse(JSON.stringify(rawLevel.player))
    }
    var renderer = interfaces.renderer;
    if (rawLevel.world.background) { renderer = renderer.setClearColor(rawLevel.world.background, 1); }



    var level = { //fully loaded level
        MatBuilder: require("./MatBuilder.js"),
        mats: {},
        GeoBuilder: require("./GeoBuilder.js"),
        geos: {},
        ObjBuilder: require("./ObjBuilder.js"),
        objs: {},
        renderWorld: scene,
        phyWorld: new CANNON.World(),
        player: player,
    }
    level.phyWorld.gravity.set(rawLevel.world.grav[0], rawLevel.world.grav[1], rawLevel.world.grav[2]); // m/s²
    
    for (var geoName in rawLevel.geos) {
        level.GeoBuilder(geoName, rawLevel.geos[geoName])
    }

    for (var matName in rawLevel.mats) {
        level.MatBuilder(matName, rawLevel.mats[matName])
    }

    //level.createObject = function


    for (var objName in rawLevel.objs) {
        try {
            level.ObjBuilder(objName,rawLevel.objs[objName])
        } catch (e) {
            console.error("Error Loading Object(" + objName + ")!");

            throw ("Error Loading " + objName, e);

        }

    }

    level.physicsTick = function (time) {
        //copy physics data to world data
        level.phyWorld.step(1 / 60);

        for (var i in level.objs) {
            var obj = level.objs[i];
            obj.position.x = obj.phys.position.x
            obj.position.y = obj.phys.position.y
            obj.position.z = obj.phys.position.z
            obj.quaternion.w = obj.phys.quaternion.w
            obj.quaternion.x = obj.phys.quaternion.x
            obj.quaternion.y = obj.phys.quaternion.y
            obj.quaternion.z = obj.phys.quaternion.z
        }
    }


    console.log(level);
    return level;
}