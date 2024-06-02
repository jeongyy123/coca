import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { MachinesRepository } from 'src/products/machines.repository';
import { CapsulesRepository } from 'src/products/capsules.repository';

@Injectable()
export class CrawlerService {
  constructor(
    private machinesRepository: MachinesRepository,
    private capsulesRepository: CapsulesRepository,
  ) {}

  /** 머신 크롤링 **/
  async scrapeMachines(url: string) {
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
    const splitedUrl = url.split('/');

    // 카누
    if (splitedUrl.includes('kanu')) {
      console.log('카누 머신');
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const machineName = $(element).find('div > a > strong').text();
        const machineImgUrl = $(element)
          .find('div > a > div.vvSy1XBLBf > div > div > div > img')
          .attr('src');
        const machineAmount = $(element)
          .find('div > a > div.PI9k_4E2vZ > strong:nth-child(2) > span')
          .text();

        await this.findMachineItem(machineName, machineAmount, machineImgUrl);
      });

      // 네스프레소
    } else if (splitedUrl.includes('nespressokorea')) {
      console.log('네스프레소 머신');
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

        console.log(index, machineName, machineImgUrl, machineAmount);

        await this.findMachineItem(machineName, machineAmount, machineImgUrl);
      });

      // 일리카페
    } else if (splitedUrl.includes('illycafe')) {
      console.log('일리 머신');
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
        await this.findMachineItem(machineName, machineAmount, machineImgUrl);
      });
    } else {
      throw new NotFoundException(`해당하는 카테고리가 없어용`);
    }

    await browser.close();
    return { message: '크롤링 성공' };
  }

  /** 캡슐 크롤링 **/
  async scrapeCapsules(url: string) {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    const content = await page.content();

    const $ = cheerio.load(content);

    const splitedUrl = url.split('/');

    // 카누
    if (splitedUrl.includes('kanu')) {
      console.log('카누 캡슐');
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const capsuleName = $(element).find('div > a > strong').text();
        const capsuleImgUrl = $(element)
          .find('div > a > div.vvSy1XBLBf > div > div > div > img')
          .attr('src');

        const capsuleAmount = $(element)
          .find('div > a > div.PI9k_4E2vZ > strong:nth-child(2) > span')
          .text();
        await this.findCapsuleItem(capsuleName, capsuleAmount, capsuleImgUrl);
      });

      // 네스프레소
    } else if (splitedUrl.includes('nespressokorea')) {
      console.log('네스프레소 캡슐');
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const capsuleName = $(element).find('div > a > strong').text();

        const capsuleImgUrl = $(element)
          .find(
            'div.vvSy1XBLBf > div.swiper-container.swiper-container-initialized.swiper-container-horizontal.swiper-container-pointer-events > div > div.swiper-slide.N\\=a\\:lst\\.product.N\\=a\\:lst\\.addprd.swiper-slide-active > div > div > div > img',
          )
          .attr('src');
        const capsuleAmount = $(element)
          .find('div.PI9k_4E2vZ > strong > span')
          .text();

        await this.findCapsuleItem(capsuleName, capsuleAmount, capsuleImgUrl);
      });

      // 일리
    } else if (splitedUrl.includes('illycafe')) {
      console.log('일리 캡슐');
      $('#CategoryProducts > ul > li').each(async (index, element) => {
        const capsuleName = $(element).find('div > a > strong').text();

        const capsuleImgUrl = $(element)
          .find(
            'div > a > div._3GC6Xcq6fT > div.swiper-container.swiper-container-initialized.swiper-container-horizontal.swiper-container-pointer-events > div > div.swiper-slide.N\\=a\\:lst\\.product.N\\=a\\:lst\\.addprd.swiper-slide-active > div > div > div > img',
          )
          .attr('src');
        const capsuleAmount = $(element)
          .find('div > a > div._1zl6cBsmdy > strong.zOuEHIx8DC > span')
          .text();

        await this.findCapsuleItem(capsuleName, capsuleAmount, capsuleImgUrl);
      });
    } else {
      throw new NotFoundException(`해당하는 카테고리가 없어용`);
    }

    await browser.close();
    return { message: '크롤링 성공' };
  }

  private async findCapsuleItem(
    capsuleName: string,
    capsuleAmount: string,
    capsuleImgUrl: string,
  ) {
    const findItem = await this.capsulesRepository.findOne({
      where: {
        capsuleName,
        capsuleAmount,
      },
    });

    if (findItem) {
      return 0;
    }

    const items = this.capsulesRepository.create({
      capsuleName,
      capsuleAmount,
      capsuleImgUrl,
    });
    await this.capsulesRepository.save(items);
  }

  private async findMachineItem(
    machineName: string,
    machineAmount: string,
    machineImgUrl: string,
  ) {
    const findItem = await this.machinesRepository.findOne({
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
      machineAmount,
      machineImgUrl,
    });
    await this.machinesRepository.save(items);
  }
}

// 캡슐 머신
// http://localhost:3001/crawler/machines?url=https://brand.naver.com/nespressokorea/category/c5a3566fbcc7458086d9d18ef33ad01b?cp=1

// http://localhost:3001/crawler/machines?url=https://brand.naver.com/kanu/category/2d6893180894407f8af31e57df7f192e?cp=1

// http://localhost:3001/crawler/machines?url=https://smartstore.naver.com/illycafe/category/408474de902743b98b925720553bde9a?cp=1

// 캡슐 머신
// http://localhost:3001/crawler/capsules?url=https://brand.naver.com/nespressokorea/category/c5a3566fbcc7458086d9d18ef33ad01b?cp=1

// http://localhost:3001/crawler/capsules?url=https://brand.naver.com/kanu/category/6af2e0265e7247bbac909dd1bddc0d58?cp=1

// http://localhost:3001/crawler/capsules?url=https://smartstore.naver.com/illycafe/category/9a96f3c07bb64d128b6bab873739ef7b?st=POPULAR&dt=IMAGE&page=1&size=40
