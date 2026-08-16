const calculateBmi = (height: number, weight: number): string => {
    const heightInM = height/100;
    const bmi = weight / (heightInM * heightInM);

    if (bmi < 18.5) 
        return "Underweight";
    if (bmi < 25)
        return "Normal range";
    if (bmi < 30)
        return "Overweight";
    return "Obese";
}

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}