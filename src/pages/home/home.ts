import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public allMusic: any = []

    constructor(
        public navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private actionSheetCtrl: ActionSheetController,
        private _music: MusicProvider
    ) {}

    ionViewDidLoad() {
        let musicLoadingCtrl = this.loadingCtrl.create({
            content: 'Please wait while we get data from server.'
        })
        musicLoadingCtrl.present();

        this._music.getMusic().subscribe(
            res => {
                this.allMusic = res
                musicLoadingCtrl.dismiss()
            }, err => {
                console.log(err)
                musicLoadingCtrl.dismiss()
            }
        )
    }

    addOneSong(refresher) {
        this._music.getMusic().subscribe(
            res => {
                this.allMusic.unshift(res[0])
                refresher.complete()
            }
        )
    }

    shareSong() {
        let shareSongActionSheet = this.actionSheetCtrl.create({
            title: 'Share this song with friends',
            buttons: [
                { text: 'Share on facebook', icon: 'logo-facebook' },
                { text: 'Share on twitter', icon: 'logo-twitter' },
                { text: 'Share', icon: 'share' },
                { text: 'Cancel', role: 'destructive' }
            ]
        })

        shareSongActionSheet.present()
    }
}
