import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Title {
  readonly title = input.required<string>();
}
