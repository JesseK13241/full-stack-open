interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (dailyExerciseHours: number[], target: number):Result  => {
    const totalExerciseHours = dailyExerciseHours.reduce((a, b) => a + b, 0)
    const targetExerciseHours = dailyExerciseHours.length * target
    const success = totalExerciseHours > targetExerciseHours
    const ratio = totalExerciseHours / targetExerciseHours
    let rating = (ratio > 1) ? 3 : (ratio > 0.5) ? 2 : 1
    const ratingTextArray = ["", "pretty bad", "not too bad but could be better", "well done"]
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))