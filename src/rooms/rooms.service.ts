import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: string): Promise<Room> {
    return this.roomRepository.findOne(id);
  }

  updateOne(id: string, room: Room) {
    if (this.roomRepository.findOne(id)) {
      return this.roomRepository.save(room);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(room: Room) {
    return this.roomRepository.create(room);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
