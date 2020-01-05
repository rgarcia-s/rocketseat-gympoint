import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, 'student', {
      params: { id },
    });

    if (!response.data) {
      Alert.alert('Erro no login', 'O ID inserido não existe');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Houve um erro no login');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
