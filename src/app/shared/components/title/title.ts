import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.html',
})
export class Title {
  readonly title = input.required<string>();
}
