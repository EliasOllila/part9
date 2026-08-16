interface ExerciseCalculator {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculator = (days: number[], target: number): ExerciseCalculator => {
    const periodLength = days.length;
    const trainingDays = days.filter((day) => day > 0).length;
    const hoursTrained = days.reduce((acc, cur) => acc + cur, 0);
    const average = periodLength === 0 ? 0 : hoursTrained / periodLength;
    const success = average >= target;
    
    let rating = 0;

    if (average >= target) {
        rating = 3;
    } else if (average >= target * 0.8) {
        rating = 2;
    } else {
        rating = 1;
    }
    
    let ratingDescription: string;
    switch(rating) {
        case 1: 
            ratingDescription = "bad";
            break;
        case 2:
            ratingDescription = "not too bad but could be better";
            break;
        case 3:
            ratingDescription = "excellent";
            break;
        default:
            ratingDescription = "unknown";
    }

    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: target,
        average
    };
}

try {
    console.log(calculator([3, 0, 2, 4.5, 0, 3, 1], 2))
    } catch(error) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
    errorMessage += error.message;
    }
    console.log(errorMessage);
} 
