/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Employee } from './employee.model';
// employee_id bigint NOT NULL,
// department_id character(4) NOT NULL,
// from_date date NOT NULL,
// to_date date NOT NULL
@Table
export class Department_Employee extends Model {
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
  department_id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  from_date:Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })  
  to_date:Date;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  deleted: boolean;
}
