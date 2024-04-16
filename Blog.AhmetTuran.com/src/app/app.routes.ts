import { Routes } from '@angular/router';
import { BlogComponent } from './BlogSpec/blog.component';
import { CardComponent } from './blogcard/blogcard.component';
import { AuthGuardService } from './authguard.services';
import { ControlPanelComponent } from './control-panel-component/control-panel.component';
import { LoginComponent } from './login/login.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: 'blog/:id', component: BlogComponent  },
  { path: 'profile', component: HomePageComponent },
  { path: '', component: CardComponent },
  {path: 'control-panel',component: ControlPanelComponent,canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
{path:'user-update',component:UserupdateComponent,canActivate: [AuthGuardService]}];
