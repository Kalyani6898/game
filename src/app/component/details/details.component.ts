import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public subcription: Subscription = new Subscription();
  gameRating: any;
  gameId: any;
  game: Game | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}
  ngOnInit() {
    this.subcription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.gameId = params['id'];
        this.getGameDetails(this.gameId);
      })
    );
  }
  getGameDetails(id: any) {
    this.subcription.add(
      this.httpService.getGameDetails(id).subscribe((res: Game) => {
        this.game = res;
        console.log('genre', this.game);
        if (this.game?.metacritic) {
          setTimeout(() => {
            this.gameRating = this.game?.metacritic;
          }, 2000);
        }
      })
    );
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
