const validationMiddleware = (schema, location) => {
    return (req, res, next) => {
      const dataToValidate = req[location]; // Get the data from the specified location (body, params, etc.)
  
      const { error } = schema.validate(dataToValidate); // Validate against the schema
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Send error response if validation fails
      }
  
      next();
    };
  };

  module.exports = validationMiddleware;