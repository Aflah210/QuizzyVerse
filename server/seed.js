const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const sampleQuestions = [
  {
    category: 'History',
    question: 'Who was the first President of the United States?',
    options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
    answer: 'George Washington',
  },
  {
    category: 'History',
    question: 'In which year did World War II end?',
    options: ['1942', '1945', '1950', '1939'],
    answer: '1945',
  },
  // ... add at least 7 questions for each category for proper testing
  {
    category: 'Science',
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'O2', 'CO2', 'NaCl'],
    answer: 'H2O',
  },
  {
    category: 'Science',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB(); 