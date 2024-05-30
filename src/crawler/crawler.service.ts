import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { MachinesRepository } from 'src/products/machines.repository';

@Injectable()
export class CrawlerService {
  constructor(private machinesRepository: MachinesRepository) { }
  async scrape(url: string) {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // 페이지 HTML을 가져옴
    const content = await page.content();

    // Cheerio로 HTML 파싱
    const $ = cheerio.load(content);

    // 원하는 데이터를 추출하는 반복문
    // 카누
    const splitedUrl = url.split('/');

    if (splitedUrl.includes('kanu')) {
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const machineName = $(element).find('div > a > strong').text();
        const machineImgUrl = $(element)
          .find('div > a > div.vvSy1XBLBf > div > div > div > img')
          .attr('src');
        const machineAmount = $(element)
          .find('div > a > div.PI9k_4E2vZ > strong:nth-child(2) > span')
          .text();

        await this.findItem(machineName, machineImgUrl, machineAmount);
      });
    } else if (splitedUrl.includes('nespressokorea')) {
      // 네스프레소
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const machineName = $(element).find('div > a > strong').text();
        const machineImgUrl = $(element)
          .find(
            'div.vvSy1XBLBf > div.swiper-container.swiper-container-initialized.swiper-container-horizontal.swiper-container-pointer-events > div > div.swiper-slide.N\\=a\\:lst\\.product.N\\=a\\:lst\\.addprd.swiper-slide-active > div > div > div > img',
          )
          .attr('src');
        const machineAmount = $(element)
          .find('div.PI9k_4E2vZ > strong > span')
          .text();

        await this.findItem(machineName, machineImgUrl, machineAmount);
      });
    } else if (splitedUrl.includes('illycafe')) {
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const machineName = $(element).find('div > a > strong').text();
        const machineImgUrl = $(element)
          .find(
            'div > div.swiper-slide.N\\=a\\:lst\\.product.N\\=a\\:lst\\.addprd.swiper-slide-active > div > div > div > img',
          )
          .attr('src');
        const machineAmount = $(element)
          .find('div > a > div._1zl6cBsmdy > strong.zOuEHIx8DC > span')
          .text();
        await this.findItem(machineName, machineImgUrl, machineAmount);
      });
    } else {
      throw new NotFoundException(`해당하는 카테고리가 없어용`);
    }

    await browser.close();
    return { message: '크롤링 성공' };
  }

  private async findItem(
    machineName: string,
    machineAmount: string,
    machineImgUrl: string,
  ) {
    const findItem = this.machinesRepository.findOne({
      where: {
        machineName,
        machineAmount,
      },
    });

    if (findItem) {
      return 0;
    }

    const items = this.machinesRepository.create({
      machineName,
      machineImgUrl,
      machineAmount,
    });
    await this.machinesRepository.save(items);
  }
}

// http://localhost:3001/crawler?url=https://brand.naver.com/nespressokorea/category/c5a3566fbcc7458086d9d18ef33ad01b?cp=1

// http://localhost:3001/crawler?url=https://brand.naver.com/kanu/category/2d6893180894407f8af31e57df7f192e?cp=1

//http://localhost:3001/crawler?url=https://smartstore.naver.com/illycafe/category/408474de902743b98b925720553bde9a?cp=1
