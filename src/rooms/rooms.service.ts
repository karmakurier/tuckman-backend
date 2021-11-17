import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { ParticipateRoom } from './roomParticipate.entity';

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

  async findRoomByParticipateUUID(participateUUID: string) {
    const foundRoom = await this.roomRepository.findOne({
      where: { participateUUID: participateUUID },
    });
    if (foundRoom) {
      return this.createParticipateRoomFromRoom(foundRoom);
    } else {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
      }, HttpStatus.NOT_FOUND)
    }
  }

  private createParticipateRoomFromRoom(room: Room) {
    const participateRoom = new ParticipateRoom();
    participateRoom.notes = room.notes;
    participateRoom.teamName = room.teamName;
    participateRoom.expiresAt = room.expiresAt;

    return participateRoom;
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
