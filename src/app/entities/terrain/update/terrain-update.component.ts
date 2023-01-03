import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Club } from '../../club/club.model';
import { ClubService } from '../../club/service/club.service';
import { SuccessAlertDialog } from '../../club/update/club-update.component';
import { TerrainService } from '../service/terrain.service';
import { ITerrain, Terrain } from '../terrain.model';

@Component({
  selector: 'app-terrain-update',
  templateUrl: './terrain-update.component.html',
  styleUrls: ['./terrain-update.component.css'],
})
export class TerrainUpdateComponent implements OnInit {
  terrain: Terrain = new Terrain();
  id!: number;
  photos!: File;
  size: string | any;
  nbrJoueurs: number | any;
  prix: number | any;
  description: string | any;
  club: Club = new Club();

  imageName: any;
  editForm = this.fb.group({
    id: [],
    size: [],
    nbrJoueurs: [],
    prix: [],
    description: [],
 
    club: [],
  });

  constructor(
    httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private terrainService: TerrainService,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getClub(): void {
    this.terrainService.get(this.id!).subscribe(
      (data) => {
        this.terrain = data;
      },
      (error) => console.log(error)
    );
  }
  public onFileChanged(event: any) {
    //Select File
    this.photos = event.target.files[0];
    console.log('haa hiiyaaa lfile  ' + this.photos.name);
    console.log('haa hiiyaaa sizee ' + this.photos?.size);
    this.handleFileSelect(event);
  }
  private base64textString: String = '';

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this.photos);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.club.picByte = btoa(binaryString);
    console.log('lakhraaaaaaaaa :' + this.club.photos);
  }
  protected updateForm(terrain: ITerrain): void {
    this.editForm.patchValue({
      id: terrain.id,
      size: terrain.size,
      nbrJoueurs: terrain.nbrJoueurs,
      prix: terrain.prix,
      description: terrain.description,

      club: terrain.club,
    });
  }

  save(): void {
    console.log(this.terrain.description + "////////////////////////////////////////////////////////////////////////////////////");
    if (this.editForm.get(['id'])!.value === undefined) {
      this.terrainService.add(this.terrain).subscribe(
        (data) => {
          this.openDialog('500ms', '500ms');
          console.log(data);
        },
        (error) => console.log(error)
      );
    } else {
      this.terrainService.update(this.id, this.terrain).subscribe(
        (data) => {
          console.log(data);
          this.openDialog('500ms', '500ms');
        },
        (error) => console.log(error)
      );
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['dashboard/matieres']);
    });
  }
}
