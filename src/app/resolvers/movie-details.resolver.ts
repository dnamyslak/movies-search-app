import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieDetails } from '../model/movie-details';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<MovieDetails> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieDetails> {
    const movieId = route.paramMap.get('id');
    if (movieId) {
      return this.movieService.getMovieDetails(movieId);
    } else {
      return of({} as MovieDetails);
    }
  }
}
