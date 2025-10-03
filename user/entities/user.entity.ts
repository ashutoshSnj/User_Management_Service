import { Entity, Column, OneToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { UserProfile } from "src/user-profile/entities/user-profile.entity";
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @OneToOne(()=>UserProfile,profile=>profile.user,{cascade:true,onDelete:'CASCADE'})
  profile:UserProfile;

   @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password&&!this.password.startsWith('$2')) {
      const salt=await bcrypt.genSalt(10);
      this.password=await bcrypt.hash(this.password, salt);
    }
  }
}
