import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunaConfig } from './models/coluna-config';
import { PesquisaConfig } from './models/pesquisa-config';

@Component({
    selector: 'app-pesquisaboletim',
    templateUrl: 'pesquisaboletim.component.html',
    providers: [PesquisaboletimComponent],
    styleUrls: ['pesquisaboletim.component.css']
})

export class PesquisaboletimComponent implements OnInit {

    public displayedColumns: any = [];

    public colunas: ColunaConfig[];

    public dataSource: any = [];

    public registroAno: number = 2021;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const config: PesquisaConfig = this.route.snapshot.data as any;
        this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
        this.colunas = config.colunas;
        this.dataSource = config.registros;
        console.log(this.dataSource);
    }

    ngOnInit() { }
}
