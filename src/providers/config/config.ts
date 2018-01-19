import { Injectable } from '@angular/core';

// Configuração de variáveis
let config_key = "config";

@Injectable()
export class ConfigProvider {

  private config = { 
    showSlide: false,
    name: " ",
    username: " "
  }

  constructor() {

  }
  
  // Recupera dados do localstorage
  getConfigData():any{
       return localStorage.getItem(config_key);
  }

  // Grava os dados do localstorage
  setConfigData(showSlide?: boolean, name?: string, username?: string){
      let config = { 
        showSlide: false,
        name: "",
        username: ""
      };
      if(showSlide){
          config.showSlide = showSlide;
      }
      if(name){
          config.name = name;
      }
      if(username){
          config.username = username;
      }
      localStorage.setItem(config_key, JSON.stringify(config));
  }
 

}
