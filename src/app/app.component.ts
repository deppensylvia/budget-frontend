import { Component} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  providers: [],
  imports: [
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})                 
export class AppComponent {
  title = 'Budget App';
}
