export class NextBus {
  constructor(
    public command: string,
    public route?: string,
    public time?: string
  ) { }

  basePath = 'http://webservices.nextbus.com/service/publicJSONFeed';
  basePathXML = 'http://webservices.nextbus.com/service/publicXMLFeed';
  agency = 'sf-muni';
}
