import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {SharedModule} from './shared/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
