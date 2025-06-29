import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
      encapsulation: ViewEncapsulation.None

})
export class HomepageComponent {

}
