import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/sign-in',
    pathMatch: 'full'
  },

  // Partie privée (besoin d'être authentifié)
  {
    path: 'private',
    loadChildren: () => import('../private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuard], // Vérifie si l'utilisateur est authentifié si il essaie d'accéder à la route.
  },

  // Partie publique (pas besoin d'être authentifié)
  {
    path: 'public',
    loadChildren: () => import('../public/public.module').then(m => m.PublicModule),
  },

  {
    path: '**',
    redirectTo: 'public/error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
