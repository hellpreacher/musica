import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { SocialSharing } from '@ionic-native/social-sharing';
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
        private socialSharing: SocialSharing,
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

    shareSong(music) {
        let shareSongActionSheet = this.actionSheetCtrl.create({
            title: 'Share this song with friends',
            buttons: [
                { text: 'Share on facebook', icon: 'logo-facebook',
                    handler: () => {
                        this.socialSharing.shareViaFacebook(music.name, music.thumb, music.music_url)
                    }
                },
                { text: 'Share on twitter', icon: 'logo-twitter',
                    handler: () => {
                        this.socialSharing.shareViaTwitter(music.name, music.thumb, music.music_url)
                    }
                },
                { text: 'Share', icon: 'share',
                    handler: () => {
                        this.socialSharing.share(music.name, '', music.thumb, music.music_url)
                    }
                },
                { text: 'Cancel', role: 'destructive' }
            ]
        })

        shareSongActionSheet.present()
    }
}
