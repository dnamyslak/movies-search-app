import { Injectable, signal, WritableSignal } from '@angular/core';

import { MovieSearchResponse } from '../model/movie-search-response';
import { SearchFormValues } from '../model/search-form-values';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  searchResults: WritableSignal<{ results: MovieSearchResponse | null; currentPage: number }> = signal<{ results: MovieSearchResponse | null; currentPage: number }>({
    results: null,
    currentPage: 1
  });
  formValues: WritableSignal<SearchFormValues | null> = signal<SearchFormValues | null>(null);
}
