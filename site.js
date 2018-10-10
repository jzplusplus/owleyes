let video = document.getElementById('video');
let canvas = document.getElementById('motion');
let score = document.getElementById('score');

let LEFT_OFFSET =  0;
let RIGHT_OFFSET = 0;

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
    if(payload.score > 0)
    {
        let pos = getNewLookPosition(payload.motionBox);
        let percent = pos/64;
        
        let left = document.getElementById('eye-left');
        let right = document.getElementById('eye-right');
        
        let left_rotation = ((percent + LEFT_OFFSET) * 180) - 90;
        let right_rotation = ((percent + RIGHT_OFFSET) * 180) - 90;
        
        left.style.transform = "rotate(" + left_rotation + "deg)";
        right.style.transform = "rotate(" + right_rotation + "deg)";
    }
}

DiffCamEngine.init({
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture,
    includeMotionBox: true
});
