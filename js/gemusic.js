class GenMusic {
    constructor(kickPath, path) {
        // パスを受け取る, kickとしているのは一定間隔で鳴らす音
        this.kickPath = kickPath;
        this.path = path;
        // 音を格納する変数と配列
        this.kick;
        this.sounds = [];
        // pathのリストの中から実際に音を格納する割合
        this.soundRatio = 0.85;
        // 譜面を格納する配列 (真偽値)
        this.note = [];
        // ビートをいくつで刻むか
        this.beats = 32;
        // いつ譜面を更新するか
        this.loopNum = 2;
        // speedでframeCountを割ってカウントを取っていく, それを数えるのがcount
        this.speed = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
        this.count = 0;
        // ページリロードの時間
        this.refreshTime = 30000;
    }

    load() {
        // 音声をロードする
        this.kick = loadSound(this.kickPath);
        for (let i in this.path) {
            if (random() < this.soundRatio) {
                this.sounds.push(loadSound(this.path[i]));
            }
        }
    }

    init() {
        // noteに譜面を作る
        for (let i in this.sounds) {
            this.note[i] = [];
            for (let j = 0; j < this.beats; j++) {
                this.note[i][j] = random() < 0.2;
            }
        }
    }

    update() {
        // カウントを数える (floorにすると可読性落ち過ぎそう)
        if (frameCount % this.speed == 0) {
            this.count++;
        }

        // 譜面を更新する
        if (this.count % (this.beats * this.loopNum) == 0) {
            for (let i in this.sounds) {
                for (let j = 0; j < this.beats; j++) {
                    this.note[i][j] = random() < 0.2;
                }
            }
        }
    }

    play() {
        // 音を鳴らす
        if (frameCount % this.speed == 0) {
            for (let i in this.sounds) {
                if (this.note[i][this.count % this.beats]) {
                    this.sounds[i].stop();
                    this.sounds[i].play();
                }
            }

            // 1ループに8回キックを鳴らす
            if (this.count % (this.beats / 8) == 0) {
                this.kick.stop();
                this.kick.play();
            }
        }
    }

    refresh() {
        // たまにページをリロードする (音が汚くなる)
        setInterval(function () {
            location.reload(true);
        }, this.refreshTime);
    }
}