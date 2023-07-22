
import { Category } from "../../../models/Category"
import { mongooseConnect } from "../../../lib/mongoose"
import {  isAdminRequest } from "./auth/[...nextauth]"

 
export default async function handleCategory (req, res){
  const { method } = req
  await mongooseConnect()
  await isAdminRequest(req,res)
  
  if (method === 'POST') {
    const { name, mainCategory,properties } = req.body
    const categoryInfo = await Category.create({ name, main:mainCategory,properties })
    res.json(categoryInfo)
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('main'))
  }

  if (method === 'PUT') {
    const { name, mainCategory,_id,properties } = req.body
    const categoryInfo = await Category.updateOne({_id},{ name, main:mainCategory,properties })
    res.json(categoryInfo)
  }

  if (method === 'DELETE') {
    const { _id } = req.query
    await Category.deleteOne({ _id })
    res.json('ok')
  }

 }