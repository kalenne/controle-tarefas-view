import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesEnum } from 'src/app/enums/controle.enum';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  usuariosDados = [] as IUsuario[];

  displayedColumns: string[] = ['matricula', 'nome', 'email', 'roles', 'status'];
  dataSource = new MatTableDataSource<IUsuario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tipo: RolesEnum;

  constructor(private usuarioService: UsuarioService, private liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.retornarUsuarios();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  retornarUsuarios():void {
    this.usuarioService.retornarTodosUsuarios().subscribe(dados => {
      this.usuariosDados = dados.data;
      this.dataSource.data = dados.data;
      console.log(this.usuariosDados[0].roles?.toString)
    })
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

  

}
