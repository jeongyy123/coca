import { Controller, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('/machines')
  async scrapeMachines(@Query('url') url: string) {
    return this.crawlerService.scrapeMachines(url);
  }

  @Get('/capsules')
  async scrapeCapsules(@Query('url') url: string) {
    return this.crawlerService.scrapeCapsules(url);
  }
}
