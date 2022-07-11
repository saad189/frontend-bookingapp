import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';


const routes: Routes = [
    { path: "", component: InstructorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstructorRoutingModule { }

export const instructorRoutingComponents = [InstructorComponent];
