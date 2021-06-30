import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from 'src/app/services/api';
import { NotasService } from 'src/app/services/notas.service';
import { environment } from 'src/environments/environment';
import { Alunos } from './models/alunos';
import { Avaliacao } from './models/avaliacao';
import { Bimestre } from './models/bimestre';
import { Notas } from './models/notas';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [NotasService]
})
export class NotasComponent implements OnInit {

  public form!: FormGroup;
  public url: string;
  public url1: string;
  public url2: string;
  public url_ler: string;
  public cont: number = 0;

  public notas: Notas | undefined;

  public listaAvaliacao: Avaliacao[] = [];
  public listaBimestre: Bimestre[] = [];
  public listaAlunos: Alunos[] = [];
  public listaNotas: Notas[] = [];

  public registroId: number = 0;
  private subscription!: Subscription;
  public contador: number = 0;

  @Input() public valorInput: string = '';
  @Input() public api!: Api<any>;


  constructor(
    private fb: FormBuilder,
    public service: NotasService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.url = environment.api + '/api/avaliacao';
    this.url1 = environment.api + '/api/alunos';
    this.url2 = environment.api + '/api/bimestre/aluno';
    this.url_ler = environment.api + '/api/notas';
    this.criarForm();

  }


  ngOnInit(): void {
    this.buscarAvaliacao();
    this.buscarAlunos();
    this.subscription = this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      console.log('entrou');
      this.leredit(params['id']);
    });
  }

  public criarForm(): void {
    // tslint:disable-next-line: max-line-length
    this.form = this.fb.group({
      idavaliacao: [null, Validators.required],
      notas: [null, Validators.compose([
        Validators.required,
        Validators.max(10)
      ])],
      aluno: [null, Validators.required],
      idbimestre: [null, Validators.required],
    });
  }
  public get aluno() {
    return this.form.get('aluno') as FormGroup;
  }
  public get idbimestre() {
    return this.form.get('idbimestre') as FormGroup;
  }
  public get idavaliacao() {
    return this.form.get('idavaliacao') as FormGroup;
  }

  public get nota() {
    return this.form.get('notas') as FormGroup;
  }

  private leredit(id: number) {
    if (id) {
      this.registroId = id;
      // tslint:disable-next-line: deprecation
      this.ler(id).subscribe(registro => {
        if (registro) {
          this.notas = registro;
          const descr = this.notas?.aluno;
          console.log(descr);
          this.buscarTodosBimestrePorAluno(descr).subscribe((registro1: Bimestre[]) => {
            this.listaBimestre = registro1;
            console.log(registro1);
          }, error => {
            console.error(error);
            alert('Deu Erro na hora de Carregar Totos os itens');
          });
        }
      }, error => {
        console.error(error);
        alert('Não foi possível encontrar o registro de Aluno para Bimestre' + id);
      });
    }
  }

  public ler(id: number): Observable<Notas> {
    return this.http.get<Notas>(this.url_ler + '/id/' + id).pipe(map((item: any) => {
      return item;
    }));
  }

  public lerTodos(): Observable<Notas[]> {
    return this.http.get<Notas[]>(this.url_ler + '/').pipe(map((item: any[]) => {
      return item;
    }));
  }

  public buscarTodosAvaliacao(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(this.url).pipe(map((item: Avaliacao[]) => {
      return item;
    }));
  }

  private buscarAvaliacao() {
    // tslint:disable-next-line: deprecation
    this.buscarTodosAvaliacao().subscribe((registro: Avaliacao[]) => {
      this.listaAvaliacao = registro;
      console.log(registro);
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }

  public buscarTodosAlunos(): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.url1).pipe(map((item: Alunos[]) => {
      return item;
    }));

  }

  private buscarAlunos() {
    // tslint:disable-next-line: deprecation
    this.buscarTodosAlunos().subscribe((registro: Alunos[]) => {
      this.listaAlunos = registro;
      console.log(registro);
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }

  public buscarTodosBimestrePorAluno(value: any): Observable<Bimestre[]> {
    return this.http.get<Bimestre[]>(this.url2 + '/' + value).pipe(map((item: Bimestre[]) => {
      return item;
    }));
  }

  public buscarTodasNotas(): Observable<Notas[]> {
    return this.http.get<Notas[]>(this.url1).pipe(map((item: Notas[]) => {
      return item;
    }));
  }

  public buscarBimestrePorAluno(id: number) {
    // tslint:disable-next-line: deprecation
    const descr = id;

    console.log(descr);
    this.buscarTodosBimestrePorAluno(descr).subscribe((registro: Bimestre[]) => {
      this.listaBimestre = registro;
      if (this.listaBimestre.length === 0) {
        alert('Nenhum Bimestre Cadastrado Para o Aluno');
      }
      else {
        for (this.cont = 0; this.cont < this.listaBimestre.length; this.cont++) {

          }
      }
      console.log(registro);
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }
}
