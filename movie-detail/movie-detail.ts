import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {
  public filme;
  public filmeID;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public movieProvider: MovieProvider) {
  }

  ionViewDidEnter() {
    this.filmeID = this.navParams.get("id");

    this.movieProvider.getMovieDetails(this.filmeID).subscribe(data=>{
        let retorno = (data as any);
        this.filme = retorno;
    }, error =>{
      console.log(error);
    });
  }

}
