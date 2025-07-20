const parseSchema = (fields) => {
  const result = {};

  fields.forEach(field => {
    const name = field.name || 'unnamed';

    if (field.type === 'nested') {
      result[name] = parseSchema(field.children || []);
    } else {
      result[name] = field.type.toUpperCase();
    }
  });

  return result;
};

export default parseSchema;
