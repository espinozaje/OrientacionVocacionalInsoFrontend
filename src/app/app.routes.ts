import { Routes } from '@angular/router';
import {VocationalTestComponent} from './vocational-test/vocational-test.component';
import  {LoginComponent}  from './authentication/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PagePrincipalComponent } from './page-principal/page-principal.component';
import { PerfilComponent } from './authentication/perfil/perfil.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
export const routes: Routes = [
//se definen las rutas para navegar entre los componentes
{
    path: 'login',
    component: LoginComponent

},
{
    path: 'test',
    component: VocationalTestComponent
},
{
    path: 'registro',
    component: RegisterComponent
},
{
    path:'pageprincipal',
    component: PagePrincipalComponent
},
{
    path: 'pageprincipal/profile/:id',
    component: PerfilComponent
},
{
    path: 'forgot-password',
    component: ForgotPasswordComponent
},
{
    path: 'reset-password',
    component: ResetPasswordComponent
},
{
    path:'**',
    redirectTo:'home'
},
{
    path:'home',
    component: HomePageComponent
}
];
