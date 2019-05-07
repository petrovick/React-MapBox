import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as ProgrammerActions } from '../ducks/programmers';

export function* addProgrammer(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`);

    const isDuplicated = yield select(state => state.programmers.data.find(programmer => programmer.id == data.id));
    if (isDuplicated) {
      yield put(ProgrammerActions.addProgrammerFailure('Usuário não encontrado no GitHub'));
    } else {
      const programmerData = {
        id: data.id,
        name: data.username,
      };

      yield put(ProgrammerActions.addProgrammerSuccess(programmerData));
    }
  } catch (err) {
    yield put(ProgrammerActions.addProgrammerFailure('Erro ao adicionar usuário'));
  }
}
