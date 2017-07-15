import update from 'immutability-helper';

update.extend('$setRequestLoading', (payload, original) => {
  return update(original, {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  });
});
update.extend('$setRequestSuccess', (payload, original) => {
  // console.log(payload, original, 'update reducer');
  return update(original, {
    data:      {$set: payload},
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: ''}
  });
});
update.extend('$setRequestError', (payload, original) => {
  return update(original, {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: payload}
  });
});
