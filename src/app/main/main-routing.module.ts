import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../app-routing/auth.guard";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [AuthGuard]
})
export class MainRoutingModule { }