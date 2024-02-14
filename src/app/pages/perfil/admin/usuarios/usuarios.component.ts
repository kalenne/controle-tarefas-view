import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesEnum } from 'src/app/enums/controle.enum';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuariosDados = [] as IUsuario[];
  usuarioSelecionado = {} as IUsuario;
  editUsuario: boolean = true;
  matricula = Number(sessionStorage.getItem('matricula'));
  colunaTabela: string[] = [
    'matricula',
    'nome',
    'email',
    'roles',
    'status',
    'acoes',
  ];
  dataSource = new MatTableDataSource<IUsuario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tipo: RolesEnum;

  constructor(
    private usuarioService: UsuarioService,
    private liveAnnouncer: LiveAnnouncer,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.retornarUsuarios();
    this.cdr.detectChanges();
    const modalElement = document.querySelector('#modalUsuario');

    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.retornarUsuarios();
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  retornarUsuarios(): void {
    this.dataSource.data = [];

    this.usuarioService.retornarTodosUsuarios().subscribe((dados) => {
      this.usuariosDados = dados.data;
      this.dataSource.data = dados.data;
    });
  }

  announceSortChange(sortState: Sort): void {
    if (sortState instanceof MatSort) {
      if (sortState.direction) {
        this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this.liveAnnouncer.announce('Sorting cleared');
      }
    }
  }

  usuSelecionado(usuario: IUsuario): void {
    this.usuarioSelecionado = usuario;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
