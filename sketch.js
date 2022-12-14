/*
 * This program sketch is copied from Xiannong Meng's example at
 * https://editor.p5js.org/xmeng/sketches/2d1U_D7rw
 * This is for a project in CSCI 201 Bucknell University
 * John Glassman
 * 2022-12-13
 *
 * Previous Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 * My Revisions
 * 3. 2022-12-13: added image file loading for the cats which replace the balls
 *    a. An image of a dancing cat downloaded from
 *    https://www.warrenphotographic.co.uk/40087-playful-tabby-kitten-dancing
 *    The balls are replaced with images of cats.
 * 4. 2022-12-13: added image file lading for a revese image of the cat
      a. Image is a mirrored versions of the dancing cat downloaded from
      https://www.warrenphotographic.co.uk/40087-playful-tabby-kitten-dancing
 *    When the screen is clicked the cats images reverse.
 * 5. 2022-12-13: added sound file loading and playing
 *    a. An mp3 file of a cat meowing downloaded from 
 *    https://orangefreesounds.com/
 *    This sound is played every time the cat collides with a wall or box.
 *
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var cats = [];
var sound;
var testCat;

function preload() {

  sound = loadSound("apollo11.mp3");  // preload the sound file
  catImg = loadImage("cat.png"); // preload the image file
                                 // cat.png is 752x681 px
  catImg_rev = loadImage("cat_rev.png") // preload flipped image
  
  meow = loadSound("Cat-sound-meow.mp3"); // preload cat meow
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var catNum = 0; catNum < 5; catNum++) {
  	cats[catNum] = new Cat();  
  }

  let y = height;
  testCat = new Cat();
  testCat.size = 50;
  testCat.catX = 220;  // if catX == 225, the cat just slides over the right edge
  testCat.catY = 300;
  testCat.red = 0;
  testCat.blue = 0;
  testCat.green = 0;
  testCat.speedX = 0;
  testCat.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  fill(0,0,0)
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Hello World!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function draw() {

  background(255);
  createBox();
  
  testCatMove();  // a special cat to test corner collision
  
  for (var catNum = 0; catNum < cats.length; catNum++) {
    cats[catNum].display();
    cats[catNum].checkForHitWall();
    cats[catNum].checkForHitBox();
    cats[catNum].moveCat();
    
    if (mouseIsPressed) {
      cats[catNum].randomize()
      cats[catNum].flipAround()
    }
  }
}

function testCatMove() {
  
  testCat.display();
  testCat.checkForHitWall();
  testCat.checkForHitBox();
  testCat.moveCat();
}

class Cat { // Constructor
  
  constructor() {
    // initial position
    this.catX = random(100, width-100)
    this.catY = random(100, height-100)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.sizeX = random(100);
    this.sizeY = this.sizeX * 400 / 450;
    
    // Is the cat flipped or not
    this.flip = false;
  }
  
  display() {
    //fill(this.red, this.green, this.blue, this.alpha);
    //ellipse(this.catX, this.catY, this.size);
    if (!this.flip) {
      image(catImg, this.catX, this.catY, this.sizeX, this.sizeY);
    } else {
      image(catImg_rev, this.catX, this.catY, this.sizeX, this.sizeY);
    }
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.catY+this.sizeY) > height || (this.catY) < 0) {
  	  meow.play()
      this.speedY = -this.speedY;  
  	}
    if ((this.catX+this.sizeX) > width  || (this.catX) < 0) {
      meow.play()
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

    if (((this.catX) < BOX_WIDTH && (this.catY) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseCat();
    }
  }
  
  reverseCat() {
      meow.play()
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveCat() {

    this.catX += this.speedX;
  	this.catY += this.speedY;
    
  }
  
  flipAround(){
    if(this.flip){
      this.flip = false;
    } else {
      this.flip = true;
    }
  }
  
}
