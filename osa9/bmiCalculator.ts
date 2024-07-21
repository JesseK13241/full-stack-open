const calculateBmi  = (height_cm: number, weight_kg: number) =>  {
    const height_m = height_cm / 100
    const BMI = (weight_kg / (height_m ** 2))
    if (BMI < 16) {
      return `Severe Thinness: ${BMI} BMI`
    }
    if (BMI < 17) {
      return `Moderate Thinness: ${BMI} BMI`
    }
    if (BMI < 18.5) {
      return `Mild Thinness: ${BMI} BMI`
    }
    if (BMI < 25) {
      return `Normal: ${BMI} BMI`
    }
    if (BMI < 30) {
      return `Overweight: ${BMI} BMI`
    }
    if (BMI < 35) {
      return `Obese Class I: ${BMI} BMI`
    }
    if (BMI < 40) {
      return `Obese Class II: ${BMI} BMI`
    }
    return `Obese Class III: ${BMI} BMI`
};

console.log(calculateBmi(180, 74))
