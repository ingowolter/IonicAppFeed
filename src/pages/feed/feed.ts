import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { FilmeImagensPage } from '../filme-imagens/filme-imagens';


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
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
      titulo: "Ingo Wolter",
      data: "Novembro 5, 1955",
      descricao: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
      qtd_likes: "12",
      comments: "4 Comments",
      time_comment: "11h ago"

  }

  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  // Carregamento
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando aguarde..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  // Refresh página 
  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  public somaDoisNumeros(num1:number, num2:number):void{
    //alert(num1+num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  // Abrir detalhes dos filmes
  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id });
  }
  // Abrir detalhes dos filmes
  abrirImagens(filme){
   //console.log(filme);
    this.navCtrl.push(FilmeImagensPage, {id: filme.id });
  }

  carregarFilmes(){
    this.abreCarregando();
    this.moovieProvider.getLastestMovies().subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body)
        this.lista_filmes = objeto_retorno.results;
        console.log(objeto_retorno);
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error =>{
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
        //console.log(error);
      }
    )
  }

}
