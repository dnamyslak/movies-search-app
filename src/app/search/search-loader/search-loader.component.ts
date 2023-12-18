import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  templateUrl: './search-loader.component.html',
  styleUrl: './search-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLoaderComponent {
  @Input() public loading: boolean = false;
}
