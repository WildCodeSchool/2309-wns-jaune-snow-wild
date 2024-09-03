import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import {
  CreateMaterialInput,
  UpdateMaterialInput,
} from '../entities/material.entity'
import CategoryService from '../services/category.service'
import MaterialService from '../services/material.service'
import Material from './../entities/material.entity'

@Resolver()
export default class MaterialResolver {
  @Query(() => [Material])
  async listMaterials() {
    const materials = await new MaterialService().listMaterials()
    return materials
  }

  @Query(() => Material)
  async findMaterialById(@Arg('id') id: string) {
    const materials = await new MaterialService().findMaterialById(id)
    return materials
  }

  @Query(() => [Material])
  async findMaterialByCategories(@Arg('id') id: string) {
    const category = await new CategoryService().find(id)
    if (!category) {
      throw new Error("La catégorie n'existe pas")
    }
    const material = await new MaterialService().listByCategory(id)
    return material
  }

  @Query(() => [Material])
  async listAvailableMaterials(
    @Arg('from_date') from_date: Date,
    @Arg('to_date') to_date: Date
  ): Promise<Material[]> {
    const fromDate = new Date(from_date)
    const toDate = new Date(to_date)

    return await new MaterialService().listAvailableMaterials(fromDate, toDate)
  }

  @Mutation(() => Material)
  async createMaterial(@Arg('data') data: CreateMaterialInput) {
    const newMaterial = await new MaterialService().createMaterial(data)
    return newMaterial
  }

  @Mutation(() => Material)
  async deleteMaterial(@Arg('id') id: string) {
    const deletedMaterial = await new MaterialService().deleteMaterial(id)
    return deletedMaterial
  }

  @Mutation(() => Material)
  async updateMaterial(@Arg('data') data: UpdateMaterialInput) {
    const { id, ...otherData } = data
    const materialToUpdate = await new MaterialService().updateMaterial(
      id,
      otherData
    )
    return materialToUpdate
  }
}
