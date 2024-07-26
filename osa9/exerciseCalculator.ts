interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
    console.log(dailyExerciseHours)
    console.log(target)
  const totalExerciseHours = dailyExerciseHours.reduce((a, b) => a + b, 0)
  const targetExerciseHours = dailyExerciseHours.length * target
  const success = totalExerciseHours > targetExerciseHours
  const ratio = totalExerciseHours / targetExerciseHours
  let rating = ratio > 1 ? 3 : ratio > 0.5 ? 2 : 1
  const ratingTextArray = [
    "",
    "pretty bad",
    "not too bad but could be better",
    "well done"
  ]
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(d => d !== 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingTextArray[rating],
    target: target,
    average: totalExerciseHours / dailyExerciseHours.length
  }
}

const args = process.argv.slice(2)
const args_as_numbers = args.map(arg => parseFloat(arg));
const valid_args = args_as_numbers.filter(num => !isNaN(num))

if (args_as_numbers.length !== valid_args.length) {
    console.log("Invalid input")
}

const target = args_as_numbers[0]
args_as_numbers.shift() // remove target

console.log(calculateExercises(args_as_numbers, target))
