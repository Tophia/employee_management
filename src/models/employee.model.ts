/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Department_Manager } from './departmentManager';
import { Employee_Profile } from './empolyeeProfile.model';
import { Role } from './role.enum';
import { Salary } from './salary.model';
import { Title } from './title.model';
enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}
// const dataType = db.sequelize;
// const Employee = dataType.define("employee", {
@Table
export class Employee extends Model<Employee> {
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
  @HasMany(() => Salary)
  salary: Salary[]
  @HasMany(() => Title)
  title: Title[]
  @HasMany(() => Department_Manager)
  departmentManager: Department_Manager[]
  @HasMany(() => Employee_Profile)
  empolyeeProfile: Employee_Profile[]
  // static associate: (models: any) => void;
}
// Employee.associate = (models) => {
//   // associations can be defined here
//   Employee.belongsTo(models.Salary, { foreignKey: 'employee_id', });
// };

// Employee.associate = function(models) {
//   Employee.hasMany(models.Salary, {
//     foreignKey: 'employee_id',
//     as: 'salary',
//   });
//   Employee.belongsToMany(models.Salary, {
//     through: 'employee',
//     as: 'salary',
//     foreignKey: 'employee_id'
//   });
//};
