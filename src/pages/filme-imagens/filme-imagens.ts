import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-imagens',
  templateUrl: 'filme-imagens.html',
  providers: [MoovieProvider]
})
export class FilmeImagensPage {

  public filme;
  public filmeid;
  public imagens  = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public moovieProvider: MoovieProvider
  ) {
  }

  // Abrir detalhes dos filmes
  abrirDetalhes(imagem){
    console.log(imagem);
    this.navCtrl.push(FilmeDetalhesPage, {id: imagem.id });
  }

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    this.moovieProvider.getMoviesImagens(this.filmeid).subscribe(data=>{
      const retornoimg = (data as any);
      const objeto_retorno = JSON.parse(retornoimg._body)
      this.imagens = objeto_retorno.results;

      console.log("ESTE", this.imagens);
    }, error =>{
      console.log(error);
    })
    //console.log("aqiu", this.filmeid);
  }

}
