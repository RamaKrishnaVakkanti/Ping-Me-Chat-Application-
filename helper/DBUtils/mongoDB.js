const insert = (model, data) => {
  return new Promise((resolve, reject) => {
    model.insertMany(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const find = (model, selectionCriteria, selectAttributes) => {
  return new Promise((resolve, reject) => {
    selectAttributes = selectAttributes == null ? { _id: 0 } : selectAttributes;
    
    model.find(selectionCriteria, selectAttributes, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const remove = (model, selectionCriteria) => {
  return new Promise((resolve, reject) => {
    model.remove(selectionCriteria, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


module.exports = { insert, find, remove };
