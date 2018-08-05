import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";
import {MovieDetailPage} from "../movie-detail/movie-detail";

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Leonardo Martins",
    data: "November 5, 1955",
    descricao: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }


  public lista_filmes = new Array<any>();
  public page = 1;

  public nome_usuario:string = "Leonardo Martins";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private movieProvider: MovieProvider,
              public loadingCtrl: LoadingController) {
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando lista de filmes...",
    });
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number):void{
      alert(num1+num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;


    this.loadFilms();
  }


  ionViewDidEnter() {
    this.loadFilms();
  }

  openDetails(filme){
    this.navCtrl.push(MovieDetailPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {

      this.page ++;
      this.infiniteScroll = infiniteScroll;
      this.loadFilms(true);

  }


  loadFilms(newpage: boolean = false){
    this.presentLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data=>{
        //console.log(data);
        if (data != ""){

          if(newpage){
            this.lista_filmes = this.lista_filmes.concat(data.results);
            this.infiniteScroll.complete();
          }
          else{
            this.lista_filmes = data.results;
          }

        }
        this.hideLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      },error=>{
        console.log(error);
        this.hideLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      })
  }

}
