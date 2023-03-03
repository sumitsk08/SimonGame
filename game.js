let gamepattern=[];
let userpattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let level=0;
let gamestart=false;

function nextSequence(){
    let randomChosenColor;
    let randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColours[randomNumber];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    gamepattern.push(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatepress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

function checkanswer(){
    let n=userpattern.length;
    if(n>gamepattern.length) return false;
    for(let i=0;i<n;i++){
        if(gamepattern[i]!=userpattern[i]) return false;
    }
    return true;
}

$(".btn").click(function(){
    let eventid=this.id;
    userpattern.push(eventid);
    playSound(eventid);
    animatepress(eventid);
    console.log(checkanswer());
    if(checkanswer()){
        if(userpattern.length==gamepattern.length){
            userpattern=[];
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        let audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gamestart=false;
        level=0;
        userpattern=[];
        gamepattern=[];
    }
})

$(document).keypress(function(){
    if(gamestart==false){
        gamestart=true;
        nextSequence();
    }
})
