import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search/search.component';
import { RoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchLoaderComponent } from './search/search-loader/search-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { BadgeModule } from 'primeng/badge';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, MovieDetailsComponent, SearchLoaderComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    // Below style modules used by PRIMENG:
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DataViewModule,
    BadgeModule,
    NgOptimizedImage,
  ],
  providers: [HttpClientModule, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
