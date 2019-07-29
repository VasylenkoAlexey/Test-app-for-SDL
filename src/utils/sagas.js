import { put, take, all, delay, fork, call, cancel, cancelled } from 'redux-saga/effects'

function* watchFetchPlanets() {
  while (true) {
    const action = yield take('INPUT_CHANGED');
    if (action.searchInputValue.trim()) {
      const task = yield fork(fetchPlanets, action);
      yield take(['INPUT_CLEARED', 'INPUT_CHANGE', 'POPUP_OUTSIDE_CLICKED']);
      yield cancel(task);  
    } else {
      yield put({ type: 'INPUT_EMPTY' });
    }
  }
}

function* watchInput() {
  while (true) {
    const action = yield take('INPUT_CHANGE');
    yield put({ type: 'INPUT_CHANGED', searchInputValue: action.searchInputValue });
  }
}

// TODO
// Add handling 
function* fetchPlanets(action) {
  try {
    let isFetching = true
    while (isFetching) {
      // If input is empty
      if (!action.searchInputValue) return

      // Debouncing, this works fine, no need for for debounce saga effect
      yield delay(400);

      let url = `https://swapi.co/api/planets/?search=${action.searchInputValue.trim()}`,
        isAnotherPageAvailable = true;

      // Workaround due swapi lack of get /all planets endpoint
      while (isAnotherPageAvailable) {
        yield put({ type: 'PLANETS_PAGE_FETCH_START' })

        const data = yield call(() => {
          return fetch(url)
            .then(res => res.json())
        });

        yield put({ type: 'PLANETS_PAGE_FETCHED', autocompletePlanets: data.results })
        data.next ? url = data.next : isAnotherPageAvailable = false;
      }
      yield put({ type: 'ALL_PLANETS_FETCHED' })
      isFetching = false;
    }
  }catch(e) {
      yield put({ type: 'PLANET_FETCH_ERRORED', e })
  } finally {
    if (yield cancelled()) {
      yield put({ type: 'PLANET_FETCH_ABORTED' })
    }
  }
}

export default function* rootSaga() {
  yield all([
    watchFetchPlanets(),
    watchInput()
  ])
}