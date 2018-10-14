let video = document.getElementById('video');
let canvas = document.getElementById('motion');
let score = document.getElementById('score');

let prevPos = 0;

function initSuccess() {
    DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function getNewLookPosition(box) {
    if(box) {
        let centerX = box.x.min + ((box.x.max - box.x.min)/2);

        let diff = centerX - prevPos;
        let newPos = prevPos + (diff / 2);
        prevPos = newPos;
        return newPos;
    }
    else {
        return prevPos;
    }
}

function capture(payload) {
    let pos = getNewLookPosition(payload.motionBox);
    let percent = pos/64;

    let left = document.getElementById('eye-left');
    let right = document.getElementById('eye-right');

    let left_rotation = 90 - (percent * 180);
    let right_rotation = 90 - (percent * 180);

    left.style.transform = "rotate(" + left_rotation + "deg)";
    right.style.transform = "rotate(" + right_rotation + "deg)";
}

DiffCamEngine.init({
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture,
    includeMotionBox: true
});