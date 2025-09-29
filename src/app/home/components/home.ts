import {
  ChangeDetectionStrategy,
  Component,
  computed,
  linkedSignal,
  signal,
} from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Title } from '../../shared/components/title/title';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Button, Title],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly title = signal('Home-twenty');
  readonly titleUpper = computed(() => this.title().toUpperCase());
  readonly titleLinked = linkedSignal(() => this.title());
  readonly counter = signal(0);
  subTitle = 'subTitle';

  handleClickButton(): void {
    console.log('Button clicked: ' + this.counter() + ' times');
    this.counter.update((value) => value + 1);
    this.title.update((value) => value + this.counter());
  }

  clearTitle(): void {
    this.title.set('');
    this.titleLinked.set('clear title');
  }
}
