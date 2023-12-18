import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { MovieSearchResponse } from '../model/movie-search-response';
import { MovieDetails } from '../model/movie-details';

describe('MovieService', () => {
  let movieService: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    movieService = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should retrieve search results', () => {
    const dummySearchResponse: MovieSearchResponse = {
      Search: [
        { Title: 'Movie 1', Year: '2022', Type: 'Movie', imdbID: '1', Poster: 'poster1.jpg' },
        { Title: 'Movie 2', Year: '2021', Type: 'Movie', imdbID: '2', Poster: 'poster2.jpg' }
      ],
      totalResults: '2',
      Response: 'True'
    };

    const title = 'Movie';
    const year = '';
    const type = 'Movie';
    const page = 1;

    movieService.searchMovies(title, year, type, page).subscribe(response => {
      expect(response).toEqual(dummySearchResponse);
    });

    const req = httpTestingController.expectOne(
      `${movieService['API_URL']}?apikey=${movieService['API_KEY']}&s=${title}&y=${year}&type=${type}&page=${page}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummySearchResponse);
  });

  it('should retrieve movie details', () => {
    const dummyMovieDetails: MovieDetails = {
      Title: 'Movie 1',
      Year: '2022',
      Rated: 'PG-13',
      Released: '01 Jan 2022',
      Runtime: '120 min',
      Genre: 'Action',
      Director: 'John Doe',
      Writer: 'Jane Smith',
      Actors: 'Actor 1, Actor 2',
      Plot: 'A great movie plot.',
      Language: 'English',
      Country: 'USA',
      Awards: 'Best Picture',
      Poster: 'poster1.jpg',
      Ratings: [
        { Source: 'Rotten Tomatoes', Value: '90%' },
        { Source: 'IMDb', Value: '8.0/10' }
      ],
      Metascore: '75',
      imdbRating: '7.5',
      imdbVotes: '100,000',
      imdbID: '1',
      Type: 'Movie',
      DVD: '01 Feb 2022',
      BoxOffice: '$100 million',
      Production: 'XYZ Studios',
      Website: 'https://example.com',
      Response: 'True'
    };

    const imdbID = '1';

    movieService.getMovieDetails(imdbID).subscribe(response => {
      expect(response).toEqual(dummyMovieDetails);
    });

    const req = httpTestingController.expectOne(
      `${movieService['API_URL']}?apikey=${movieService['API_KEY']}&i=${imdbID}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyMovieDetails);
  });
});
