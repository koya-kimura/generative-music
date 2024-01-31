const kickPath = "../sound/bd-01.wav";
const path = ["../sound/procshort-01.wav", "../sound/sine-01.wav", "../sound/bass.wav",
"../sound/crap-01.wav", "../sound/glitch-01.wav", "../sound/ht-01.wav", "../sound/sd-01.wav",
"../sound/LC00.WAV", "../sound/LC10.WAV", "../sound/LC25.WAV", "../sound/LC50.WAV", "../sound/LC75.WAV"];
const genMusic = new GenMusic(kickPath, path);

let fft;

let theShader;

function preload() {
  theShader = loadShader("../shader/main.vert", "../shader/main.frag");
  genMusic.load();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  fft = new p5.FFT(0.8, 64);

  genMusic.init();

  shader(theShader);
}

function draw() {
  let spm = fft.analyze();

  genMusic.update();
  genMusic.play();
  genMusic.refresh();

  theShader.setUniform("u_time", frameCount / 100);
  theShader.setUniform("u_vol", spm[10]);

  rect(0, 0, width, height);
}

