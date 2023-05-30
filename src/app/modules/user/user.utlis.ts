import User from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  console.log(lastStudent)
  return lastStudent?.id
}

const generateStudentId = async () => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  console.log(currentId)
  return incrementId
}

export default generateStudentId
