import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity({
    name:"users"
})
export class UsersEntity{
    @PrimaryGeneratedColumn('uuid')
    user_id:string
    @Column({name:"first_name"})
    firstName:string
    @Column({name:"last_name"})
    lastName:string
    @Column({name:"full_name"})
    fullName:string
    @Column({unique:true})
    username:string
    @Column()
    password:string
}