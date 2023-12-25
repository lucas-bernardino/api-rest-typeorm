import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";


@Entity('videos')
export class Video {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text'
    })
    title: string  
    
    @Column({
        type: 'text'
    })
    url: string
    
    //Relacao de muitos para um. A entidade Video é a dona da relacao e guarda o id da entidade Room.
    //Video pode ter somente uma instância de Room, mas Room pode ter varias instâncias de Video
    @ManyToOne(() => Room, (room) => room.videos)
    @JoinColumn({name: 'room_id'}) // para dizer como a chave estrangeira (foreign key) será chamada
    room: Room
}