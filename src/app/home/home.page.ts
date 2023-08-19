import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nomeProduto: string | undefined;
  preco: number | undefined;
  lista: { nome: string, preco: number }[] = [];
  textoLista: string = "";
  total: number = 0;
  media: number = 0;

  constructor() { }

  adicionarItem() {
    if (this.nomeProduto && this.preco) {
      this.lista.push({ nome: this.nomeProduto, preco: this.preco });
      this.atualizarLista();
    }
  }

  atualizarLista() {
    this.textoLista = this.lista.map((item, index) => 
      `${item.nome} - R$${item.preco.toFixed(2)} [Remover #${index + 1}]`
    ).join('\n');
    
    this.total = this.lista.reduce((acc, item) => acc + item.preco, 0);
    this.media = this.lista.length ? this.total / this.lista.length : 0;
  }
  
  removerItem(index: number) {
    this.lista.splice(index, 1);
    this.atualizarLista();
  }  

  checarRemocao(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.textContent) {
      const match = target.textContent.match(/\[Remover #(\d+)\]/);
      if (match) {
        const index = parseInt(match[1], 10) - 1;
        this.removerItem(index);
      }
    }
  }
  

}
