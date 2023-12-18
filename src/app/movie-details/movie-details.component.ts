import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../model/movie-details';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movieDetails: MovieDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.movieDetails = data['movieDetails'];
    });
  }

  public goBack(): void {
    this.router.navigate(['/search']);
  }
}
