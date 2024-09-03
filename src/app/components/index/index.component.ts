import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../modelo/Cliente';
import { ClienteService } from '../../servico/cliente.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  //objeto do tipo cliente
  cliente = new Cliente();

  //variavel para visibilidade dos butoes
  btnCadastro : boolean= true;

   //variavel para visibilidade da tabela
   tabela : boolean= true;

  //json de clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService){}

  //Metodo de selecao
  selecionar(): void{
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno)
  }

   //Metodo de cadastro
    cadastrar(): void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      //cadastrar o cliente no vetor
      this.clientes.push(retorno)
    
      //limpar formulario
      this.cliente = new Cliente();

      //mensagem
      alert("Cadastrado com sucesso")
    })
  }


  //metodo de selecionar um cliente especifico
  selecionarCliente(posicao:number):void{
    //selecionar cliente no vetor
    this.cliente = this.clientes[posicao]

    //visibilidade dos butoes e tabela
    this.btnCadastro = false;
    this.tabela = false;
  }

  //metodo para editar clientes
  editar():void{
    this.servico.editar(this.cliente).subscribe(retorno =>{
      //obeter posicao do vetor ond esta o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo
      })

      //alterar os dados dos clientes
      this.clientes[posicao] = retorno;

      this.cliente = this.clientes[posicao]

      //visibilidade
      this.btnCadastro = true;
      this.tabela = true;

      alert("cliente alterado com sucesso")
    })

    
  }

  remover():void{
    this.servico.remover(this.cliente.codigo).subscribe(retorno =>{
      //obeter posicao do vetor ond esta o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo
      })

      //remover cliente do vetor
      this.clientes.splice(posicao, 1)

      this.cliente = new Cliente

      //visibilidade
      this.btnCadastro = true;
      this.tabela = true;

      alert("cliente deletado com sucesso")
    })
    
  }

  cancelar():void{
    this.cliente = new Cliente
    this.btnCadastro = true;
      this.tabela = true;
  }

  //metodo de inicialiazao
  ngOnInit(){
    this.selecionar();
  }

}
