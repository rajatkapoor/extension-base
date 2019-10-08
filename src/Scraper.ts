export class Scraper {
  private url: string;
  constructor(url: string) {
    this.url = `https://${url.replace(/\/$/, '')}/`;
  }
  public async isValid(): Promise<boolean> {
    try {
      const response = await fetch(this.getUrl('products.json'));
      console.log('TCL: ShopifyScraper -> isValid -> response', response);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }

  }
  private getUrl(link: string) {
    return `${this.url}${link}`;
  }
}
