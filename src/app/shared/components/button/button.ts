import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  imports: [ButtonModule],
})
export class Button {
  readonly title = input.required<string>();
  readonly subTitle = input<string>();
  readonly onClick = output<void>();
}
