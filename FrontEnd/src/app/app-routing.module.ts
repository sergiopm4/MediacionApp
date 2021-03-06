import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CaseComponent } from './case/case.component';
import { AllCasesComponent } from './all-cases/all-cases.component';
import { ProfileComponent } from './profile/profile.component';
import { PostCaseComponent } from './post-case/post-case.component';
import { BooksComponent } from './books/books.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allCases', component: AllCasesComponent },
  { path: 'case/:id', component: CaseComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'postCase', component: PostCaseComponent },
  { path: 'books', component: BooksComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
