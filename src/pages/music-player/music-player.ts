import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
    selector: 'page-music-player',
    templateUrl: 'music-player.html',
})
export class MusicPlayerPage {
    public music
    private mediaFile: MediaObject
    constructor(
        public navCtrl: NavController,
        private media: Media,
        public navParams: NavParams
    ) {
        this.music = this.navParams.get('music')
        this.mediaFile = this.media.create(this.music.music_url)
    }

    ionViewDidLoad() {}

    stopMusic() {
        this.mediaFile.stop()
    }

    playMusic() {
        this.mediaFile.play()
    }

    pauseMusic() {
        this.mediaFile.pause()
    }

}
