import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieSearchResponse } from '../model/movie-search-response';
import { Observable } from 'rxjs';
import { MovieDetails } from '../model/movie-details';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_KEY = 'bf5769f2';
  private readonly API_URL = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  public searchMovies(title: string, year: string, type: string, page: number = 1): Observable<MovieSearchResponse> {
    const url = `${this.API_URL}?apikey=${this.API_KEY}&s=${title}&y=${year}&type=${type}&page=${page}`;
    return this.http.get<MovieSearchResponse>(url);
  }

  public getMovieDetails(id: string): Observable<MovieDetails> {
    const url = `${this.API_URL}?apikey=${this.API_KEY}&i=${id}`;
    return this.http.get<MovieDetails>(url);
  }
}
