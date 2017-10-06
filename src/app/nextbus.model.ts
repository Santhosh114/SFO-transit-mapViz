export class NextBus {
  constructor(
    public command: string,
    public route?: string,
    public time?: string
  ) { }

  basePath = 'http://webservices.nextbus.com/service/publicJSONFeed';
  agency = 'sf-muni';
}
