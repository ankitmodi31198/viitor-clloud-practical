import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../app-routing/auth.guard";
import { MainComponent } from "./main.component";
import { PreviewGithubDataComponent } from "./preview-github-data/preview-github-data.component";

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'preview-data',
        component: PreviewGithubDataComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [AuthGuard]
})
export class MainRoutingModule { }