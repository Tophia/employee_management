/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from './employee.model';
// employee_id bigint NOT NULL,
// title character varying(50) NOT NULL,
// from_date date NOT NULL,
// to_date date

@Table
export class Title extends Model {
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
    references:{
      model:Employee,
      key:'id'
  }
})
employee_id:number

@Column({
  type: DataType.STRING,
  allowNull: false,
})
  title: string;

  @Column({
    type: DataType.DATE,
  })
  from_date:Date;

  @Column({
    type: DataType.DATE,
  })  
  to_date:Date;
  @BelongsTo(() => Employee)
  employee: Employee
}
