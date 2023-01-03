import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TerrainDetailComponent } from './detail/terrain-detail.component';
import { TerrainComponent } from './list/terrain.component';
import { TerrainUpdateComponent } from './update/terrain-update.component';
import { TerrainDeleteComponent } from './delete/terrain-delete.component';



@NgModule({
  declarations: [
    TerrainDeleteComponent, 
    TerrainDetailComponent,
    TerrainComponent,
    
  ],
  imports: [CommonModule],
})
export class TerrainModule {}
