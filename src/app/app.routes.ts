import { Routes } from '@angular/router';
import {VocationalTestComponent} from './vocational-test/vocational-test.component';
import  {LoginComponent}  from './authentication/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PagePrincipalComponent } from './page-principal/page-principal.component';
import { PerfilComponent } from './authentication/perfil/perfil.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { authGuard } from './authentication/guards/auth.guard';
import { authenticatedGuard } from './authentication/guards/authenticated.guard';
export const routes: Routes = [
//se definen las rutas para navegar entre los componentes
{
    path: 'login',
    title: 'Iniciar Sesion',
    component: LoginComponent,
    canActivate: [authenticatedGuard]
   // children:[
    //    {
        //    path:'pageprincipal',
      //      title: 'Pagina Principal',
          //  component: PagePrincipalComponent,
            //children:[
              //  {
                //    path: 'profile/:id',
                  //  component: PerfilComponent
                //}
            //]
       // }
    //]
},
{
    path: 'test',
    component: VocationalTestComponent
},
{
    path: 'testpageprincipal',
    component: VocationalTestComponent,
    canActivate: [authGuard]
},
{
    path: 'registro',
    title: 'Registrarse',
    component: RegisterComponent,
    canActivate: [authenticatedGuard]
},

{
    path:'pageprincipal',
    title: 'Pagina Principal',
    component: PagePrincipalComponent,
    canActivate: [authGuard]
},

{
    path: 'profile',
    component: PerfilComponent,
    canActivate: [authGuard]
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
    component: HomePageComponent,
    canActivate: [authenticatedGuard]
}
];
