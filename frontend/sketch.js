//Commander 
var state = {
  shipLoc: { x: 0, y: 0 },
  fuel: 100,
  health: 100,
  enemy: [
        { x: 20, y: 80, id: 1 },
        { x: 200, y: -80, id: 2 },
        { x: -50, y: 50, id: 3 }], // {}
  obsticles: [], //{}
  bullets: 100,
  broken: [],
  tasks: ["Patch Leak", "Repair Wires", "Tighten Screw", "Fix Hole"],
  rooms: ["Food", "Fuel", "Bullets", "Engine", "Control"],
  roles: ["Captain", "Navigator", "Fighter", "Engineer"],
}
let damage = 0
let role = 'Navigator'


// pigs
let pigs =[
    
]

let scene = {
    x: 0,
    y: 0
}
//images
let img, img2;
function preload() {
    img2 = loadImage('background.jpg')
    img = loadImage('green_rocket.png')
    asteroidImg = loadImage('asteroid.png')
    img3 = loadImage('e2.png')
    img4 = loadImage('piggy.png')
    img5 = loadImage ('fighty.png')
    img6 = loadImage ('boom.png')

}

function setup() {
    createCanvas(800, 600)
    background(0)
    scene.x = width / 2
    scene.y = height / 2
    imageMode(CENTER)
    state = socket.emit('state', '')
}

function draw() {
    background(0)
  if(state.obsticles == null) {
    // console.warn('No state yet', state)
    return 
  }
    if (role == 'Navigator') {
        navigator()
    }
    else if (role == 'Commander') {
        commander()
    }
    else if (role == 'Engineer') {
        engineer()
    }
    else if (role == 'Fighter') {
        figher()
    }
    else{
      console.log("no role")
    }
}

function navigator() {
    //image(img2, 0, 0, img2.width, img2.height)
    background(0)
    // fill(255, 0, 0)
    image(img, width / 2, height / 2, img.width / 4, img.height / 4)
    //ellipse(width / 2, height / 2, 10); // draw player
    //text(scene.x + ', ' + scene.y, 10, 20)
    //translate(scene.x, scene.y);
    //console.log(scene.x,scene.y)

    // fill(255, 0, 0)
    //ellipse(scene)

    // fill(255)
  for (const obsticle of state.obsticles) {
        fill(225)
        // ellipse(item.x, item.y, 20); //image of obstacles
        image(asteroidImg, obsticle.x, obsticle.y, asteroidImg.width/6, asteroidImg.height/6)
        // fill(0)
        // console.log("asteroid")
        //text(item.x + ', ' + item.y, item.x + 10, item.y + 10)
    }

    //for (const enemy of state.enemy){
        //fill(225) 
        //image(img4, enemy.x,enemy.y, img4.width/4, img4.height/4)
    

    if (keyIsDown(LEFT_ARROW)) { 
        state.shipLoc.x -=5
        socket.emit('shipLocation', state)
    }
    if (keyIsDown(RIGHT_ARROW)) { 
        state.shipLoc.x += 5
        socket.emit('shipLocation', state)}
    if (keyIsDown(UP_ARROW)) { 
        state.shipLoc.y -=5
        socket.emit('shipLocation', state)
    }
    if (keyIsDown(DOWN_ARROW)) {
        state.shipLoc.y +=5
        socket.emit('shipLocation', state)}

}

function reset(){
    socket.emit("reset")
}


function commander() {
    background(0)
    // ADD IMAGE OF COMMANDER ROCKET 
    if (mouseIsPressed == true) {
        fill(255, 0, 0) // Red
    }
    else {
        fill(0, 0, 0)   // Black 
    }
}

var shots = []
function figher() {
    background(0)
    //ship
    image(img5, width/2, height/2, img5.width/4, img5.height/4)



    for(const shot of shots) {
        fill(255,0,0)
        const pX = state.shipLoc.x;
        const pY = state.shipLoc.y;
        ellipse((shot.x - pX) + width / 2, (shot.y - pY) + height / 2, 5); //image of obstacles
        shot.x += shot.angleVec.x*4 
        shot.y += shot.angleVec.y*4 
        // image(asteroidImg, sh.x, obsticle.y, asteroidImg.width / 6, asteroidImg.height / 6)
        // fill(0)
        // console.log("asteroid")
        //text(item.x + ', ' + item.y, item.x + 10, item.y + 10)
        for (var obsticle of state.obsticles){

            // rect(obsticle.x, obsticle.y, asteroidImg.width/12, asteroidImg.height/12)
            if (
                (shot.x - pX) + width / 2 >= obsticle.x - asteroidImg.width / 12 && 
                (shot.x - pX) + width / 2 <= obsticle.x + asteroidImg.width / 12 && 
                (shot.y - pY) + height / 2 >= obsticle.y - asteroidImg.height / 12 && 
                (shot.y - pY) + height / 2 <= obsticle.y + asteroidImg.height / 12 ){
                image (img6, obsticle.x, obsticle.y, img6.width/6, img6.height/6 )
                console.log("explode")
                socket.emit("shotFired", obsticle.id)
            }
        }
    }

    if (shots.length > 50){
        shots = shots.slice(shots.length-50)
    }
    
}
function mousePressed() {
    if (role == 'Fighter'){
    const pX = state.shipLoc.x;
    const pY = state.shipLoc.y;
    const mX = pX - width/2 + mouseX;
    const mY = pY - height/2 + mouseY;
    
    let angleVec = createVector(mX - pX, mY- pY)
    angleVec.normalize()

    shots.push({x:pX, y: pY, angleVec})
    
    // console.log("shot")

    }
}


// function engineer() {
//     image(e2,width/2, height/2,img.width/2, img.height/2 )
//     if (damage > 0) {
//      fill (255, 0, 0) //ship should flash red
    
//     }
//   image (img3, width/2, height/2, img.width/2, img.height/2)
//   if (mouseIsPressed == true) {
//     fill(255, 0, 0); // Red
// }
// else {
//     fill(255)  // White 
// }
// rect(450,125,60,60)
// rect(400,200,60,60)
// rect(425,200,60,100)



// }