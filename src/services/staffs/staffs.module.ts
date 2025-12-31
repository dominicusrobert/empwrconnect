import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';

@Module({
  providers: [StaffsService]
})
export class StaffsModule {}
