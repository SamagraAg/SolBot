import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

//Function to run validation for input parameters. Accept a array of Validation chain which are validated against input parameters
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Executes all the validation chains(validation chain for each input parameter)
    //Using promise.all they are run in parallel
    await Promise.all(validations.map((validation) => validation.run(req)));

    //Collect all validation errors(generated from each validation chain) and return
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

//Array of Validation Chain for login parameters
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required").escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters")
    .escape(),
];

//Array of Validation Chain for signup parameters
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required").escape(),
  ...loginValidator,
];
// Validation Chain for message parameter
export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message  is required").escape(),
];
