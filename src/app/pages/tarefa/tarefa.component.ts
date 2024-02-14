import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { PrioridadeEnum, RolesEnum } from 'src/app/enums/controle.enum';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent
  extends ToastMessage
  implements OnInit, AfterViewInit
{
  tarefaDados = [] as ITarefa[];
  usuarioMatricula: number | undefined;
  tipoUsuarioLogado = sessionStorage.getItem('role');
  validacaoUsuario: boolean =
    this.tipoUsuarioLogado === RolesEnum.ROLE_ADMIN ? true : false;
  tarefa = {} as ITarefa;
  editTarefa: boolean = true;
  prioridadeEnum: PrioridadeEnum;

  colunasTabela: string[] = [
    'codigo',
    'titulo',
    'prioridade',
    'status',
    'inicio',
    'acoes',
  ];
  dataSource = new MatTableDataSource<ITarefa>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private liveAnnouncer: LiveAnnouncer
  ) {
    super();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.retornarDadosPorMatricula();
    this.cdr.detectChanges();
    const modalElement = document.querySelector('#modalTarefa');

    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.retornarDadosPorMatricula();
      });
    }
    
    
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 2 * 1000,
    });
  }

  public retornarDadosPorMatricula(): void {
    const usuario = sessionStorage.getItem('username');
    this.tarefaDados = [];
    if (usuario) {
      this.usuarioService
        .retornarUsuarioPorEmail(usuario)
        .pipe(
          switchMap((dadosUsuario) => {
            if (this.usuarioMatricula == null && dadosUsuario.data.matricula) {
              sessionStorage.setItem(
                'matricula',
                dadosUsuario.data.matricula?.toString()
              );
              this.usuarioMatricula = dadosUsuario.data.matricula;
            }
            return this.tarefaService.retornarTarefasPorMatricula(
              this.usuarioMatricula
            );
          })
        )
        .subscribe(
          (response) => {
            if (response.data.length >= 1) {
              this.tarefaDados = response.data;
              this.dataSource.data = response.data;
            } else {
              this.abrirToastMessage('Usuário sem tarefas!');
            }
          },
          (err) => this.abrirToastMessage(err.error.message)
        );
    }
  }

  public cadastrarNavegate(): void {
    this.router.navigate(['/cadastrar/tarefa']);
  }

  public tarefaSelecionada(tarefa: ITarefa): void {
    this.tarefa = tarefa;
  }

  announceSortChange(sortState: Sort) {
    if (sortState instanceof MatSort) {
      if (sortState.direction) {
        this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this.liveAnnouncer.announce('Sorting cleared');
      }
    }
  }

  getPrioridadeColor(nivel: PrioridadeEnum): { color: string } {
    switch (nivel) {
      case PrioridadeEnum.BAIXO:
        return { color: '#99FF99' };
      case PrioridadeEnum.MEDIO:
        return { color: '#FFD966' };
      case PrioridadeEnum.ALTO:
        return { color: '#FFCC99' };
      case PrioridadeEnum.CRITICO:
        return { color: '#FF9999' };
      default:
        return { color: '#CCCCCC' };
    }
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
