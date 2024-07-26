const calculateBMI = (height_cm: number, weight_kg: number): string => {
  const height_m = height_cm / 100;
  const BMI = weight_kg / height_m ** 2;
  if (BMI < 16) {
    return `Severe Thinness: ${BMI} BMI`;
  }
  if (BMI < 17) {
    return `Moderate Thinness: ${BMI} BMI`;
  }
  if (BMI < 18.5) {
    return `Mild Thinness: ${BMI} BMI`;
  }
  if (BMI < 25) {
    return `Normal: ${BMI} BMI`;
  }
  if (BMI < 30) {
    return `Overweight: ${BMI} BMI`;
  }
  if (BMI < 35) {
    return `Obese Class I: ${BMI} BMI`;
  }
  if (BMI < 40) {
    return `Obese Class II: ${BMI} BMI`;
  }
  return `Obese Class III: ${BMI} BMI`;
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (process.argv.length !== 4 || isNaN(height) || isNaN(weight)) {
  console.log("Incorrect input");
} else {
  console.log(calculateBMI(height, weight));
}

export default calculateBMI;
