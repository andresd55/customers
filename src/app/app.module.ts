import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AplicationModule } from './components/aplication/aplication.module';
import { LoadingModule } from './shared/framework-ui/custom/loading/loading.component';


@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AplicationModule, LoadingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
