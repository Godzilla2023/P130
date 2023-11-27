leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;
leftWristScore = 0;
songspeed = ""
Rightstatus = ""
LeftStatus = ""
song2playing = ""

function preload() {
    song1 = loadSound("in-the-forest-2-21402.mp3");
    song2 = loadSound("music.mp3");
}
song1="";
song2="";

function setup(){
    canvas = createCanvas(600,430);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
console.log("Posenet is Initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
    console.log(results);
    rightWristScore = results[0].pose.keypoints[10].score;
    leftWristScore = results[0].pose.keypoints[9].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+"leftWristX = "+leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+leftWristX+"rightWristX = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,530);
    fill("#FF0000");
    stroke("#FF0000");
    songspeed = song1.isPlaying()
    
    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(songspeed == false){
            song1.play();
        }
        else{
            console.log("Song Name: In the forest");
            document.getElementById("song").innerHTML = "Song Name: In The Forest";
        }}
        song2playing = song2.isPlaying()
        if(rightWristScore > 0.2){
            song2.play();
            circle(rightWristX,rightWristY,20);
            if(song2playing == false) {
                song2.play();
            }
        else{
            console.log("Song Name: Harry Potter Theme");
            document.getElementById("song").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }

}
