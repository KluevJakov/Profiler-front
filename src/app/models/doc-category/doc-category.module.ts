import { Token } from "../token/token.module";

export class DocCategory {
  id: number;
  name: string;
  token: Array<Token>;
  constructor(data: any){
    this.id = data.id;
    this.name = data.name;
    this.token = data.token;
  }
}