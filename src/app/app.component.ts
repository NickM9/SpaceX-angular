import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LaunchpadTableComponent} from './component/launchpad-table/launchpad-table.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LaunchpadTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SpaceX-angular';
}
