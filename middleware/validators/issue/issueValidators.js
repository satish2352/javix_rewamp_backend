const { body, validationResult } = require('express-validator');
const apiResponse = require('../../../helper/apiResponse');

// Validation rules for issue creation
const createIssueValidationRules = () => {
  return [
    body('userId')
      .optional()
      .notEmpty()
      .isLength({ min: 24, max: 24 }).withMessage('User ID must be exactly 24 characters long')
      .matches(/^[a-fA-F0-9]{24}$/).withMessage('User ID must be a valid 24-digit hexadecimal string')
      .trim()
      .escape(),
    body('ngoId')
      .optional()
      .isLength({ min: 1, max: 50 })
      .trim()
      .escape()
      .withMessage('NGO ID must be between 1 and 50 characters if provided'),
    body('issueTitle')
      .notEmpty()
      .isLength({ min: 1, max: 200 })
      .trim()
      .escape()
      .withMessage('Issue is required and must be between 1 and 200 characters'),
    body('issueDetails')
      .notEmpty()
      .isLength({ min: 1, max: 4000 })
      .trim()
      .escape()
      .withMessage('Issue details are required and must be between 1 and 4000 characters'),
    body('status')
      .isInt({ min: 0, max: 10 })
      .optional()
      .withMessage('Status must be an integer between 0 and 10'),
    body('comments')
      .optional()
      .isLength({ max: 4000 })
      .trim()
      .escape()
      .withMessage('Comments must be less than 4000 characters if provided'),
    body('is_active')
      .optional()
      .isBoolean()
      .withMessage('is_active must be a boolean value'),
    body('is_deleted')
      .optional()
      .isBoolean()
      .withMessage('is_deleted must be a boolean value')
  ];
};


const deleteIssueValidations =()=> [
    body('issueNo')
        .isLength({ min: 23, max: 23 }).withMessage('Issue number must be exactly 23 digits long')
        .isNumeric().withMessage('Issue number must contain only numeric characters'),
    body('userId')
        .isLength({ min: 24, max: 24 }).withMessage('User ID must be exactly 24 characters long')
        .matches(/^[a-fA-F0-9]{24}$/).withMessage('User ID must be a valid 24-digit hexadecimal string')
];
// Validation rules for updating an issue
const updateIssueValidationRules = () => {
  return [
    body('issueNo')
      .notEmpty()
      .isLength({ min: 1, max: 50 })
      .trim()
      .escape()
      .withMessage('Issue number must be between 1 and 50 characters'),
    body('userId')
      .notEmpty()
      .optional()
      .isLength({ min: 24, max: 24 }).withMessage('User ID must be exactly 24 characters long')
      .matches(/^[a-fA-F0-9]{24}$/).withMessage('User ID must be a valid 24-digit hexadecimal string')
      .trim()
      .escape(),
    body('ngoId')
      .optional()
      .isLength({ min: 1, max: 50 })
      .trim()
      .escape()
      .withMessage('NGO ID must be between 1 and 50 characters if provided'),
    body('issue')
      .optional()
      .notEmpty()
      .isLength({ min: 1, max: 200 })
      .trim()
      .escape()
      .withMessage('Issue must be between 1 and 200 characters'),
    body('issueDetails')
      .optional()
      .notEmpty()
      .isLength({ min: 1, max: 4000 })
      .trim()
      .escape()
      .withMessage('Issue details must be between 1 and 4000 characters'),
    body('status')
      .optional()
      .isInt({ min: 0, max: 10 })
      .withMessage('Status must be an integer between 0 and 10'),
    body('comments')
      .optional()
      .isLength({ max: 4000 })
      .trim()
      .escape()
      .withMessage('Comments must be less than 4000 characters if provided'),
    body('is_active')
      .optional()
      .isBoolean()
      .withMessage('is_active must be a boolean value'),
    body('is_deleted')
      .optional()
      .isBoolean()
      .withMessage('is_deleted must be a boolean value')
  ];
};

const checkUserIdValidation = () => {
    return [
        body('userId')
            .notEmpty().withMessage('Please provide a valid  ID')
            .isLength({ min: 24, max: 24 }).withMessage('ID must be a 24-character hex string')
            .isHexadecimal().withMessage('ID must be a valid hexadecimal string')
            .trim().escape()
    ];
};
// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation failed', errors.array());
  }
  next();
};

module.exports = {
  createIssueValidationRules,
  updateIssueValidationRules,
  deleteIssueValidations,
  validate,
  checkUserIdValidation
};
