const cubes = document.querySelectorAll(".value-cube");

const leftPan = document.getElementById("leftPan");
const rightPan = document.getElementById("rightPan");
const valueArea = document.querySelector(".value-area");
const beam = document.querySelector(".scale-beam");

let draggedCube = null;


/* =========================
   DRAGGING
   ========================= */

function setupCube(cube) {

    cube.addEventListener("dragstart", () => {
        draggedCube = cube;
        cube.style.opacity = "0.5";
    });

    cube.addEventListener("dragend", () => {
        cube.style.opacity = "1";
        draggedCube = null;

        leftPan.classList.remove("drag-over");
        rightPan.classList.remove("drag-over");
        valueArea.classList.remove("drag-over");

        updateScale();
    });
}


/* Set up all cubes */

cubes.forEach(cube => {
    setupCube(cube);
});


/* =========================
   DROP ZONES
   ========================= */

const dropZones = [leftPan, rightPan, valueArea];


dropZones.forEach(zone => {

    zone.addEventListener("dragover", event => {
        event.preventDefault();

        zone.classList.add("drag-over");
    });


    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });


    zone.addEventListener("drop", event => {

        event.preventDefault();

        zone.classList.remove("drag-over");

        if (!draggedCube) {
            return;
        }

        /*
           Move the cube into whichever
           area we dropped it on.
        */

        zone.appendChild(draggedCube);

        updateScale();
    });

});


/* =========================
   SCALE WEIGHTS
   ========================= */

function updateScale() {

    const leftCubes =
        leftPan.querySelectorAll(".value-cube");

    const rightCubes =
        rightPan.querySelectorAll(".value-cube");


    /*
       TEMPORARY SHUSHANIK VALUES

       These will eventually live in Python.
    */

    const values = {

        faith: 100,
        identity: 10,
        dignity: 6,
        wealth: 1,
        freedom: 3,
        power: 1,
        kindness: 7

    };


    let leftWeight = 0;
    let rightWeight = 0;


    leftCubes.forEach(cube => {

        leftWeight += values[cube.dataset.value];

    });


    rightCubes.forEach(cube => {

        rightWeight += values[cube.dataset.value];

    });


    const difference =
        leftWeight - rightWeight;


    let angle = difference * -2;


    angle = Math.max(
        -18,
        Math.min(18, angle)
    );


    beam.style.transform =
        `translateX(-50%) rotate(${angle}deg)`;
}