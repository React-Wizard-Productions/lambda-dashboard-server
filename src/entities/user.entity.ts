import { Column, Entity } from 'typeorm';
import { DashboardBaseEntity } from './dashboardBase.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends DashboardBaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  hashPassword() {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

}
