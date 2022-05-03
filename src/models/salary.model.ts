/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from './employee.model';

// employee_id bigint NOT NULL,
// amount bigint NOT NULL,
// from_date date NOT NULL,
// to_date date NOT NULL
@Table
export class Salary extends Model {
  
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
  //   references:{
  //     model:Employee,
  //     key:'id'
  // }
})
employee_id:number

@Column({
  type: DataType.NUMBER,
  allowNull: false,
})
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date()
  })
  from_date:Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date()
  })  
  to_date:Date;
  @BelongsTo(() => Employee)
  employee: Employee
  // static associate: (models: any) => void;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  // })
  // deleted: boolean;
}
// Salary.associate = (models) => {
//   // associations can be defined here
//   Salary.belongsTo(models.Employee, { foreignKey: 'id', });
// };
// Salary.associate = function(models) {
//   Salary.hasMany(models.Employee, {
//     foreignKey: 'id',
//     as: 'employee',
//   });
// };
//latest
// const User_Profile = sequelize.define('User_Profile', {}, { timestamps: false });
// Salary.belongsToMany(Employee, { through: User_Profile });
// Profile.belongsToMany(User, { through: User_Profile });