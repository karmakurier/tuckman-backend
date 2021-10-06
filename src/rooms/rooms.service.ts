import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) { }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find({
      /* select: [
        'teamName',
        'notes',
        'expiresAt',
        'questionnaireResults',
        'roomQuestionnaire',
        'id',
      ],*/
    });
  }

  findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne(id, {});
  }

  findRoomByRoomUUID(roomUUID: string): Promise<Room> {
    return this.roomRepository.findOne({
      where: { roomUUID: roomUUID },
    });
  }

  findRoomByParticipateId(participateId: string): Promise<Room> {
    return this.roomRepository.findOne({
      where: { participateUUID: participateId },
    });
  }

  updateOne(id: number, room: Room) {
    if (this.roomRepository.findOne(id)) {
      return this.roomRepository.save(room);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(room: Room) {
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
