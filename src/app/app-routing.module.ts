import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'maps', component: MapComponent },
  { path: 'chat-bot', component: ChatDialogComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }