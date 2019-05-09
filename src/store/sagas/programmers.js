import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as ProgrammerActions } from '../ducks/programmers';

export function* addProgrammer(action) {
  try {
    console.log('action');
    console.log(action);
    const { data } = yield call(api.get, `/users/${action.payload.data.username}`);
    debugger;
    const isDuplicated = yield select(state => state.programmers.data.find(programmer => programmer.id == data.id));

    if (isDuplicated) {
      debugger;
      yield put(ProgrammerActions.addProgrammerFailure('Usuário não encontrado no GitHub'));
    } else {
      debugger;
      const programmerData = {
        id: data.id,
        name: data.name,
        latitude: action.payload.data.latitude,
        longitude: action.payload.data.longitude,
        avatar: data.avatar_url,
        login: data.login,
      };

      yield put(ProgrammerActions.addProgrammerSuccess(programmerData));
    }
  } catch (err) {
    console.log('Custom Error');
    console.log(err);
    console.log(`Custom Error${err}`);
    debugger;
    yield put(ProgrammerActions.addProgrammerFailure('Erro ao adicionar usuário'));
  }
}
