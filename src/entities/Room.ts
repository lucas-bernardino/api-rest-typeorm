import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

@Entity('rooms') // cria tabela no db com o parametro pasado
export class Room {
    // utiliza os decorators para quando for gerado as migrations, as configuracoes de cada campo
    // sejam atreladas a esses decorators
    @PrimaryGeneratedColumn() // chave primaria e auto incremento (serial)
    id: number

    // é possivel passar diveras informacoes dentro do objeto do decorator
    @Column({
        type: 'text'
    })
    name: string

    @Column({type: 'text', nullable: true})
    description: string

    @OneToMany(() => Video, (video) => video.room) // uma sala para vários videos
    videos: Video[]

    @ManyToMany(() => Subject, (subject) => subject.rooms)
    subjects: Subject[]
}