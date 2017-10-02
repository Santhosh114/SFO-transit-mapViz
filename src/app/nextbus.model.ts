export class NextBus {
  constructor(
    public _command: string,
    public _route?: string,
    public _time?: string
  ) { }

  public _basePath = 'http://webservices.nextbus.com/service/publicJSONFeed?';
  public _agency = 'sf-muni';
}
