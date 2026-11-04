import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SteamClient } from './steam.client';

@Module({
  imports: [HttpModule],
  providers: [SteamClient],
  exports: [SteamClient],
})
export class SteamModule {}