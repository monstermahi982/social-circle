import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  phoneNumber!: string;

  @Column({ default: "user" })
  type!: "admin" | "user";

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ default: false })
  isBlocked!: boolean;
}
