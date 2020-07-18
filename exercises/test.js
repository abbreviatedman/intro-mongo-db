const mongoose = require('mongoose');


const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/whatever', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  info: {
    school: {
      type: String,
    },

    shoeSize: {
      type: Number,
    },
  },

  faveFoods: [{type: String}],

  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'school'
  }
})

const schoolSchema = new mongoose.Schema({
  name: String,
})

const Student = mongoose.model('student', studentSchema)
const School = mongoose.model('school', schoolSchema)

connect()
  .then(async () => {
    const school = await School.create({name: 'CI'})
    const student = await Student.create({firstName: 'Colin', school: school._id})

    const match = await Student.findById(student.id)
      .populate('school')
      .exec();
    console.log(match)
  })
  .catch((error) => console.error(error))
