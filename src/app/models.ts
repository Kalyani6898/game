import { Observable } from "rxjs";

export interface Game {
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshots>;
  trailer: Array<Trailer>;
  metacritic: number;
  id:number;
  background_image_additional?:string;
}

export interface gameDetailResponse{
   gameInfo: Observable<Object>; screenshots: Observable<Object>; trailers: Observable<Object>; 
}
export interface APIResponse<T> {
  results: Array<T>;
}
interface Genre {
  name: string;
}
interface ParentPlatform {
  platform: {
    name: string;
    id: number;
    slug: string;
  };
}
interface Publishers {
  name: string;
}
interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshots {
  image: string;
}
interface Trailer {
  data: {
    max: string;
  };
}
