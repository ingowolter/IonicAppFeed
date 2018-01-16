import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moovieProvider: MoovieProvider
    ) {
  }

  public somaDoisNumeros(num1:number, num2:number):void{
    //alert(num1+num2);
  }

  ionViewDidLoad() {
    this.moovieProvider.getLastestMovies().subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body)
        this.lista_filmes = objeto_retorno.results;
        console.log(objeto_retorno);
      }, error =>{
        console.log(error);
      }
    )
  }

}
