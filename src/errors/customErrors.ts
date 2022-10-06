export const customErrors = {
  //400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    customCode: 4001
  },
  BAD_REQUEST_ADMINISTRATOR_REGISTERED: {
    message: 'Administrator is already registered',
    customCode: 4001
  },

  BAD_REQUEST_ADMINISTRATOR_CANT_BE_BOSS: {
    message: 'Administrator can`t be your boss',
    customCode: 4001
  },

  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not found',
    customCode: 4001
  },
  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token'
  },
  //403

  //404
  NOT_FOUND_ADMINISTRATOR: {
    message: 'Administrator not found'
  },
  NOT_FOUND_USER: {
    message: 'User not found'
  }

};
