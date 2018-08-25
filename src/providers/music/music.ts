import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MusicProvider {
    API: string = 'https://orangevalleycaa.org/api/music';
    constructor(public http: HttpClient) { }

    getMusic() {
        return this.http.get(this.API)
    }

}
