import getContacts from '../../../../../src/pineApi/user/contacts/get';

import {
  get as getContactsAction,
  PINE_CONTACTS_GET_REQUEST,
  PINE_CONTACTS_GET_SUCCESS,
  PINE_CONTACTS_GET_FAILURE
} from '../../../../../src/actions/pine/contacts/get';

const dispatchMock = jest.fn();

const getStateMock = jest.fn(() => ({
  pine: {
    credentials: {
      userId: 'ec003e26-8ef2-4344-9c1c-649751242b31'
    }
  }
}));

jest.mock('../../../../../src/pineApi/user/contacts/get', () => {
  return jest.fn(() => Promise.resolve([
    {
      id: '2cd2ced7-f7e0-447f-8f1b-5487d4ef5d2c'
    },
    {
      id: '4dfcdb0a-8f48-42b2-a26e-d9551109955c'
    }
  ]));
});

describe('PINE_CONTACTS_GET_REQUEST', () => {
  it('equals "PINE_CONTACTS_GET_REQUEST"', () => {
    expect(PINE_CONTACTS_GET_REQUEST).toBe('PINE_CONTACTS_GET_REQUEST');
  });
});

describe('PINE_CONTACTS_GET_SUCCESS', () => {
  it('equals "PINE_CONTACTS_GET_SUCCESS"', () => {
    expect(PINE_CONTACTS_GET_SUCCESS).toBe('PINE_CONTACTS_GET_SUCCESS');
  });
});

describe('PINE_CONTACTS_GET_FAILURE', () => {
  it('equals "PINE_CONTACTS_GET_FAILURE"', () => {
    expect(PINE_CONTACTS_GET_FAILURE).toBe('PINE_CONTACTS_GET_FAILURE');
  });
});

describe('get', () => {
  beforeEach(() => {
    getContacts.mockClear();
  });

  it('is a function', () => {
    expect(typeof getContactsAction).toBe('function');
  });

  it('returns a function', () => {
    const returnValue = getContactsAction();
    expect(typeof returnValue).toBe('function');
  });

  describe('the returned function', () => {
    let returnedFunction;

    beforeEach(() => {
      returnedFunction = getContactsAction();
    });

    it('dispatches an action of type PINE_CONTACTS_GET_REQUEST', () => {
      returnedFunction(dispatchMock, getStateMock);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: PINE_CONTACTS_GET_REQUEST
      });
    });

    it('gets contacts for user using the credentials from state', () => {
      expect.hasAssertions();

      return returnedFunction(dispatchMock, getStateMock).then(() => {
        expect(getContacts).toHaveBeenCalled();

        expect(getContacts).toHaveBeenCalledWith({
          userId: 'ec003e26-8ef2-4344-9c1c-649751242b31'
        });
      });
    });

    it('returns a Promise', () => {
      const returnValue = returnedFunction(dispatchMock, getStateMock);
      expect(returnValue).toBeInstanceOf(Promise);
    });

    describe('the promise', () => {
      let promise;

      beforeEach(() => {
        promise = returnedFunction(dispatchMock, getStateMock);
      });

      it('dispatches an action of type PINE_CONTACTS_GET_SUCCESS with the contacts', () => {
        expect.hasAssertions();

        return promise.then(() => {
          expect(dispatchMock).toHaveBeenCalledWith({
            type: PINE_CONTACTS_GET_SUCCESS,
            contacts: expect.arrayContaining([
              {
                id: '2cd2ced7-f7e0-447f-8f1b-5487d4ef5d2c'
              },
              {
                id: '4dfcdb0a-8f48-42b2-a26e-d9551109955c'
              }
            ])
          });
        });
      });

      it('resolves to the contacts', () => {
        expect.hasAssertions();

        return promise.then((contacts) => {
          expect(contacts).toEqual(expect.arrayContaining([
            {
              id: '2cd2ced7-f7e0-447f-8f1b-5487d4ef5d2c'
            },
            {
              id: '4dfcdb0a-8f48-42b2-a26e-d9551109955c'
            }
          ]));
        });
      });
    });

    describe('when the function fails', () => {
      let promise;

      beforeEach(() => {
        // Make the function fail by returning a rejected promise from getContacts().
        getContacts.mockImplementationOnce(() => Promise.reject(
          new Error('f3ce68e9-d9aa-4da3-8e22-ce7980c4785d')
        ));

        promise = getContactsAction()(dispatchMock, getStateMock);
      });

      it('dispatches an action of type PINE_CONTACTS_GET_FAILURE with the error', () => {
        expect.hasAssertions();

        return promise.catch(() => {
          expect(dispatchMock).toHaveBeenCalledWith({
            type: PINE_CONTACTS_GET_FAILURE,
            error: expect.objectContaining({
              message: 'f3ce68e9-d9aa-4da3-8e22-ce7980c4785d'
            })
          });
        });
      });
    });
  });
});
