import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy{
public sort :string ='' ;
  games: Array<Game> | undefined;
  public subscription : Subscription  = new Subscription();
constructor(private httpService :HttpService,
  private activatedRoute :ActivatedRoute,
  private router :Router){
}
ngOnInit(): void {
  this.subscription?.add(this.activatedRoute.params.subscribe((params: Params) => {
    if (params['game-search']) {
      this.searchGames('metacrit', params['game-search']);
    } else {
      this.searchGames('metacrit');
    }
  }),)
}

searchGames(sort: string, search?: string): void {
  this.subscription?.add(this.httpService
    .getGameList(sort)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);
    }),) 
}
openGameDetails(id:number){
this.router.navigate(['details',id]);
}
ngOnDestroy(){
  this.subscription?.unsubscribe();
}
}
