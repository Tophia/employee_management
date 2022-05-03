/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Department_Manager } from './departmentManager';
// id character(4) NOT NULL,
// dept_name character varying(40) NOT NULL
@Table
export class Department extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dept_name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  deleted: boolean;

  @HasMany(() => Department_Manager)
  departmentManager: Department_Manager[]

}
