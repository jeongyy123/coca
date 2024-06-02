import { Controller, Get, Query, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Request } from 'express';

@Controller('/user/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // 내 프로필 조회
  @Get('/self')
  getMyprofile(@Req() req: Request) {
    const userId = req.user.userId;
    return this.profilesService.getMyprofile(userId);
  }

  // 내 게시글 조회
  @Get('/self/posts')
  getMyPosts(@Req() req: Request) {
    const userId = req.user.userId;
    return this.profilesService.getMyPosts(userId);
  }

  // 내 댓글 조회
  @Get('/self/comments')
  getMyComments(@Req() req: Request) {
    const userId = req.user.userId;
    return this.profilesService.getMyComments(userId);
  }

  // 내 북마크 조회
  @Get('self/bookmarks')
  getMyBookmarks(@Req() req: Request) {
    const userId = req.user.userId;
    return this.profilesService.getMyBookmarks(userId);
  }

  // 다른 사람 프로필 조회
  @Get('/other')
  getOtherProfile(@Query() nickname: string) {
    return this.profilesService.getOtherProfile(nickname);
  }

  // 다른 사람이 작성한 게시글 조회
  @Get('/other/posts')
  getOtherPosts(@Query() nickname: string) {
    return this.profilesService.getOtherPosts(nickname);
  }
  // 다른 사람이 작성한 댓글 조회
  @Get('other/comments')
  getOtherComments(@Query() nickname: string) {
    return this.profilesService.getOtherComments(nickname);
  }
}
