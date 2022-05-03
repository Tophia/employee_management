/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Employee } from './employee.model';
import { Role } from './role.enum';
import { Salary } from './salary.model';

enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}
// const dataType = db.sequelize;
// const Employee = dataType.define("employee", {
@Table
export class Employee_Profile extends Model<Employee_Profile> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;
  
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  employee_id: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: Role.EMPLOYEE
  })
  roles: Role;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birth_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  hire_date: Date;

  @Column({
      type: DataType.ENUM,
      values: ['M', 'F'],
      allowNull: true,
  })
  employee_gender: Gender;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  deleted: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  removed: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  confirmed: boolean;
  @BelongsTo(() => Employee)
  employee: Employee
  // @HasMany(() => Salary)
  // salary: Salary

}
