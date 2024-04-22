import { Routes } from '@angular/router';
import { BlogComponent } from './BlogSpec/blog.component';
import { CardComponent } from './home/blogcard.component';
import { AuthGuardService } from './authguard.services';
import { ControlPanelComponent } from './controlpanel/control-panel.component';
import { LoginComponent } from './login/login.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { GizlilikComponent } from './gizlilik/gizlilik.component';
import { ArchiveComponent } from './archive/archive.component';

export const routes: Routes = [
  { path: 'blog/:id', component: BlogComponent },
  { path: 'profile', component: HomePageComponent },
  { path: '', component: CardComponent },
  { path: 'controlpanel', component: ControlPanelComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gizlilik', component: GizlilikComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'user-update', component: UserupdateComponent, canActivate: [AuthGuardService] }];
