/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from './department.model';
import { Employee } from './employee.model';
// employee_id bigint NOT NULL,
// department_id character(4) NOT NULL,
// from_date date NOT NULL,
// to_date date NOT NULL
@Table
export class Department_Manager extends Model {
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
  //   references:{
  //     model:'Employee',
  //     key:'id'
  // }
})
employee_id:number

@ForeignKey(() => Department)
@Column({
  type: DataType.BIGINT,
//   references:{
//     model:Department,
//     key:'id'
// }
})
  department_id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
    allowNull: false,
  })
  from_date:Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
    allowNull: false,
  }) 
   to_date:Date;
   
   @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  deleted: boolean;
  @BelongsTo(() => Employee)
  employee: Employee
  @BelongsTo(() => Department)
  department: Department
}
