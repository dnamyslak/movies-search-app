import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie, MovieSearchResponse } from '../model/movie-search-response';
import { SearchStateService } from '../services/search-state.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { SearchTypes } from '../model/search-types';
import { SearchFormValues } from '../model/search-form-values';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm!: FormGroup;
  public formSubmitted: boolean = false;
  public searchResults: MovieSearchResponse | null = null;
  public currentPage: number = 1;
  public loading: boolean = false;
  public searchTypes: SelectItem[];
  private readonly resultsPerPage: number = 10;
  private queryKey!: string;
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    protected searchStateService: SearchStateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchTypes = [
      { label: 'Film', value: SearchTypes.Movie },
      { label: 'Serial', value: SearchTypes.Series },
      { label: 'Epizod', value: SearchTypes.Episode },
    ];
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.buildForm();

    const savedResults = this.searchStateService.searchResults();
    if (savedResults) {
      this.searchResults = savedResults.results;
      this.currentPage = savedResults.currentPage;
    }

    const savedFormValues: SearchFormValues | null = this.searchStateService.formValues();
    if (savedFormValues) {
      this.formSubmitted = true;
      this.searchForm.setValue(savedFormValues);
    }
  }
  public searchMovies() {
    this.loading = true;
    const searchTitle = this.searchForm.value.searchTitle;
    const searchYear = this.searchForm.value.searchYear;
    const searchType = this.searchForm.value.searchType;
    const newQueryKey = `${searchTitle}-${searchYear}-${searchType}`;

    if (this.queryKey !== newQueryKey) {
      this.currentPage = 1;
      this.queryKey = newQueryKey;
    }
    this.queryKey = newQueryKey;

    this.movieService
      .searchMovies(searchTitle, searchYear, searchType, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: MovieSearchResponse) => {
        if (data.Response === 'True') {
          this.searchResults = data;
        } else {
          this.searchResults = null;
        }
        this.formSubmitted = true;
        this.loading = false;
      });
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies();
    }
  }

  public nextPage() {
    const totalPages: number = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.searchMovies();
    }
  }

  public getCurrentResults(): Movie[] {
    if (this.searchResults && this.searchResults.Search) {
      const startIndex: number = (this.currentPage - 1) * this.resultsPerPage;
      const endIndex: number = startIndex + this.resultsPerPage;
      return this.searchResults.Search.slice(startIndex, endIndex);
    }
    return [];
  }

  public getTotalPages(): number {
    if (this.searchResults && this.searchResults.Search) {
      const totalResults = parseInt(this.searchResults.totalResults);
      return Math.ceil(totalResults / this.resultsPerPage);
    }
    return 0;
  }

  public goToMovieDetails(imdbID: string): void {
    this.loading = true;

    const searchResultsData = {
      results: this.searchResults,
      currentPage: this.currentPage
    };
    this.searchStateService.searchResults.set(searchResultsData);
    this.searchStateService.formValues.set(this.searchForm.value);
    this.router.navigate(['/movie-details', imdbID]);
  }

  public resetForm(): void {
    this.searchForm.reset();
    this.currentPage = 1;
    this.queryKey = '';
    this.searchResults = null;
    this.formSubmitted = false;
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      searchTitle: ['', Validators.required],
      searchYear: [''],
      searchType: [''],
    });
  }
}
