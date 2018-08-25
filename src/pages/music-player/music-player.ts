import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
    selector: 'page-music-player',
    templateUrl: 'music-player.html',
})
export class MusicPlayerPage {
    public music
    private mediaFile: MediaObject = null;
    constructor(
        public navCtrl: NavController,
        private media: Media,
        public navParams: NavParams
    ) {
        this.music = this.navParams.get('music')
    }

    ionViewWillLeave() {
        this.stopMusic()
    }

    stopMusic() {
        if (this.mediaFile !== null) {
            this.mediaFile.stop()
            this.mediaFile.release();
            this.mediaFile = null;
        }
    }

    playMusic() {
        if (this.mediaFile === null) {
            this.mediaFile = this.media.create(this.music.music_url)
            this.mediaFile.play()
        } else {
            this.mediaFile.play()
        }
    }

    pauseMusic() {
        if (this.mediaFile !== null) {
            this.mediaFile.pause()
        }
    }
}