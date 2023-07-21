
import { Category } from "../../../models/Category"
import { mongooseConnect } from "../../../lib/mongoose"

 
export default async function handleCategory (req, res){
  const { method } = req
  await mongooseConnect()
  
  if (method === 'POST') {
    const { name } = req.body
    const categoryInfo = await Category.create({ name })
    res.json(categoryInfo)
  }

  if (method === 'GET') {
    res.json(await Category.find())
  }
 }