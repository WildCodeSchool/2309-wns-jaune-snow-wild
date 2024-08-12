import User, { AdminInputRegister, InputRegister, UpdateAdminUserInput } from '../entities/user.entity'
import { Repository } from 'typeorm'
import datasource from '../db'

export default class UserService {
  db: Repository<User>
  constructor() {
    this.db = datasource.getRepository(User)
  }
  async findUser(id: string) {
    const user = await this.db.findOne({ 
      where: { id },
      relations: {
        reservations: true
      }
    })
    if (!user) {
      throw new Error("Ce user n'existe pas")
    }
    return user
  }

  async listUser() {
    return this.db.find()
  }

  async findUserByEmail(email: string) {
    return await this.db.findOneBy({ email })
  }

  async createUser({
    email,
    password,
    lastName,
    firstName,
    phone,
  }: InputRegister) {
    const newUser = this.db.create({
      email,
      password,
      lastName,
      firstName,
      phone,
    })
    return await this.db.save(newUser)
  }

  async createAdminUser({
    email,
    password,
    lastName,
    firstName,
    phone,
    role
  }: AdminInputRegister) {
    try {
      const newUser = this.db.create({
        email,
        password,
        lastName,
        firstName,
        phone,
        role
      })
      if(!newUser) {
        throw new Error("Can't create this new user")
      }

      return await this.db.save(newUser)
    } catch(error) {
      console.log('error in service:', error)
      // throw new Error("Error")
      return error
    }
    
  }


  async deleteUser(id: string) {
    const user = (await this.findUser(id)) as User
    await this.db.remove(user)
    return { ...user, id }
  }

  async adminUpdateUser(id: string, data: Omit<UpdateAdminUserInput, 'id'>) {
    
    const userToUpdate = (await this.findUser(id)) as User
    if(!userToUpdate) {
      throw new Error("Can't find this user")
    }
    const updatedToSave = this.db.merge(userToUpdate, {
      ...data
    })

    console.log('updatedToSave: ======>', updatedToSave);
    return await this.db.save(updatedToSave)
  }

  async adminDeleteUser(id:string) {
    const user = (await this.findUser(id)) as User

    const deletedUser = await this.db.remove(user)
    return { ...deletedUser, id }
  }
}
